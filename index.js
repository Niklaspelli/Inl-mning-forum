let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080


let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});
    
app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST

app.use(express.static('css'))

let fs = require("fs");


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/checklogin", function (req, res) {

  
  let users = JSON.parse(fs.readFileSync("users.json").toString()); // läs in JSON-fil och konvertera till en array med JavaScript-objekt
  console.log(users);
  for (i in users) {
    if (users[i].user == req.body.user && users[i].pass == req.body.pass) {
      let output = fs.readFileSync("main.html").toString();
      output = output.replace("***NAMN***", users[i].name);
      res.send(output);
      return;
    }
  }
  let output = fs.readFileSync("login.html").toString();
  output = output.replace(
    "<body>",
    "<body>Fel login!! Testa igen!<br>"
  );
  res.send(output);
});



app.get("/",function (req, res) {
  const dateObject = new Date();
// current date
// adjust 0 before single digit date
const date = (`0 ${dateObject.getDate()}`).slice(-2);
 
// current month
const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
 
// current year
const year = dateObject.getFullYear();
 
// current hours
const hours = dateObject.getHours();
 
// current minutes
const minutes = dateObject.getMinutes();
 
// current seconds
const seconds = dateObject.getSeconds();
 
// prints date in YYYY-MM-DD format
console.log(`${year}-${month}-${date}`);
 
// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
 
// prints time in HH:MM format
console.log(`${hours}:${minutes}`);
  
    let inlagg = fs.readFileSync("inlagg.json").toString();
    inlagg = JSON.parse(inlagg);
    
    
    console.log(inlagg);
    let output = "";
    for (let i = 0; i < inlagg.length;) {
      
      output += `${year}-${month}-${date} ${hours}:${minutes}:${seconds}<p>${inlagg[i].author} skriver: ${inlagg[i].content}</p>`;
    }
    let html = fs.readFileSync("main.html").toString();
    html = html.replace("***GÄSTER***", output);
    res.send(html);
});

app.post("/", function (req, res) {
  const dateObject = new Date();
  // current date
  // adjust 0 before single digit date
  const date = (`0 ${dateObject.getDate()}`).slice(-2);
   
  // current month
  const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
   
  // current year
  const year = dateObject.getFullYear();
   
  // current hours
  const hours = dateObject.getHours();
   
  // current minutes
  const minutes = dateObject.getMinutes();
   
  // current seconds
  const seconds = dateObject.getSeconds();
   
  // prints date in YYYY-MM-DD format
  console.log(`${year}-${month}-${date}`);
   
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
   
  // prints time in HH:MM format
  console.log(`${hours}:${minutes}`);
  let inlagg = fs.readFileSync("inlagg.json").toString();
  inlagg = JSON.parse(inlagg);

  inlagg.push(req.body);

  let json_text = JSON.stringify(inlagg);
  console.log(json_text);
  fs.writeFileSync("inlagg.json", json_text);

  let output = "";
  for (let i = 0; i < inlagg.length; i++) {
    
    output += `<br><p style="color: green;">${year}-${month}-${date} ${hours}:${minutes}:${seconds}</p><b><p>${inlagg[i].author} </b> från ${inlagg[i].zip} skriver: <br> <em> ${inlagg[i].content}</em> </p>`
  }
  let html = fs.readFileSync("main.html").toString();
  html = html.replace("***INLÄGG***", output);
  res.send(html);
location.reload();

});

