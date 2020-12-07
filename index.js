const express = require('express')
const cricData= require('cric-player-info');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine','ejs')

app.get('/',(req,res) =>{
    res.render('index')
})

app.post('/getplayernames',(req,res) => {
    console.log(req.body.input)

    cricData.getMatchingPlayerNames(req.body.input).then((response)=>
    {
        console.log(JSON.stringify(response));

        res.json({
            names:response
        })
    })
    
})

app.post('/getplayerinfo',(req,res) =>{
    console.log(req.body.playername)

    cricData.getPlayerInfoByName(req.body.playername).then((response=>{
 
        console.log(JSON.stringify(response));

    

        res.json({
            info:response
        })
         
        }))
        .catch((err) =>{
            console.log(err)
            res.json({
                info:"Player not found"
            })
        });
})

app.listen(5000,() =>{
    console.log("App is listening on Port 5000")
})