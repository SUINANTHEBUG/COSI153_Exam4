// recipe.js
const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const router = express.Router();

router.get('/', async (req, res) => {
  const ingredient = req.query.i || 'beef';
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const apiRes = await fetch(apiUrl);
    const { meals = [] } = await apiRes.json();

    // build HTML for each meal
    const cardsHtml = meals.map(m => `
      <div style="
        display:flex;
        align-items:center;
        background:#FDE5C4;
        border:2px solid black;
        border-radius:4px;
        padding:16px;
        margin-bottom:12px;
      ">
        <div style="flex:1; font-size:20px;">${m.strMeal}</div>
        <img
          src="${m.strMealThumb}"
          width="100" height="100"
          style="margin-left:12px; border-radius:4px;"
        />
      </div>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Recipes for ${ingredient}</title>
        <style>
          body { font-family: sans-serif; padding: 16px; background: #fff; }
          h1 { font-size: 28px; margin-bottom: 24px; }
        </style>
      </head>
      <body>
        <h1>Meals with “${ingredient}”</h1>
        ${cardsHtml}
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching meals');
  }
});

module.exports = router;
