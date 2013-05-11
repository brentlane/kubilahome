#!/usr/bin/env node

var express = require ('express');
var app = express();

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// simple logger
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

// static files
app.use(express.static(__dirname + '/client') );

// heroku will set PORT env
app.listen(process.env.PORT || 3009, function(){
	console.log("Express server listening on port %d in %s mode, static dir %s", this.address().port, app.settings.env, __dirname);
});
