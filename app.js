const express = require("express");
const app = express();
const mysql = require('mysql');
const path = require('path');


// sets ejs views folder
//app.set('views', path.join(__dirname, 'views'));

// sets view engine
app.set('view engine', 'ejs'); 

const connection = mysql.createConnection({
  host     : '3.126.116.92',
  user     : 'inbiotUser',
  password : 'BioSmart2018*',
  database : 'inbiot'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


app.get("/mes",(req,res) => {
    connection.query('SELECT * from measurement where systemId = 313 and yearId =3 and monthId =6 order by timeStamp',(err, rows) => {
        if(err) throw err;
        
        for (var i = 0; i < rows.length; i++){
            var current_datetime = new Date(Number(rows[i]['timeStamp']));
            rows[i]['date'] = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
          }
        res.render('amcharts',{datos:rows,texto: "1 mes: "+ rows.length.toString()});
        
    });
});


app.get("/semana",(req,res) => {
    connection.query('SELECT * from measurement where systemId = 313 and yearId =3 and monthId =6 and dayId between 0 and 7 order by timeStamp',(err, rows) => {
        if(err) throw err;
        
        for (var i = 0; i < rows.length; i++){
            var current_datetime = new Date(Number(rows[i]['timeStamp']));
            rows[i]['date'] = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
          }

        res.render('amcharts',{datos:rows,texto: "1 semana: "+ rows.length.toString()});
        
    });
});
app.get("/ano",(req,res) => {
    connection.query('SELECT * from measurement where systemId = 313 and yearId =3 order by timeStamp',(err, rows) => {
        if(err) throw err;
        
        for (var i = 0; i < rows.length; i++){
            var current_datetime = new Date(Number(rows[i]['timeStamp']));
            rows[i]['date'] = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
          }

        res.render('amcharts',{datos:rows,texto: "1 año: "+ rows.length.toString()});
        
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
