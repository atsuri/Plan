const express = require('express');
const PORT = 8080;

let messages = [];

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render('top.ejs', { messages: messages });
});


app.post('/submit', (req, res) => {
    // messages.push({header: "[" + req.body.date + "　" + req.body.time + "]　" + req.body.number + "円", payload: req.body.message}); 
    messages.push("[" + req.body.date + "　" + req.body.time + "]　" + req.body.number + "円　概要：" + req.body.message); 
    messages.sort()
    res.render('top.ejs', { messages: messages});
});

app.post('/submit/:index', (req, res) => {
    index = req.params.index
    console.log(index)
    if(messages.length > 0){
        console.log('削除しました');
        messages.splice(index,1);
    }
    res.render('top.ejs', { messages: messages });
});

app.listen(process.env.PORT || PORT);
