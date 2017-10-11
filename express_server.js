var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")



var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/',(req,res) => {
  res.end("Hello!");
});

app.listen(PORT,() => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json",(req,res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls",(req,res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index",templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id,longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {
  let templateVars = req.params.id;
  urlDatabase[templateVars] = req.body.longURL;
  res.redirect("/urls");
});


app.post("/urls", (req, res) => {
  var randomKey = generateRandomString();
  urlDatabase[randomKey] = req.body.longURL;
  //console.log(urlDatabase);
  console.log(req.body);  // debug statement to see POST parameters
 // res.send("Ok");         // Respond with 'Ok' (we will replace this)
  res.redirect(`/urls/${randomKey}`);
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls/:id/delete",(req,res) => {
  let varToDelete = req.params.id;
  delete urlDatabase[varToDelete];
  res.redirect("/urls");
})





function generateRandomString() {
  var strArray = [];
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  var number = '0123456789'.split('');

  for(let i = 0; i < 7; i++){
    randomPick = parseInt(Math.random()*2);

    randomNumberGenAlpha = parseInt(Math.random()*52) - 1;

    randomNumberGenNum = parseInt(Math.random()*10) - 1;

    if(randomPick <= 0 ){
      strArray.push(alphabet[randomNumberGenAlpha]);
    }else{
      strArray.push(number[randomNumberGenNum]);
    }
  }
  return strArray.join('');
}

console.log("random string:",generateRandomString());