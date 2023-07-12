INSERT INTO Categories (category_id, category_name)
VALUES (1, 'Dessert'),
       (2, 'Main Dish'),
       (3, 'Snack'),
       (4, 'Beverage'),
       (5, 'Appetizer'),
       (6, 'Soup'),
       (7, 'Salad'),
       (8, 'Side Dish'),
       (9, 'Breakfast'),
       (10, 'Vegetarian'),
       (11, 'Seafood'),
       (12, 'Pasta'),
       (13, 'Sandwich'),
       (14, 'Chicken'),
       (15, 'Beef'),
       (16, 'Pork'),
       (17, 'Vegetable'),
       (18, 'Rice'),
       (19, 'Noodle'),
       (20, 'Sushi');
 
-- Thêm dữ liệu vào bảng Dishes
INSERT INTO Dishes (dish_id, dish_name, price, is_available, category_id)
VALUES (1, 'Chocolate Cake', 9.99, 1, 1),
       (2, 'Pizza Margherita', 12.99, 1, 2),
       (3, 'French Fries', 4.99, 1, 3),
       (4, 'Coca-Cola', 2.99, 1, 4),
       (5, 'Caesar Salad', 8.99, 1, 7),
       (6, 'Tomato Soup', 6.99, 1, 6),
       (7, 'Chicken Wings', 10.99, 1, 8),
       (8, 'Pancakes', 7.99, 1, 9),
       (9, 'Caprese Salad', 9.99, 1, 7),
       (10, 'Vegetable Stir Fry', 11.99, 1, 17),
       (11, 'Grilled Salmon', 15.99, 1, 11),
       (12, 'Spaghetti Bolognese', 12.99, 1, 12),
       (13, 'BLT Sandwich', 8.99, 1, 13),
       (14, 'Roast Chicken', 13.99, 1, 14),
       (15, 'Beef Steak', 19.99, 1, 15),
       (16, 'Pork Chop', 14.99, 1, 16),
       (17, 'Fried Rice', 10.99, 1, 18),
       (18, 'Pad Thai', 11.99, 1, 7),
       (19, 'Ramen Noodle Soup', 9.99, 1, 19),
       (20, 'California Roll', 8.99, 1, 20),
       (21, 'Tiramisu', 7.99, 1, 1),
       (22, 'Margarita Pizza', 12.99, 1, 2),
       (23, 'Onion Rings', 5.99, 1, 3),
       (24, 'Iced Tea', 2.99, 1, 4),
       (25, 'Greek Gyro', 9.99, 1, 7);
 
-- Thêm dữ liệu vào bảng Flavors
INSERT INTO Flavors (flavor_id, flavor_desc)
VALUES (1, 'Sweet'),
       (2, 'Salty'),
       (3, 'Spicy'),
       (4, 'Sour'),
       (5, 'Bitter'),
       (6, 'Savory');
 
-- Thêm dữ liệu vào bảng Dishes_Flavors
INSERT INTO Dishes_Flavors (dish_id, flavor_id)
VALUES (1, 1),
       (4, 1),
       (8, 1),
       (21, 1),
       (24, 1),
       (3, 2),
       (7, 2),
       (13, 2),
       (23, 2),
       (2, 6),
       (5, 6),
       (6, 6),
       (9, 6),
       (10, 6),
       (11, 6),
       (12, 6),
       (14, 6),
	   (15, 6),
       (16, 6),
       (17, 6),
       (18, 6),
       (19, 6),
       (20, 6),
       (22, 6),
       (25, 6);
 
-- Thêm dữ liệu vào bảng Origins
INSERT INTO Origins (origin_id, origin_name)
VALUES (1, 'North'),
       (2, 'South'),
       (3, 'Japan'),
       (4, 'Italy'),
       (5, 'Mexico'),
       (6, 'India'),
       (7, 'Thailand'),
       (8, 'France'),
       (9, 'China'),
       (10, 'Greece'),
       (11, 'Brazil'),
       (12, 'Spain'),
       (13, 'Korea'),
       (14, 'Vietnam'),
       (15, 'Lebanon'),
       (16, 'Turkey'),
       (17, 'Morocco'),
       (18, 'Peru'),
       (19, 'Australia'),
       (20, 'Russia');
 
