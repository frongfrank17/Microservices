const Thing = require('../models/thing.model')
const PermissionService = require('../services/permission.service')
const PackageService = require('../services/permission.service')

module.exports = {
    //GET /report/student
    thingTable: async (req , res) => {
        const { username, role } = req.body

        try {
            const rolePermission = await PermissionService.getPermissionByRole(role)
            const haveViewThing = checkAvailability(rolePermission, 'view:thing')
            if (!haveViewThing) {
                res.status(401).send([])
            } 
    
            const packagePermission = await PackageService.getPermissionOnPackage()
            let things = await Thing.find()
            things.filter(packagePermission)
            things.filter(rolePermission)
            
            res.status(200).send(things)
        } catch (error) {
            console.log(error);
            res.status(400).send([])
        }
    }
}

//เช็คคำใน Array Return True/False
function checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
        return val === arrVal;
    });
}