// main.js
const express = require('express');
const mysql = require('mysql');
const app = express();

// Kết nối với MySQL
const dbconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'menu',
  insecureAuth: true
});

dbconnection.connect((err) => {
  if (err) {
    console.error('Failed to connect to database: ' + err.message);
  } else {
    console.log('Connected to database');
  }
});

// Thiết lập EJS là view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set("views", "views");
// Định nghĩa các route
app.get('/', (req, res) => {
  // Truy vấn dữ liệu từ database
  let query = 'SELECT DISTINCT dish_id, dish_name FROM dishes JOIN dishes_flavors USING(dish_id) JOIN dishes_origins USING(dish_id) ';
  // console.log(query);
  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing origin query: ' + err.message);
      res.render('error');
    } else {
      dbconnection.query('SELECT * FROM Categories', (err, categories) => {
        if (err) {
          console.error('Error executing category query: ' + err.message);
          res.render('error');
        } else {
          dbconnection.query('SELECT * FROM Flavors', (err, flavors) => {
            if (err) {
              console.error('Error executing flavor query: ' + err.message);
              res.render('error');
            } else {
              dbconnection.query('SELECT * FROM Origins', (err, origins) => {
                if (err) {
                  console.error('Error executing origin query: ' + err.message);
                  res.render('error');
                } else {
                  res.render('home', { dishes: result, dataCategories: categories, dataFlavors: flavors, dataOrigins: origins });
                }
              });
            }
          });
        }
      });
    }
  });
});
app.get('/search', (req, res) => {
  const category = req.query.category;
  const flavor = req.query.flavor;
  const origin = req.query.origin;
  let query = 'SELECT DISTINCT dish_id, dish_name FROM dishes JOIN dishes_flavors USING(dish_id) JOIN dishes_origins USING(dish_id) WHERE ';
  if (category !== '0') query += 'category_id =' + category.toString() + ' AND ';
  if (flavor !== '0') query += 'flavor_id =' + flavor.toString() + ' AND ';
  if (origin !== '0') query += 'origin_id =' + origin.toString() ;
  query = query.replace(/ AND $/, ''); 
  console.log(query);
  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing origin query: ' + err.message);
      res.render('error');
    } else {
      dbconnection.query('SELECT * FROM Categories', (err, categories) => {
        if (err) {
          console.error('Error executing category query: ' + err.message);
          res.render('error');
        } else {
          dbconnection.query('SELECT * FROM Flavors', (err, flavors) => {
            if (err) {
              console.error('Error executing flavor query: ' + err.message);
              res.render('error');
            } else {
              dbconnection.query('SELECT * FROM Origins', (err, origins) => {
                if (err) {
                  console.error('Error executing origin query: ' + err.message);
                  res.render('error');
                } else {
                  res.render('search', { dishes: result, dataCategories: categories, dataFlavors: flavors, dataOrigins: origins });
                }
              });
            }
          });
        }
      });
    }
  });
});
app.get('/:dishId', (req, res) => {
  const dishId = req.params.dishId;

  const dishQuery = `
    SELECT
      D.dish_id,
      D.dish_name,
      D.price,
      D.is_available,
      C.category_name AS Category,
      GROUP_CONCAT(DISTINCT O.origin_name SEPARATOR ', ') AS Origin,
      GROUP_CONCAT(DISTINCT F.flavor_desc SEPARATOR ', ') AS Flavor,
      GROUP_CONCAT(DISTINCT I.ingredient_name) AS Ingredient,
      GROUP_CONCAT(DISTINCT DI.cost_quantity) AS Cost
    FROM
      Dishes AS D
      JOIN Categories AS C ON D.category_id = C.category_id
      JOIN Dishes_Origins AS DO ON D.dish_id = DO.dish_id
      JOIN Origins AS O ON DO.origin_id = O.origin_id
      JOIN Dishes_Flavors AS DF ON D.dish_id = DF.dish_id
      JOIN Flavors AS F ON DF.flavor_id = F.flavor_id
      JOIN Dishes_Ingredients AS DI ON D.dish_id = DI.dish_id
      JOIN Ingredients AS I ON DI.ingredient_id = I.ingredient_id
    WHERE
      D.dish_id = ?
    GROUP BY
      D.dish_id;
  `;

  const unitQuery = `
    SELECT unit
    FROM (
      SELECT ingredient_id
      FROM dishes_ingredients
      WHERE dish_id = ?
    ) AS I
    JOIN Ingredients USING(ingredient_id);
  `;

  dbconnection.query(dishQuery, [dishId], (err, dishes) => {
    if (err) {
      console.error('Error executing dish query: ' + err.message);
      res.render('error');
    } else {
      dbconnection.query(unitQuery, [dishId], (err, units) => {
        if (err) {
          console.error('Error executing unit query: ' + err.message);
          res.render('error');
        } else {
          res.render('dish', { dishes: dishes, units: units });
        }
      });
    }
  });
});
  
// Chạy server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
