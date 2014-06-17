/*
 * index.js
*/

/*jslint        node   : true, continue : true,
 devel  : true, indent : 2,    maxerr   : 50,
 newcap : true, nomen  : true, plusplus : true,
 regexp : true, sloppy : true, vars     : false,
 white  : true
*/

/*global */

/* GET home page. */
exports.index = function(req, res){
  	res.render('index', { title: 'Express' });
};
