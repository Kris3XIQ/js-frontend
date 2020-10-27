import React, { useEffect, useState }  from 'react';
import { useParams } from "react-router-dom";
import postService from "../../../services/post";
import { getActiveToken} from "../../../services/auth";
import { getActiveUser} from "../../../services/auth";
import { useHistory } from "react-router-dom";
import ReadMe from '../../../README.md';
import ReactMarkdown from "react-markdown";

const Report = ({ match }) => {
    const kmom = useParams();
    const history = useHistory();
    const GitHubRepoFrontend = "https://github.com/Kris3XIQ/js-frontend.git";
    const GitHubRepoBackend = "https://github.com/Kris3XIQ/js-backend.git";
    const [reportContent, setReportContent] = useState([]);
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [path, setPath] = useState("");
    const [mdText, setMdText] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const token = `owner ${getActiveToken()}`;
    const activeUser = getActiveUser();

    const fetchReports = async () => {
        const fetchOptions = {
            headers: { Authorization: token }
        };
        // const apiCall = await fetch(`http://localhost:3080/reports`, fetchOptions);
        const apiCall = await fetch(`https://me-api.kris3xiq-jsramverk.me/reports`, fetchOptions);
        const res = await apiCall.json();

        setReportContent(res.data);
    }

    const fetchKmom = async () => {
        if (kmom.reportNr === "2") {
            fetch(ReadMe)
            .then((response) => {
                if (response.ok) return response.text();
                else return Promise.reject("Didn't fetch text correctly");
            })
            .then((text) => {
                setMdText(text);
            })
            .catch((error) => console.error(error));
        } else {
            // const apiCall = await fetch(`http://localhost:3080/reports/week/${kmom.reportNr}`);
            const apiCall = await fetch(`https://me-api.kris3xiq-jsramverk.me/reports/week/${kmom.reportNr}`);
            const res = await apiCall.json();
            setHeader(res.header);
            setContent(res.content);
    
            setReportContent(res.data);
        }
    }

    useEffect(() => {
        if (typeof kmom.reportNr === "undefined") {
            fetchReports();
        } else {
            fetchKmom();
        }
    }, [kmom])

    const processReport = async (event) => {
        event.preventDefault();
        try {
            await postService.post({
                header, content, path
            });

            setHeader("");
            setContent("");
            setPath("");
            history.push(`/reports/week/${path}`);
        } catch (exception) {
            setErrorMessage("Could not process that post");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return errorMessage;
        }
    };

    const renderPostForm = () => {
        return (
            <>
                <form onSubmit={processReport} className="write-form">
                    <h1>Write report</h1>
                    <div className="write-form-input">
                        <input
                        type="text"
                        name="header"
                        placeholder="Header"
                        onChange={({ target }) => setHeader(target.value)}
                        required />
                    </div>
                    <div className="write-form-input">
                        <textarea
                        type="textarea"
                        value={content}
                        name="content"
                        placeholder="Text..."
                        onChange={({ target }) => setContent(target.value)}
                        required />
                    </div>
                    <div className="write-form-input">
                        <input
                        type="number"
                        value={path}
                        name="path"
                        placeholder="Kmom nr#"
                        onChange={({ target }) => setPath(target.value)}
                        min="1"
                        max="10"
                        required />
                    </div>
                    <button type="submit" className="login-form-button">Post</button>
                </form>
            </>
        )
    }

    const KmomReport = () => {
        function createMarkup() {
            return {__html: `${reportContent.content}`}
        }
        if (kmom.reportNr === "2") {
            return (
                <>
                    <div className="report-content">
                        <h2>{reportContent.header}</h2>
                        <ReactMarkdown source={mdText} />
                        <a href={GitHubRepoBackend} target="_blank"><p>Github Backend-Repo</p></a>
                        <a href={GitHubRepoFrontend} target="_blank"><p>Github Frontend-Repo</p></a>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="report-content">
                        <h2>{reportContent.header}</h2>
                        <p dangerouslySetInnerHTML={createMarkup()} />
                        <a href={GitHubRepoBackend} target="_blank"><p>Github Backend-Repo</p></a>
                        <a href={GitHubRepoFrontend} target="_blank"><p>Github Frontend-Repo</p></a>
                    </div>
                </>
            );
        }
    }

    const renderKmomReport = () => {
        return (
            <>
                <h1>Kmom: {kmom.reportNr}</h1>
                <div className="report-content">
                    <KmomReport />
                </div>
            </>
        );
    }

    if (typeof kmom.reportNr === "undefined" && activeUser) {
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    {renderPostForm()}
                </div>
            </div>
        );
    } else if (typeof kmom.reportNr === "undefined" && (!activeUser)){
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    <h4>You don't appear to have permission to modifys posts, please <a href="account/login"> login!</a></h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    {renderKmomReport()}
                </div>
            </div>
        );
    }
};

export default Report;


