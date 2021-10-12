const Thing = require('../models/thing.model')
const services = require('../services')


module.exports = {
    //GET /report/student
    thingTable: async (req , res) => {
        const { username, role } = req.body
        const authorization = req.headers.authorization
        let permissions = req.permissions
        try {
            // Middleware
            const Package = await services.packageService.getPackage({ token : authorization})
            console.log(Package)

            //----------------

            permissions = permissions.filter( pms => pms != 'read:thing' )


            let filter = {
                _id : 0 , 
                name : 1 , 
                package : 1 ,

            } 

            permissions.map( e => {
                 let spliStr = e.split(":")
                 switch(spliStr[0]) {
                     case  "read"  : 
                        filter[spliStr[1]] = 1
                     break;
                 } 
  

            } )
           
            let things = await Thing.find({} , filter).lean().exec()
     
              
            result  =  await Promise.all ( things.map( t => {
         
                let len = t.package.length
                let obj = t

                switch (len)  {

                            case  1 : 

                            let findPackage = Package.find( pk =>  pk.name == "advanced")
                      
                                permis = findPackage.permission
                   
           
                                obj['package'] ='basic'

                                permis.map( e => {
                                
                                    let spliStr = e.split(":")

                                    if(spliStr[0] == 'read') {
                                            if(t[spliStr[1]]) { 
                                                obj[spliStr[1]] = '-'
                                            }
                                        } 
                                
                                    } )
                          

                            break ;
                            case 2 :
                          
                        
                              
                                obj['package'] = "advanced" 
                       
                            break; 

                        } 
                     
                      
                   
                 
                      
                    return   Promise.resolve(obj)
                    } )

             
           )
                    
            res.status(200).send(result)

        } catch (error) {
            console.log(error.stack);
            res.status(500).send(error.message)
        }
    }
}

//เช็คคำใน Array Return True/False
