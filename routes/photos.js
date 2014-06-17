/*
 * photo.js - dummy photo to populate the view
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
 Photo 	= require( '../models/Photo' ),
 path 	= require( 'path' ),
 fs 	= require( 'fs' ),
 join 	= path.join,
 photos = [],
 list, form, submit, download, initModule;

// ----- END MODULE SCOPE VARIABLES -----

// ----- BEGIN PUBLIC METHODS -----
list = function ( req, res, next ) {
	Photo.find({}, function ( err, photos ) {
		if( err ) { 
			return next( err );
		}

		res.render( 'photos', {
		 	title : 'Photos',
			photos : photos
		});
	});
};

form = function ( req, res ){
	res.render( 'photos/upload', {
		title : 'Photo upload'
	});
};

submit = function ( dir ){
	return function ( req, res, next ) {
		var 
		 img  = req.files.photo.image,
		 name = req.body.photo.name || img.name,
		 path = join( dir, name ); 

		fs.rename( img.path, path, function ( err ) {
			if( err ) {
				return next( err );
			}

			Photo.create({
				name : name,
				path : name
			}, function ( err ) {
				if( err ) { 
					return next( err ); 
				}

				res.redirect( '/' );
			});
		});
	};
};

download = function ( dir ) {
	return function ( req, res, next ) {
		Photo.findById( req.params.id, function ( err, photo ) {
			if( err ) { 
				return next( err );
			}

			var path = join( dir, photo.path );
			res.download( path, photo.name + '.jpg' );
		});
	};
};

// ----- END PUBLIC METHODS -----

// ----- BEGIN MODULE INITIALIZATION -----
initModule = function() {
	photos.push({
		name : 'Node.js logo',
		path : 'http://nodejs.org/images/download-logo.png'
	});

	photos.push({
		name : 'Ryan speaking',
		path : 'http://nodejs.org/images/ryan-speaker.jpg'
	});
};
// ----- END MODULE INITIALIZATION -----

module.exports = {
	initModule 	: initModule,
	list 		: list,
	form 		: form,
	submit		: submit,
	download 	: download
};