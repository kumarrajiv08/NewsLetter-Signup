const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})
app.post("/failure", function(req, res) {
  res.redirect("/");
})


app.post("/", function(req, res) {

  console.log(req.body.Fname);
  var email = req.body.Email;
  var firstName = req.body.Fname;
  var lastName = req.body.Lname;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const JSONdata = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/3ade133b3a"
  const options = {
    method: "POST",
    auth: "Rajiv:246f2616950086b8f37235d9592c1728-us10"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(JSONdata);
  request.end();


})



app.listen(process.env.PORT || 3000, function() {
  console.log("listening to 3000");
})
// API KEY
// 246f2616950086b8f37235d9592c1728-us10

// ListID
// 3ade133b3a
