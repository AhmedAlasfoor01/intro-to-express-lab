const express = require('express');
const app = express();
const port = 3000;

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
//show the welcome message and the end point 
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Game Store!</h1>
    <ul>
      <li><a href="/shoes"><b>/shoes</b> - Browse shoes</a></li>
      <li><a href="/collectibles/0"><b>/collectibles/0</b> - View collectible #0</a></li>
      <li><a href="/roll/6"><b>/roll/6</b> - Roll a 6-sided dice</a></li>
    </ul>
    <p>
      Use query parameters with <b>/shoes</b>, e.g.<br>
      <code>/shoes?min-price=30&amp;max-price=100&amp;type=sneaker</code>
    </p>
  `);
});

//the route that the user enters his name and shows the greeting 
app.get('/greetings/:username', (req, res) => { //Task: Create a route that responds to URLs like /greetings/<username-parameter>.
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});


app.get('/roll/:number', (req, res) => {//Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
  const number = req.params.number;
  

  if (isNaN(number)) {
    return res.send('You must specify a number.');//If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.


  }
  
 
  const maxNumber = parseInt(number);
  const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));//Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. 


  
  res.send(`You rolled a ${rolledNumber}.`);//For example, a request to /roll/16 might respond with “You rolled a 14.”
});


app.get('/collectibles/:index', (req, res) => {//Task: Create a route for URLs like /collectibles/<index-parameter>.
  const index = parseInt(req.params.index);
  
 
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');//Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”
  }
  
  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

app.get('/shoes', (req, res) => {//Task: Create a route /shoes that filters the list of shoes based on query parameters.


  const minPrice = req.query['min-price'];//min-price: Excludes shoes below this price.
  const maxPrice = req.query['max-price'];//max-price: Excludes shoes above this price.
  const type = req.query.type;//type: Shows only shoes of the specified type.

  

  let filteredShoes = [...shoes];
  
 
  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }
  

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }
  
  
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }
  
  res.send(filteredShoes);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Example usage: apply requireLogin as middleware to restrict access to endpoints.
// For example:
// app.get('/shoes', requireLogin, ...);
// app.get('/collectibles/:index', requireLogin, ...);
// app.get('/roll/:sides', requireLogin, ...);







