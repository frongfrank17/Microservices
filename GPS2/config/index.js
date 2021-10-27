module.exports = {
    name: 'Test Receive GPS ',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3000
    },
    dbSettings: {
        db: process.env.DB || 'GAIA?replicaSet=gaiaplatform&readPreference=secondaryPreferred',
        server: process.env.DB_SERVER || 'GAIA:P%40ssw0rd%23gaia@10.224.185.58:27017,10.224.185.59:27017,10.224.185.60:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY || 'RECEIVE_GPS',
        privateKey: process.env.PRIVATE_KEY || 'serv1ce_14ey_RECEIVE_GPS',

    }
}  

