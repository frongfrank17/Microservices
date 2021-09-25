module.exports = {
    name: 'Things-Service',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3200
    },
    dbSettings: {
        db:  'AccessManagement' ,
        server: process.env.DB_SERVER || '10.224.188.14:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY_ACCESS || 'Public_keyAccessT',
        publicKey_refresh: process.env.PUBLIC_KEY_REFRESH || 'Public_keyRefreshT',
        accessTokenExpiry: 60 * 1* 24,
        privateKey: process.env.PRIVATE_KEY || 'Private_digital',
        privateKey_refresh :process.env.PRIVATE_KEY_REFRESH || 'Private_digital_refresh', 
        refreshTokenExpiry: 60 * 2* 24,
    }
}