const envs = {
    url: "http://gatetestb.textripple.com/wallet/", //PROD
}

module.exports.getApi = (env) => {
    return envs[env];
}