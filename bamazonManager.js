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

if(userChoice === "View Low Inventory")

{
  viewLowInventory();
}

if(userChoice === "Add to Inventory")

{
addtoInventory();


}

if(userChoice === "Add New Product")

{

  addnewProduct();
}
});


function addtoInventory(){


// viewAllInventory();



inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is the item ID of the product you would like to add?",
  },

  {

    type:"input",
    name:"qty",
    message : "How much would you like to add?"
  }

]).then(function(answer) {


var userProduct = answer.name;
var userQuantity = answer.qty;


 connection.connect(function(err) {
    if (err) throw err;
  });



  connection.query("SELECT stock_quantity FROM products WHERE item_id=" + userProduct, function(err,res)
  {
  if(err) throw err;



var newStock = res[0].stock_quantity + userQuantity;


connection.query("UPDATE products " + "SET stock_quantity=" + newStock +  " WHERE item_id=" + userProduct, function(err,res)
    {
    if(err) throw err;


    });


});

});



};





function addnewProduct(){


inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is the Item Name?",
  },

  {

    type:"input",
    name:"Price",
    message : "Price of Item?"
  },

  {

    type:"input",
    name:"stock_quantity",
    message:"How much of the item would you like to add?"
  },

  {

    type:"input",
    name:"dept",
    message:"What department does it fall under?"
  }

]).then(function(answer) {


var userProduct = answer.name;
var userQuantity = answer.qty;











  connection.connect(function(err) {
    if (err) throw err;
  });


  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res)
  {
  if(err) throw err;






}
























function viewLowInventory(){

  connection.connect(function(err) {
    if (err) throw err;
  });


  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res)
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



function viewAllInventory (){


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













function viewInventory(){

  connection.connect(function(err) {
    if (err) throw err;
  });


  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err,res)
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



