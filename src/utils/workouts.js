import { getWithOptions } from './fetch';

let apikey = "00a082133e675c7b44c8b079709ddcdd96b1cd7e";
let baseUrl = "https://wger.de/"

export const apiCall = async (endpoint, options = "") => {
    let res = await getWithOptions( baseUrl + endpoint + options, {
        headers: {
            headers: new Headers({
                'Authorization' : `Token ${apikey}`
            })
        }
    } )

    return res;
}