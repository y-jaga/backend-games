const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(helmet());

// Set specific CSP rules
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://vercel.live', 'https://apis.google.com'],
      // Add other necessary directives based on your resources
    },
  })
);


const games = [
    {
      id: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Action-adventure',
      platform: 'Nintendo Switch',
      releaseYear: 2017,
    },
    {
      id: 2,
      title: 'God of War',
      genre: 'Action-adventure',
      platform: 'PlayStation 4',
      releaseYear: 2018,
    },
    {
      id: 3,
      title: 'Cyberpunk 2077',
      genre: 'Role-playing',
      platform: 'PC',
      releaseYear: 2020,
    },
    {
      id: 4,
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      platform: 'PC',
      releaseYear: 2017,
    },
    {
      id: 5,
      title: 'Minecraft',
      genre: 'Sandbox',
      platform: 'Multi-platform',
      releaseYear: 2011,
    },
  ];

//Exercise 2: Get all games

app.get('/games', (req, res) => {
    res.json({ games });
})

//Exercise 3: Get game by ID

app.get('/games/:id', (req, res) => {
    let gameId = parseInt(req.params.id);
    let game = games.find((game) => game.id === gameId);

    if(game) {
        res.json({ game });
    }
    else {
        res.status(404).json({ message : 'No game found.'});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
