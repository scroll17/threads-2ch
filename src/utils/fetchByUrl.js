export default async function(url, errorMessage = 'Failed load data'){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try{
        let response = await fetch(proxy + url, {
            method: 'GET'
        });
        if(response.ok){
            return await response.json();
        }else{
            throw new Error({
                status: response.status,
                message: errorMessage
            });
        }
    } catch (e) {
        throw new Error(e);
    }
}
