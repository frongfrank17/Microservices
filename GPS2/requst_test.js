const axios = require('axios')
let length_ = 1000
let milisec = 10
for (let i=0 ; i<=length_ ; i++) {
    setTimeout(async () => {
        var data = JSON.stringify(
            {
                id : i ,
                message : 'test'
            }
            
            );

        var config = {
          method: 'post',
          url: 'http://localhost:3000/receive-device-gps',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiREVWRUxPUCIsInVzZXJuYW1lIjoib3duZXIiLCJ0b2tlbl9uYW1lIjoib25lbGluayIsInBlcm1pc3Npb24iOlsiY3JlYXRlOmRhdGEiXSwiaWF0IjoxNjM0ODg4Nzk4fQ.v9ezrJaj9zv6RQn6dY_Wym2RTsXLJLh92M5q1psItsc', 
            'Content-Type': 'application/json', 
     
          },
          data : data
        };
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    } , i* milisec )

}  