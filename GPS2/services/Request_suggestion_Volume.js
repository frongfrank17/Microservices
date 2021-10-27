const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

module.exports.get_suggestion_volume = (cnt_tank,capacity,product_volume,product_max_volume,product_min_volume,product_sale_avg) => {
   return new Promise((resolve, reject) => {

        const opts = {
            headers: {'Content-Type': 'application/json'},
            url: ('http://localhost:32775') + '/forecast',
            method: 'POST',
            json: {cnt_tank:JSON.stringify(cnt_tank),
                   capacity : Number(capacity),
                   product_volume:Number(product_volume),
                   product_max_volume:Number(product_max_volume),
                   product_min_volume : Number(product_min_volume),
                   product_sale_avg:Number(product_sale_avg)
            }
        }
        console.log(opts.json)
           request(opts, function(error, response, body) {
            if (error){ resolve({suggestion_volume: 0}) }
            else if (response.statusCode === 200) resolve(body)
           
        })
   })
}








