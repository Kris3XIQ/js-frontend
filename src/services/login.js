const login = async details => {
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": details.email,
            "password": details.password
        })
    };
    // const apiCall = await fetch(`http://localhost:3080/account/login`, fetchOptions);
    const apiCall = await fetch(`https://me-api.kris3xiq-jsramverk.me/account/login`, fetchOptions);
    const res = await apiCall.json();
    return res;
}

export default { login }
