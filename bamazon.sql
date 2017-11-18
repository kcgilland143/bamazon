DROP DATABASE IF EXISTS bamazon;
Create database bamazon;
use bamazon;

create table products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(50) NOT NULL,
  department_name varchar(50),
  stock_quantity int NOT NULL,
  price decimal(10,2) NOT NULL,
  primary key (item_id)
);