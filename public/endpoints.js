import manifiest from './manifiest.js';

const enpoints = {
    production : {
        url: "https://gateway.textripple.com/wallet/"
    },
    development : {
        url: "http://gatetestb.textripple.com/wallet/"
    }
}

module.exports.getApi = () => {
    return enpoints[manifiest.environment].url;
}