-- Thêm dữ liệu vào bảng Dishes_Origins
INSERT INTO Dishes_Origins (dish_id, origin_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (2, 4),
       (3, 1),
       (3, 2),
       (4, 4),
       (5, 8),
       (6, 8),
       (7, 14),
       (8, 9),
       (9, 4),
       (9, 8),
       (10, 6),
       (10, 7),
       (11, 11),
       (12, 4),
       (12, 8),
       (13, 14),
       (14, 14),
       (15, 15),
       (16, 16),
       (17, 9),
       (18, 7),
       (19, 13),
       (19, 14),
       (20, 3),
       (20, 9),
       (21, 1),
       (21, 2),
       (22, 2),
       (22, 4),
       (23, 1),
       (23, 2),
       (24, 4),
       (25, 8),
       (25, 14);
 
-- Thêm dữ liệu vào bảng Ingredients
INSERT INTO Ingredients (ingredient_id, ingredient_name, quantity, import_date, expired_date, unit)
VALUES (1, 'Flour', 5.00, '2022-12-01', '2023-12-01', 'kg'),
       (2, 'Sugar', 2.00, '2022-11-15', '2023-11-15', 'kg'),
       (3, 'Tomato Sauce', 3.00, '2022-10-20', '2023-10-20', 'bottle'),
       (4, 'Eggs', 10.00, '2022-11-30', '2023-11-30', 'piece'),
       (5, 'Butter', 3.00, '2022-10-10', '2023-10-10', 'kg'),
       (6, 'Salt', 1.00, '2022-11-01', '2023-11-01', 'gram'),
       (7, 'Cheese', 4.00, '2022-09-15', '2023-09-15', 'kg'),
       (8, 'Onions', 6.00, '2022-12-05', '2023-12-05', 'kg'),
       (9, 'Garlic', 2.00, '2022-10-25', '2023-10-25', 'kg'),
       (10, 'Olive Oil', 2.00, '2022-09-30', '2023-09-30', 'bottle'),
       (11, 'Chicken Breast', 8.00, '2022-11-20', '2023-11-20', 'kg'),
       (12, 'Lettuce', 2.00, '2022-10-15', '2023-10-15', 'piece'),
       (13, 'Rice', 7.00, '2022-12-10', '2023-12-10', 'kg'),
       (14, 'Fish Fillet', 5.00, '2022-09-20', '2023-09-20', 'kg'),
       (15, 'Pasta', 6.00, '2022-11-05', '2023-11-05', 'kg'),
       (16, 'Bread', 5.00, '2022-10-05', '2023-10-05', 'piece'),
       (17, 'Soy Sauce', 3.00, '2022-09-25', '2023-09-25', 'bottle'),
       (18, 'Beef Steak', 4.00, '2022-12-15', '2023-12-15', 'kg'),
       (19, 'Ginger', 1.00, '2022-10-01', '2023-10-01', 'kg'),
       (20, 'Cucumber', 4.00, '2022-09-10', '2023-09-10', 'piece'),
       (21, 'Milk', 3.00, '2022-10-20', '2023-10-20', 'l'),
       (22, 'Yogurt', 4.00, '2022-11-15', '2023-11-15', 'kg'),
       (23, 'Mayonnaise', 2.00, '2022-12-05', '2023-12-05', 'bottle'),
       (24, 'Lemon', 6.00, '2022-10-10', '2023-10-10', 'piece'),
       (25, 'Shrimp', 8.00, '2022-11-30', '2023-11-30', 'kg');
 
-- Thêm dữ liệu vào bảng Dishes_Ingredients
INSERT INTO Dishes_Ingredients (dish_id, ingredient_id, cost_quantity)
VALUES (1, 1, 0.20),
       (1, 2, 0.40),
       (2, 3, 0.10),
	   (2, 4, 0.50),
       (3, 5, 0.10),
       (3, 6, 0.30),
       (4, 3, 0.40),
       (5, 7, 0.20),
       (6, 8, 0.40),
       (7, 9, 0.60),
       (8, 4, 0.20),
       (8, 5, 0.30),
       (9, 10, 0.40),
       (10, 11, 0.10),
       (10, 12, 0.20),
       (11, 5, 0.10),
       (11, 13, 0.40),
       (12, 5, 0.20),
       (12, 14, 0.10),
       (13, 15, 0.30),
       (13, 16, 0.40),
       (14, 11, 0.20),
       (15, 5, 0.30),
       (15, 15, 0.10),
       (16, 17, 0.20),
       (17, 18, 0.30),
       (18, 8, 0.40),
       (18, 19, 0.50),
       (19, 9, 0.10),
       (19, 13, 0.30),
       (20, 12, 0.20),
       (20, 20, 0.40),
       (21, 1, 0.10),
       (21, 7, 0.40),
       (22, 6, 0.50),
       (22, 7, 0.20),
       (22, 21, 0.30),
       (23, 1, 0.20),
       (23, 6, 0.10),
       (24, 6, 0.40),
       (24, 8, 0.20),
       (25, 9, 0.30),
       (25, 10, 0.10);
