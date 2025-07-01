// server.js
const express = require('express');
const app = express();

// 1. Button screen at GET /
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Button Screen</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { height: 100%; }
      body { display: flex; flex-direction: column; font-family: sans-serif; background: #f0f2f5; }

      .top-bar { display: flex; justify-content: center; background: white; padding: 8px 0; }
      .top-bar button { margin: 0; border-radius: 4px; }

      .content { flex: 1; display: flex; align-items: center; justify-content: center; }
      .content h1 { font-size: 24px; font-weight: 600; }

      .bottom-bar { display: flex; flex-direction: column; background: white; }
      .bottom-bar button { width:100%; margin:0; border-radius:0; }
      .bottom-bar button:first-child { border-top-left-radius:4px; border-top-right-radius:4px; }
      .bottom-bar button:last-child  { border-bottom-left-radius:4px; border-bottom-right-radius:4px; }

      button { border:none; padding:12px; font-size:16px; font-weight:bold; text-transform:uppercase; color:white; cursor:pointer; }
      .blue  { background:#004bff; }
      .red   { background:#e53935; }
      .green { background:#2e7d32; }
    </style>
  </head>
  <body>
    <div class="top-bar">
      <button class="blue">Blue Button</button>
      <button class="red">Red Button</button>
      <button class="green">Green Button</button>
    </div>

    <div class="content">
      <h1>Write the code for this screen</h1>
    </div>

    <div class="bottom-bar">
      <button class="blue">Blue Button</button>
      <button class="red">Red Button</button>
      <button class="green">Green Button</button>
    </div>
  </body>
  </html>
  `);
});

// 2. Recipe finder at /recipes
const recipeRouter = require('./recipe');
app.use('/recipes', recipeRouter);

// 3. Distance calculator at /distance
const distanceRouter = require('./distance');
app.use('/distance', distanceRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening:
  • Buttons:   http://localhost:${PORT}/
  • Recipes:   http://localhost:${PORT}/recipes
  • Distance:  http://localhost:${PORT}/distance
  `);
});
