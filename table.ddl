CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50)
);

CREATE TABLE Origins (
    origin_id INT PRIMARY KEY,
    origin_name VARCHAR(50)
);

CREATE TABLE Flavors (
    flavor_id INT PRIMARY KEY,
    flavor_desc VARCHAR(20)
);

CREATE TABLE Dishes (
    dish_id INT PRIMARY KEY,
    dish_name VARCHAR(50),
    price DECIMAL(10,2),
    is_available BOOLEAN,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES    Categories(category_id)
);

CREATE TABLE Dishes_Flavors (
    dish_id INT,
    flavor_id INT,
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id),
    FOREIGN KEY (flavor_id) REFERENCES Flavors(flavor_id),
    PRIMARY KEY (dish_id, flavor_id)
);

CREATE TABLE Dishes_Origins (
    dish_id INT,
    origin_id INT,
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id),
    FOREIGN KEY (origin_id) REFERENCES Origins(origin_id),
    PRIMARY KEY (dish_id, origin_id)
);

CREATE TABLE Ingredients (
    ingredient_id INT PRIMARY KEY,
    ingredient_name VARCHAR(50),
    quantity DECIMAL(10,2),
    import_date DATE,
    expired_date DATE,
    unit VARCHAR(50)
);

CREATE TABLE Dishes_Ingredients (
    dish_id INT,
    ingredient_id INT,
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    PRIMARY KEY (dish_id, ingredient_id)
   cost_quantity decimal(10,2)
);
