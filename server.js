var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./middleware.js');
var app = express();

var PORT = process.env.PORT || 3000;

// This is middleware definition

var todos = [{id:1,name:'Cooking',notes:'Self service for poor' , date:new Date('03/10/2017')},
			{id:2,name:'Groceries',notes:'Go to Taj and pick groceries' , date:new Date('03/11/2017')},]
			
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());

app.use(middleware.logger);

app.get('/about', function(req,res){

	res.send('About Node JS Express module');
});

app.get('/allTodos',function(req,res){

	res.json(todos);

});

app.post('/addTodo',function(req,res){

	var newTodo = req.body.newTodo;
	console.log(newTodo);
	todos.push(newTodo);

	res.json(todos);

});






app.listen(PORT,function(){

	console.log("Server started " + PORT);
});