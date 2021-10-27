module.exports = {
    name: 'Auth',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3205
    },
    dbSettings: {
        db:  'AccessManagement' ,
        server: process.env.DB_SERVER || // 'localhost:27017' ,
         '10.224.188.14:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY|| 'THING',
        privateKey: process.env.PRIVATE_KEY || 'serv1ce_14ey_THING',
        serviceKey: process.env.SERVICE_KEY || 'SERV1CE_14EY',
    }
}