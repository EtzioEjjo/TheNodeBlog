import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
let Post=null;
// In-memory data store


let lastId = 3;
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Write your code here//
app.get('/',(req,res) =>{
  res.redirect('/posts');

})

//CHALLENGE 1: GET All posts
app.get('/posts',async (req,res) =>{
   const items=await Post.find();
   console.log(items);

  res.render('index.ejs',{posts:items})
})




//Handling the New Button
app.get('/new',(req,res) =>{
  res.render('modify.ejs' ,{
    heading:"New Post",
    submit:"Add Post"

  })
})

//Adding a new item using the form
app.post('/api/posts',async (req,res) =>{
  const id= await Post.countDocuments() +1;
  console.log("id is "+id);
  const newPost=new Post ( {
    _id:id,
    title:req.body.title,
    content:req.body.content,
    author:req.body.author,
    date: `${getDateFormatted()}`
  });
  await newPost.save();
  res.redirect('/posts');
})



//Editing an Item
app.get('/edit/:id', async(req,res) =>{
  const id=parseInt(req.params.id);
  const getItem=await Post.find({_id:id})
  const post={
    
  }
  console.log(post);
  res.render('modify.ejs',{
    heading:"Edit Post",
    submit:"Submit",
    post:getItem[0]

  })
})


app.post('/api/posts/:id',async(req,res)=>{
  const id=parseInt(req.params.id);
  await Post.deleteOne({_id:id});

 const newPost=new Post({
    _id:id,
    title:req.body.title,
    content:req.body.content ,
    author:req.body.author ,
  })
  await newPost.save();
  res.redirect('/posts')

})



//Deleting an item
app.get('/api/posts/delete/:id',async (req,res) =>{
  const id=parseInt(req.params.id);
  await Post.deleteOne({_id:id})
  res.redirect('/posts')
 
})




app.listen(port, async() => {
  console.log(`API is running at http://localhost:${port}`);

  await  mongoose.connect('mongodb://localhost:27017/postsDB');
  const postSchema=mongoose.Schema({
  _id:Number,
  title:String,
  content:String,
  author:String,
  date:String
  });
 Post=mongoose.model('Post',postSchema);

});


function getDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Adding 1 to get correct month

  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate;
}
