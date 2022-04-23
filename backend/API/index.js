const express = require('express')
const app = express()

require('dotenv').config();


var bodyParser = require("body-parser");
app.use(bodyParser.json());

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.IP,
    user: "API",
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});



app.listen(3000)


app.get('/report/newest', (req,res) => 
{
    connection.query('SELECT REPORT.REPORT_ID, \
            PLANT_INSTANCE.PLANT_INSTANCE_ID, \
            PLANT_TYPE.PLANT_NAME, \
            LOCATIONS.LONGITUDE, \
            LOCATIONS.LATITUDE, \
            REPORT.TIME_CREATED, \
            REPORT.SUPPLIED_DESCRIPTION \
            from REPORT INNER JOIN PLANT_INSTANCE \
                ON REPORT.PLANT_INSTANCE_ID=PLANT_INSTANCE.PLANT_INSTANCE_ID \
            JOIN LOCATIONS \
                ON PLANT_INSTANCE.LOCATION_ID=LOCATIONS.LOCATION_ID \
            JOIN PLANT_TYPE \
                ON PLANT_INSTANCE.PLANT_TYPE_ID=PLANT_TYPE.PLANT_ID \
            ;', (err, result) =>{
                if (err) res.send(err)
        else{

            var dict = {};
            
            result.sort(function (a, b) {
                var dateA = new Date(a.TIME_CREATED), dateB = new Date(b.TIME_CREATED)
                return dateA - dateB
            });

            result.forEach((report) => {
                if (!(report['PLANT_INSTANCE_ID'] in dict)){
                    dict[report['PLANT_INSTANCE_ID']] = report
                }
            })

            res.send(dict)
        }
    })
})


app.get('/reportID/:ID', (req, res) => {
   
    if (req.params.ID) {
        connection.query(
            'SELECT REPORT_ID, PLANT_INSTANCE_ID, TIME_CREATED, SUPPLIED_DESCRIPTION FROM REPORT WHERE ID='+ req.params.ID,
            (err, result, fields) => {
                if (err) res.send(err)
                else
                {
                    if (result[0]){
                        // results contains rows returned by server
                        res.send(result);
                    }
                    else
                    {
                        res.status(404);
                        res.send({message:"data not found"});
                        res.end();
                    }

                }
            }
        );
    }
    else {
        res.send("invalid params")
    }
})

app.get('/image/:ID', (req,res) => {

    connection.query(
        'SELECT SUPPLIED_IMAGE FROM REPORT WHERE REPORT_ID = '+ req.params.ID,
        (err, result, fields) => {
            if (err) res.send(err)
            if (result[0]){
                
                img = Buffer.from(result[0]['SUPPLIED_IMAGE'], 'base64')
                
                res.writeHead(200, {
                    'Content-Type': 'image/jpg',
                    'Content-Length': img.length
                });
                
                res.end(img)
            }
            else {
                res.status(404);
                res.send({message:"picture not found"});
                res.end();
            }
        }
    );

})

app.get('/plantID/reports/:ID', (req, res) => {
    if (req.params.ID) {
        connection.query(
            'SELECT REPORT_ID, PLANT_INSTANCE_ID, TIME_CREATED, SUPPLIED_DESCRIPTION FROM REPORT WHERE PLANT_INSTANCE_ID='+ req.params.ID,
            (err, result, fields) => {
                if (err) res.send(err)
                else
                {
                    if (result[0]){
                        // results contains rows returned by server
                        res.send(result);
                    }
                    else
                    {
                        res.status(404);
                        res.send({message:"data not found"});
                        res.end();
                    }

                }
            }
        );
    }
    else {
        res.send("invalid params")
    }
})
