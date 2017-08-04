var fs = require("fs")
var mysql = require("mysql")
var inquirer = require("inquirer")


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});


var inquirer = require("inquirer");
// Created a series of questions
inquirer.prompt([
  {
    type: "list",
    name: "Menu",
    message: "Hey Boss, what would you like to do?",
    choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
  }


]).then(function(answer) {


userChoice = answer.Menu;
console.log(userChoice)

if(userChoice === "View Products for Sale")
{
  viewInventory();
}
});




function viewInventory(){

  connection.connect(function(err) {
    if (err) throw err;
  });


  connection.query("SELECT * FROM products", function(err,res)
  {
  if(err) throw err;
for (var i = 0; i < res.length; i++) {
  console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || StockQty: " + res[i].stock_quantity)
}

  // res[0].item_id
  // res[0].stock_quantity;
  // res[0].price;
  // res[0].product_name;
});


connection.end();

}
