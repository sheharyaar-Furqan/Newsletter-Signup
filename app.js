const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const e = require("express");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    console.log(fName,lName,email);
    const data = {
      members: [
        {
          email_address: email ,
          status: "subscribed",
          merge_fields: {
            FNAME: fName,
            LNAME: lName,
          }
        }
      ]
        
    };
    const jsonData = JSON.stringify(data);
    const url= "https://us5.api.mailchimp.com/3.0/lists/d505044fb5";
    const options = {
      method : "POST",
      auth : "sheri:46d52393af55c890f651cba616f7c9a1-us5"
    }
   const request =  https.request(url, options, function(response){
     if (response.statusCode == 200) {
       res.sendFile(__dirname + "/success.html")
     }else{
       res.sendFile(__dirname + "/failure.html");
     }
      response.on("data",function(data){
        console.log(response.statusCode);
      })
    })
  
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running at port 3000");
})



//API Key
//46d52393af55c890f651cba616f7c9a1-us5


//List ID
//d505044fb5