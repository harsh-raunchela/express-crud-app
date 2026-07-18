const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

const {v4 : uuidv4 } = require('uuid');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "Harsh",
        content:"I Currently learning Backend Development.Exploring APIs, databases, and the fundamentals of building scalable applications. Looking forward to learning and building more."
    },
    {
        id: uuidv4(),
        username:"athrav",
        content:"I'm tall, muscular, and built like a fucking Greek god."

    },
    {
        id: uuidv4(),
        username:"Nikka",
        content:"Playing with my cats, listening to their meows, and constantly learning more about them."
    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req, res) => {
    let {username, content} =  req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    
    if (!post) {
        return res.status(404).send("Post not found! If your server just restarted, go back and refresh the all posts page.");
    }

    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post} );

});


app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});