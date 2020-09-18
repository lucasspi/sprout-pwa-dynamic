const envs = {
    url: "https://gateway.textripple.com/wallet/", //PROD
}

module.exports.getApi = () => {
    return envs['url'];
}