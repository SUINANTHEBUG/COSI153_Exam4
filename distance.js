// distance.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // parse query params
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);
  const z = parseFloat(req.query.z);

  // only compute if all three are valid numbers
  let resultHtml = '';
  if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
    const d = Math.sqrt(x*x + y*y + z*z);
    resultHtml = `<p>distance to (${x},${y},${z}) is d = ${d}</p>`;
  }

  // render page
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>Distance Calculator</title>
      <style>
        body { font-family: sans-serif; padding: 16px; }
        input { display: block; margin: 8px 0; padding: 8px; width: 100px; }
        button {
          background-color: #4A90E2;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
        }
        h1 { font-size: 28px; }
      </style>
    </head>
    <body>
      <h1>Distance of (x,y,z) from (0,0,0)</h1>
      <p>Write the code for this app which calculates d = Math.sqrt(x*x+y*y+z*z)</p>

      <form method="get" action="/distance">
        <input type="number" name="x" placeholder="x" step="any" value="${!isNaN(x)?x:''}" />
        <input type="number" name="y" placeholder="y" step="any" value="${!isNaN(y)?y:''}" />
        <input type="number" name="z" placeholder="z" step="any" value="${!isNaN(z)?z:''}" />
        <button type="submit">CALCULATE DISTANCE</button>
      </form>

      ${resultHtml}
    </body>
    </html>
  `);
});

module.exports = router;
