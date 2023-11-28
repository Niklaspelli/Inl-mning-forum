let express = require("express"); 
let app = express(); 
let port = 8080; 


let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); 
});
    
app.use(express.urlencoded({ extended: true })); 

app.use(express.static('css'))

let fs = require("fs");


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});
   

app.post("/checklogin", function (req, res) {

  
  let users = JSON.parse(fs.readFileSync("users.json").toString()); 
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



app.post("/", function (req, res) {

  let inlagg = fs.readFileSync("inlagg.json").toString();
  inlagg = JSON.parse(inlagg);

  inlagg.push(req.body);


  let json_text = JSON.stringify(inlagg);
  console.log(json_text);
  fs.writeFileSync("inlagg.json", json_text);

  let output = "";
  for (let i = 0; i < inlagg.length; i++) {
    
    output += `<div class="inlagg"><b>${inlagg[i].author} </b> från ${inlagg[i].zip} skriver: <hr> <br>  <em> ${inlagg[i].content}</em>  </p></div>`
  }
  let html = fs.readFileSync("main.html").toString();
  html = html.replace("***INLÄGG***", output);
  res.send(html);
location.reload();
res.redirect("/");
});


