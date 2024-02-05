const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");


const popularDadJokes = [
  {
    "name": "ashes",
    "joke": "When the window fell into the incinerator, it was a pane in the ash to retrieve."
  },
  {
    "name": "pirate's favorite letter",
    "joke": "What's a pirate's favorite letter? It be the Sea"
  },
  {
    "name": "counting cows",
    "joke": "How do you count cows? A 'Cow'culator"
  },
  {
    "name": "He's Alright",
    "joke": "Did you hear about the guy whose whole left side was cut off? He's all right now."
  },
  {
    "name": "Flamingo",
    "joke": "When my wife told me to stop impersonating a flamingo, I had to put my foot down."
  }]

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/home.html'))

})

app.get('/upload', (req, res) => {
  res.render('index')
})

app.post("/upload", (req, res) => {
  const { jokeName, joke } = req.body;

  if (jokeName !== null && joke !== null && jokeName.length > 0 && joke.length > 0) {
    popularDadJokes.push({ name: jokeName, joke: joke })
    res.render("uploadSuccessful", {
      listOfJokes: popularDadJokes,
    });
  } else {
    res.render("uploadFailed");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000')
})

