import axios from 'axios';
export default async function(url, 
        config = {
            url: false, 
            proxy: false
        }, 
        errorMessage = 'Failed load data'
    ){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const proxy = {
        proxy: {
            host: '104.236.174.88',
            port: 3128
          }
    };

    try{
        const requestUrl = config.url ? proxyUrl + url : url;
        const requestObj = config.proxy ? 
                Object.assign({}, proxy, { crossdomain: true }) 
                : 
                { crossdomain: true };

        let response = await axios.get(requestUrl,  requestObj);
        if(response.status === 200){
            return response.data;
        }else{
            console.log('Error fetch : ', response);
            throw new Error({
                status: response.status,
                message: errorMessage
            });
        }
    } catch (e) {
        throw new Error(e);
    }
}
