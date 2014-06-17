/*
 * Photo.js - model with access to data layer
*/

/*jslint        node   : true, continue : true,
 devel  : true, indent : 2,    maxerr   : 50,
 newcap : true, nomen  : true, plusplus : true,
 regexp : true, sloppy : true, vars     : false,
 white  : true
*/

/*global */
// ----- BEGIN MODULE SCOPE VARIABLES -----
'use strict';
var
 mongoose 	= require( 'mongoose' ),
 schema 	= new mongoose.Schema({
 	name : String,
 	path : String
 }),
 photoModel;

// ----- BEGIN MODULE INITIALIZATION -----
photoModel = (function () {
	mongoose.connect( 'mongodb://localhost/photo_app' );
	return mongoose.model( 'Photos', schema );
}());
// ----- END MODULE INITIALIZATION -----

module.exports = photoModel;