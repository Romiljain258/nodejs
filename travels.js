var express = require("express");
var app = express();

/****************using handle bar template engine no need to create a required layout again and again haha............................................................ */
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
let cookieParser = require("cookie-parser");
let session= require("express-session");
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({secret : "shh this is secret"}));
app.get("/", (req,res) => {

  if(req.session.page_views){
    req.session.page_views++;
    res.send("you have visited"+req.session.page_views+"Times");
  }
  else{
    req.session.page_views=1;
    res.send("welcome to the site");
  }
 // res.cookie("hello","world");
 //let cookie = req.cookies["hello"];
 //res.clearCookie("hello");
 // res.end(cookie);
});

app.get("/about", (req, res) => {
  let quotes = "abcdefgh".split("");
  // console.log(quotes);
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render("about", { quote: randomQuote, variable: "Hello" });
});
/************************---------------End of templates   *******************************/
/************************---------------start routning --------------------------------------------------------------------------------------- */
// app.set("port", 8080);
// app.get("/", function (req, res) {
//   res.type("text/plain");
//   res.send("Homepage Route");
// });

// app.get("/about*", function (req, res) {
//   res.type("text/plain");
//   res.send("About Route");
// });
// app.use("/", function (req, res) {
//   res.send("Page Not Found");
// });

// app.get("/about/other", function (req, res) {
//   res.type("text/plain");
//   res.send("Other Route");
// });

// app.use(function(req,res){
//   res.type("text/plain");
//   res.status(404);
//   res.send("Page Not Found");
// })

app.listen(8080, () => {
  console.log("Listening");
});