let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080


let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});
    
app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST

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
    "<body>LOGIN FAILED! PLEASE TRY AGAIN!<br>"
  );
  res.send(output);
});



app.get("/",function (req, res) {
  
    let inlagg = fs.readFileSync("inlagg.json").toString();
    inlagg = JSON.parse(inlagg);
    
    
    console.log(inlagg);
    let output = "";
    for (let i = 0; i < inlagg.length;) {
      output += `<p>${inlagg[i].author} skriver: ${inlagg[i].content}</p>`;
    }
    let html = fs.readFileSync("main.html").toString();
    html = html.replace("***GÄSTER***", output);
    res.send(html);
});

app.post("/", function (req, res) {
  let inlagg = fs.readFileSync("inlagg.json").toString();
  inlagg = JSON.parse(inlagg);

  inlagg.push(req.body);

  let json_text = JSON.stringify(inlagg);
  console.log(json_text);
  fs.writeFileSync("inlagg.json", json_text);

  let output = "";
  for (let i = 0; i < inlagg.length; i++) {
    output += `<p><b>${inlagg[i].author} </b> från ${inlagg[i].zip} skriver: <br> <em> ${inlagg[i].content}</em> </p>`
  }
  let html = fs.readFileSync("main.html").toString();
  html = html.replace("***GÄSTER***", output);
  res.send(html);
location.reload();

});

