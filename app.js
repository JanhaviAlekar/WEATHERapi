const express= require("express");
const https = require("https");
const bodyParser=require("body-parser");
require('dotenv').config();
const app = express() ;
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
  const query=req.body.cityName;
  const APPID="6639a55a7f2c7038728561ce71418cf2";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APPID+"&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const temp =weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      console.log(temp);
      const id="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      res.write( " <p>the weather is currently "+weatherDescription+  "</p>")
   res.write("<h1> the temperature of "+query+" is " +temp+ " degree celcius</h1><br>")
res.write("<img src=" +id +"> </img>")
   res.send()
    })
  })
})
 /**  
    https.get(url,function(response){
        
        response.on("data", function(data){
            );*/
 
  







app.listen(3000,function(){
     console.log("server started at 3000port");
});