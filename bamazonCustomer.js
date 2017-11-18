var mysql = require("mysql");
var inquirer = require('inquirer')
var args = process.argv.slice(2)

var items = {}
var separator = '\n===========\n'
var offset = 0

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "162534",
  database: "bamazon"

})

function showItem(item) {
  console.log('id:', item.item_id)
  console.log('name:', item.product_name )
  console.log('department name:', item.department_name)
  console.log('amount:', item.stock_quantity)
  console.log('price: ', '$' + item.price)
}

connection.connect(function (err) {
  if (err) throw err;
  connection.query(`SELECT * FROM products`, function (error, results, fields) {
    if (error) throw error;
    items = []
    results.forEach(function (item) {
      console.log(separator)
      showItem(item)
      items.push(item)
    })
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like to buy?",
        choices: items.map(function (item) {return `${item.item_id} : ${item.product_name}`}),
        name: "item"
      },
      {
        type: "input",
        message: "How many?",
        validate: function (ans) { return !isNaN(ans) },
        name: "quantity"
      }]).then(function (answers) {
        var selection = parseInt(answers.item.split(':')[0].trim())
        var quantity = parseInt(answers.quantity)
        console.log('selection: ', selection)
        console.log('quantity: ', quantity)
        connection.query('SELECT (stock_quantity) FROM products WHERE ?', {item_id: selection}, 
        function (error, results, fields) {
          if (error) throw error;
          var ltQuant = results[0].stock_quantity
          if (quantity > ltQuant) {
            console.log('Sorry, we do not have that much!')
            connection.end()
          } else {
            ltQuant -= quantity
            connection.query('UPDATE products SET ? WHERE ? ', 
            [{
              stock_quantity: ltQuant
            },
            {
              item_id: selection
            }], function (error, results, fields) {
              if (error) throw error;
              console.log(separator)
              showItem(function (item, quantity) {
                obj = {}
                Object.assign(obj, item)
                obj.stock_quantity = quantity
                obj.price = item.price * quantity
                return obj
              }(items[selection - 1], quantity))
              console.log(separator)
              showItem(items[selection - 1])
              connection.end()
            })
          }
        })
      })
  })
})