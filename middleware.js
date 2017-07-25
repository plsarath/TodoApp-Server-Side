module.exports = {
	requireAuthentication:function(req,res,next){

		console.log('Authenticated succesfully');
		next();
	},

	logger : function(req,res,next){

		console.log("Request :" + new Date().toString() + " " + req.originalUrl);

		next();
	}

};