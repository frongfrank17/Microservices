const Package = require('../models/package.model')

module.exports = {

    //GET /package
    getPackage : async (req ,res ) => {

        try {
            const package = await Package.find( {} , { _id :0 } )
    
            res.status(200).send(package)
        } catch (error) {
            console.log(error);
            res.status(400).send([])
        }
    }
} 