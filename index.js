let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080

let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});

// serva en statisk webbsida (form.html) som innehåller formulär
app.get("/main", function (req, res) {
    
  res.sendFile(__dirname + "/main.html");
  
});
 // hit kommer data när get-formuläret skickas
app.get("/get-route", function (req, res) {
  console.log(req.query);
  let summa = Number(req.query.tal1) + Number(req.query.tal2);
  console.log(summa);
  res.send(`${req.query.tal1}+${req.query.tal2}=${summa}`);
}); 

 /* app.post("/checkguestbook",function (req, res) {
    let inlagg = fs.readfileSync("inlagg.json").toString();
    inlagg = JSON.parse(inlagg);
    inlagg.push(req.body);
    inlagg = JSON.stringify(inlagg);
    fs.writeFileSync(inlagg);
    for (i in inlagg) {
        res.write("<p>" + inlagg[i].author + "<br>" + inlagg.[i].content + "</p>");
    }
    res.send();
    });

    app.post("/", function (req, res) {
        let html = fs.readFileSync("login.html").toString();
        html = html.replace("***NAME***", req.body.namn);
        res.send(html);
      });  */