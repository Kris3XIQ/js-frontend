import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// import { sendRequest } from "selenium-webdriver/http";
// const socket = io.connect("ws://localhost:3080");

class Chat extends React.Component {
    constructor() {
        super();
        this.state = { msg: "", chat: [], tempnick: "", nick: "", now: "" };
        this.temp = { tempnick: "", joined: "" };
        // this.socket = io("ws://localhost:3080");
        this.socket = io("https://me-api.kris3xiq-jsramverk.me");
        this.joined = 0;
    }
    fetchChat = async () => {
        // const apiCall = await fetch(`http://localhost:3080/reports`, fetchOptions);
        // const apiCall = await fetch(`http://localhost:3080/chat`);
        const apiCall = await fetch(`https://me-api.kris3xiq-jsramverk.me/chat`);
        const res = await apiCall.json();
        for (var i = 0; i < res[0].length; i++) {
            let nick = res[0][i].nick;
            let msg = res[0][i].msg;
            let now = res[0][i].now;
            this.setState({
                chat: [...this.state.chat, { nick, msg, now }]
            })
        }
    }

    componentDidMount() {
        this.socket.on("chat message", ({ nick, msg, now }) => {
            this.setState({
                chat: [...this.state.chat, { nick, msg, now }]
            });
        });
        this.beforeUnloadListener();
        this.fetchChat();
    }

    componentWillUnmount(){
        const nick = this.state.nick;
        const now = this.state.now;
        const msg = " disconnected from the chat!";
        this.socket.emit("chat message", { nick, msg, now });
        this.socket.emit('disconnect');
        this.socket.disconnect();
    }

    beforeUnloadListener = () => {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            const nick = this.state.nick;
            const now = this.state.now;
            const msg = " disconnected from the chat!";
            this.socket.emit("chat message", { nick, msg, now });
            this.socket.emit('disconnect');
            this.socket.disconnect();
        })
    }

    onTextInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onNickSubmit = () => {
        const { tempnick } = this.state;
        const nick = this.state.tempnick;
        const now = this.state.now;
        const msg = " just joined!";
        this.setState({ nick: tempnick }) 
        if (this.joined < 1) {
            if (nick !== "") {
                this.socket.emit("chat message", { nick, msg, now });
                this.joined += 1;
            }
        }
        this.setState({ msg: "" })
        this.setState({ now: "" })
    }

    onMsgSubmit = () => {
        const { nick, msg, now } = this.state;
        this.socket.emit("chat message", { nick, msg, now });
        this.setState({ msg: "" });
        this.setState({ now: "" });
      };

    onKeyDownChat = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.onMsgSubmit();
        }
    }

    onKeyDownNick = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.onNickSubmit();
        }
    }

    renderChat() {
        const { chat } = this.state;
        return chat.map(({ nick, msg, now }, idx) => (
          <div className="chat-text-container" key={idx}>
            <span className="chat-time">{now}:</span>
            <span className="chat-nick">{nick}:</span>
    
            <span className="chat-msg">{msg}</span>
          </div>
        ));
    }

    render() {
        if (this.state.nick === "") {
            return (
                <div className="chat-wrapper">
                    <div className="nick-wrapper">
                        <p>Your nickname</p>
                        <input
                            name="tempnick"
                            onKeyDown={this.onKeyDownNick}
                            onChange={e => this.onTextInputChange(e)}
                            value={this.state.tempnick}
                            />
                        <button onClick={this.onNickSubmit}>Send</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="chat-wrapper">
                    <div className="chat-container">
                        <div>{this.renderChat()}</div>
                    </div>
                    <div className="message-wrapper">
                        <p>Your message</p>
                        <input
                            name="msg"
                            onKeyDown={this.onKeyDownChat}
                            onChange={e => this.onTextInputChange(e)}
                            value={this.state.msg}
                        />
                        <button onClick={this.onMsgSubmit}>Send</button>
                    </div>
                </div>
            );
        }
    }
}

export default Chat;
