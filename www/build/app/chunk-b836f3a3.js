/*! Built with http://stenciljs.com */
const { h } = window.App;

let prefix = window.location.hostname === "localhost" ? "http://localhost:8080" : "";

const post = async (url, data = {}) => {
    let response = await fetch(prefix + url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    });

    if( response ){
        response = await response.json();
    }

    return response;
};

const get = async( url ) => {
    let response = await fetch(prefix + url);

    if( response ){
        response = await response.json();
    }

    return response;
};

export { get as a, post as b };
