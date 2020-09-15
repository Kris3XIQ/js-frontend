import { getActiveToken } from "./auth";

const post = async content => {
    const token = `owner ${getActiveToken()}`;
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "header": content.header,
            "content": content.content,
            "path": content.path
        })
    };
    const apiCall = await fetch(`http://localhost:3080/reports/week/${content.path}`, fetchOptions);
    const res = await apiCall.json();
    return res;
}

export default { post }
