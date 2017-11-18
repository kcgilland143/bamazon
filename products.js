var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
})

var item = {
  item_id:0,
  product_name: '',
  department_name: '',
  stock_quantity: 0,
  price: 0.00,

  show: function showItem() {
    console.log('id:', this.item_id)
    console.log('name:', this.product_name )
    console.log('department name:', this.department_name)
    console.log('amount:', this.stock_quantity)
    console.log('price: ', '$' + this.price)
  }
}

function Item (id, name, dept, amount, price) {
  if (typeof id === 'object') {
    Object.assign(this, id)
    Object.setPrototypeOf(this, item)
    return this
  } else {
    this.item_id = id
    this.product_name = name
    this.department_name = dept
    this.stock_quantity = amount
    this.price = price
    Object.setPrototypeOf(this, item)
    return this
  }
}

var products = {
  connection: connection,
  separator: function () { console.log('\n=======\n') },
  newItem: Item
}

module.exports = products