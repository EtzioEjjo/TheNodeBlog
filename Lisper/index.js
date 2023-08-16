import express from "express";
import { render } from 'ejs';
import axios from "axios";


const app=express();
const port=3000;
const API="https://secrets-api.appbrewery.com";
app.listen(port);
app.use(express.static('public'));

app.get('/' , async(req,res) =>{
    // res.render('index.ejs',{content:''});
    try{
    const response=await axios.get(API+'/random');
    console.log(response.status);
    res.render('index.ejs',{content :response.data});
    }catch(error){
       

    }
});