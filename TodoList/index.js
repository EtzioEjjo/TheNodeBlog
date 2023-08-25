import express from 'express';
import bodyParser from 'body-parser';
import { render } from 'ejs';

const app=express();
const port=3000;

var data= [],work=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(port);

app.get('/',(req,res) =>{
    res.render('today.ejs');
})

app.post('/',(req,res) =>{
    console.log(data);

    data.push(req.body['toDoItem']);
    const todoitems={items:data};
    res.render("today.ejs",todoitems);


})

app.get('/work',(req,res) =>{
    res.render("today.ejs");
})

