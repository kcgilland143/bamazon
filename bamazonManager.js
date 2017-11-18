var products = require('./products.js')
var inquirer = require('inquirer')
var args = process.argv.slice(2)

var items = {}
var separator = '\n===========\n'
var offset = 0

var actions = ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

inquirer.prompt([{
  type: "list",
  message: "What would you like to do?",
  choices: actions,
  name: "action"
}]).then(function (answers, other) {
  console.log(answers, other)
  switch (actions.indexOf(answers.action)) {
    case 0: { // show all products
      products.connection.connect(function (err) {
        if (err) throw err;
        products.connection.query('SELECT * FROM products', function (err, results) {
          if (err) throw err;
          results.forEach(function (item) {
            products.separator()
            products.newItem(item).show()
          })
          products.connection.end()
        })
      })
      break
    }
    case 1: { // view low inventory
      products.connection.connect(function (err) {
        if (err) throw err;
        products.connection.query('SELECT * FROM products WHERE stock_quantity < ?', 
          [5],
        function (err, results) {
          if (err) throw err;
          results.forEach(function (item) {
            products.separator()
            products.newItem(item).show()
          })
          products.connection.end()
        })
      })
      break
    }
    case 2: { // add to inventory
      //gather which item from user
      //gather how many from user
      //update item with new quantity
      break
    }
    case 3: { // add new product
      //gather info for new item
      //create new item insert into database
      break
    }
    default: break;
  }
})