const express =require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
var i1=[];

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistdb",{useNewUrlParser:true,useUnifiedTopology:true});
const itemschema={
    id:Number,name:String
}
const Item=mongoose.model("Item",itemschema);
app.get("/",function(req,res)
{
    Item.find({})
    .then((foundItems) => {
        res.render("todo", { listitems: foundItems });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving items");
      });
});
app.post("/",function(req,res)
{
    var task=req.body.task;
    const item=new Item({
      name:task
    });
    item.save();
    res.redirect("/");
})
app.post("/delete",function(req,res)
{
  var ans=req.body.button;
  console.log(ans);
  Item.findByIdAndRemove(ans).then(function () {
            console.log("Successfully deleted");
          })
          .catch(function (err) {
            console.log(err);
          });
 res.redirect("/");
}); 
app.listen(4000,function(res,req)
{
    console.log("server is running on port 3000");
});