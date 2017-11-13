var mysql = require("mysql");
var inquirer = require('inquirer');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "911258",
    database: "hw11"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
afterConnection()

function afterConnection() {
    connection.query("SELECT * FROM bamazon;", function(err, res) {
        if (err) throw err;
        console.log("Item ID" + " | " + "Product" + " | " + "Department" + " | " + "price in $" + " | " + "available quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price_copy1 + " | " + res[i].stock_quantity);
        }
        myFunction();


        //console.log(res);
        // connection.end();
    });
}

function myFunction() {

    inquirer.prompt([
            // Here we create a basic text prompt, which asks the user the ID of the product they would like to buy.
            // Then it asks how many units of the product they would like to buy.
            {
                type: 'input',
                message: 'What is the product ID of the product you would like to purchase? \n',
                name: 'productID',
            },
            {
                type: 'input',
                message: 'How many units would you like to buy? \n',
                name: 'units',
            },
            {
                type: 'confirm',
                message: 'Are you sure that is what you want to buy?',
                name: 'confirm',
                default: true
                // quick input confirm
            }
        ])


        .then(function(inquirerResponse) {

            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            var product = inquirerResponse.productID;
            product = product.toUpperCase();
            product = product.trim();
           
            var units = inquirerResponse.units;
            units = units.toUpperCase();
            units = units.trim();


            //connection.end();
            if (inquirerResponse.confirm) {
        

    connection.query("SELECT price_copy1 FROM bamazon WHERE item_id =" + product + ";", function(err, res) {

    	var price = res[0].price_copy1;
    	var cost = price * units;


        console.log("costs " + cost);
        if (err) throw err;
        console.log("-----------Thank you for shopping with us, the price of your purchase is $"+ cost +"!-------");



        //-------

   // if (err) throw err;
   //      console.log("Item ID" + " | " + "Product" + " | " + "Department" + " | " + "price in $" + " | " + "available quantity");
   //      for (var i = 0; i < res.length; i++) {
   //          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price_copy1 + " | " + res[i].stock_quantity);
   //      }
        // ----





    })
}
});
    //console.log(res);
    // connection.end();

}
