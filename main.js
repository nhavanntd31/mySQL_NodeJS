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
app.get('/dishID=:dishId', (req, res) => {
  const dishId = req.params.dishId;

  const dishQuery = `
    SELECT
      D.dish_id,
      D.dish_name,
      D.price,
      D.is_available,
      C.category_name AS Category,
      GROUP_CONCAT(DISTINCT O.origin_name SEPARATOR ', ') AS Origin,
      GROUP_CONCAT(DISTINCT F.flavor_desc SEPARATOR ', ') AS Flavor
    FROM
      Dishes AS D
      JOIN Categories AS C ON D.category_id = C.category_id
      JOIN Dishes_Origins AS DO ON D.dish_id = DO.dish_id
      JOIN Origins AS O ON DO.origin_id = O.origin_id
      JOIN Dishes_Flavors AS DF ON D.dish_id = DF.dish_id
      JOIN Flavors AS F ON DF.flavor_id = F.flavor_id
    WHERE
      D.dish_id = ?
    GROUP BY
      D.dish_id
  `;

  const ingredientsQuery = `
    SELECT
      I.ingredient_name,
      DI.cost_quantity,
      I.unit
    FROM
      Dishes_Ingredients AS DI
      JOIN Ingredients AS I ON DI.ingredient_id = I.ingredient_id
    WHERE
      DI.dish_id = ?
  `;

  dbconnection.query(dishQuery, [dishId], (err, dishes) => {
    if (err) {
      console.error('Error executing dish query: ' + err.message);
      res.render('error');
    } else {
      dbconnection.query(ingredientsQuery, [dishId], (err, ingredients) => {
        if (err) {
          console.error('Error executing ingredients query: ' + err.message);
          res.render('error');
        } else {
          res.render('dish', { dishes: dishes, ingredients: ingredients });
        }
      });
    }
  });
});

app.get('/storage', (req, res) =>{
  dbconnection.query('SELECT * FROM ingredients', (err, result) =>{
    if (err) app.render('error');
    else
    {
      res.render('storage', {ingredient : result});
    }
  })
})
// Chạy server
app.get('/orderID=:dishID', (req, res) => {
  const dishID = req.params.dishID;

  // Thực hiện câu truy vấn để lấy lượng nguyên liệu món ăn
  const query = `
    SELECT DI.ingredient_id, DI.cost_quantity, I.quantity
    FROM Dishes_Ingredients AS DI
    JOIN Ingredients AS I ON DI.ingredient_id = I.ingredient_id
    WHERE DI.dish_id = ?;
  `;

  dbconnection.query(query, [dishID], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.message);
      res.render('error');
    } else {
      // Kiểm tra lượng nguyên liệu của món ăn
      let isEnoughIngredients = true;
      let ingredientsToUpdate = {};

      for (const row of results) {
        const ingredientID = row.ingredient_id;
        const costQuantity = row.cost_quantity;
        const currentQuantity = row.quantity;

        if (currentQuantity < costQuantity) {
          isEnoughIngredients = false;
          break;
        } else {
          // Lưu thông tin để cập nhật sau này
          ingredientsToUpdate[ingredientID] = currentQuantity - costQuantity;
        }
      }

      if (isEnoughIngredients) {
        // Update lượng nguyên liệu và cập nhật is_available của món ăn
        const updateQueries = [];

        for (const ingredientID in ingredientsToUpdate) {
          const newQuantity = ingredientsToUpdate[ingredientID];
          const updateQuery = `
            UPDATE Ingredients
            SET quantity = ?
            WHERE ingredient_id = ?;
          `;
          updateQueries.push(dbconnection.query(updateQuery, [newQuantity, ingredientID]));
        }

        updateQueries.push(dbconnection.query('UPDATE Dishes SET is_available = false WHERE dish_id = ?', [dishID]));

        Promise.all(updateQueries)
          .then(() => {
            res.render('success', { message: 'Đã order thành công!' });
          })
          .catch((error) => {
            console.error('Error updating ingredients: ' + error.message);
            res.render('error');
          });
      } else {
        // Không đủ nguyên liệu, chỉ cập nhật is_available của món ăn
        dbconnection.query('UPDATE Dishes SET is_available = false WHERE dish_id = ?', [dishID], (err) => {
          if (err) {
            console.error('Error updating dish availability: ' + err.message);
            res.render('error');
          } else {
            res.render('success', { message: 'Đã order thành công!' });
          }
        });
      }
    }
  });
});




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
