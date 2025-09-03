const express = require('express');
const app = express();
const port = 3000;

app.get('/greetings/:name',(req,res)=>{
    res.send(`<h1>What a delight it is to see you once more, ${req.params.name}</h1>`)
})


app.get('/roll/:numbers',(req,res)=>{
    if(isNaN(roll)){
        res.send("You must specify a number!")
    }
    
    res.send(`<h1>You rolled a`)

    const result = Math.floor(Math.random()*(maxnumver+1));

})

app.listen(port)

app.get('/collectibles/<index-parameter>',(req,res)=>{
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }

     

];

app.get("/collectibles/:index",(req,res)=>{
  const index= parseInt(req.params.index);

  if (isNaN(index) || index <0 || index >= collectibles.length) {
     return res.send("This item is not yet in stock. Check back soon!");
  }
  



}
)

})
app.listen(port)