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







var userProduct;
var userQuantity;

var inquirer = require("inquirer");
// Created a series of questions
inquirer.prompt([
  {
    type: "input",
    name: "firstQuestion",
    message: "What is the product ID you would like to purchase"
  },

  {

    type: "input",
    name: "secondQuestion",
    message: "How much would you like to purchase boss"

  }
]).then(function(answer) {


userProduct = answer.firstQuestion;
userQuantity = answer.secondQuestion;

checkStock(userProduct,userQuantity);


});




// function to check the stock

function checkStock(userProduct,userQuantity){

var userProduct = userProduct;
var userQuantity = userQuantity;


  connection.connect(function(err) {
    if (err) throw err;
  });


  connection.query("SELECT stock_quantity FROM products WHERE item_id=" + userProduct, function(err,res)
  {
  if(err) throw err;

  if(res[0].stock_quantity >= userQuantity)
  {

    var newStock = res[0].stock_quantity - userQuantity
    Order(userProduct,userQuantity,newStock)
    console.log("order complete")
  }

  else{

    console.log("Insufficient Quantity!")
  }



  connection.end();

  });

}







// function to complete order output purchase cost and reduce stock in database
function Order(userProduct,userQuantity,newStock){

var newStock = newStock;
var userProduct = userProduct;
var userQuantity = userQuantity;



  connection.query("SELECT price, product_sales FROM products WHERE item_id=" + userProduct, function(err,res){
    if(err) throw err;

  var costofPurchase =  res[0].price * userQuantity
  console.log("Cost of your purchase: " + "$" + costofPurchase);



  var newProductSales = res[0].product_sales + costofPurchase;





  });





    connection.query("UPDATE products " + "SET stock_quantity=" + newStock +  " WHERE item_id=" + userProduct, function(err,res)
    {
    if(err) throw err;


    });

};
