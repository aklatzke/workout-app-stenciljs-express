export const post = async (url, data = {}) => {
    let response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })

    if( response ){
        response = await response.json();
    }

    return response;
}

export const get = async( url ) => {
    let response = await fetch(url);

    if( response ){
        response = await response.json();
    }

    return response;
}

export const getWithOptions = async ( url, options = {} ) => {
    let response = await get( url, options );

    if( response ){
        return response;
    }
}