/*
 * app.js
*/

/*jslint        node   : true, continue : true,
 devel  : true, indent : 2,    maxerr   : 50,
 newcap : true, nomen  : true, plusplus : true,
 regexp : true, sloppy : true, vars     : false,
 white  : true
*/

/*global */

// ----- BEGIN MODULE SCOPE VARIABLES -----
var
 express    = require( 'express' ),
 http       = require( 'http' ),
 path       = require( 'path' ),
 routes     = require( './routes' ),
 users      = require( './routes/user' ),
 photos     = require( './routes/photos' ),
 app        = express(),
 server     = http.createServer( app );
// ----- END MODULE SCOPE VARIABLES -----

// ----- BEGIN SERVER CONFIGURATION -----
app.configure( function() {
    app.set( 'port', process.env.PORT || 3000 );
    app.set( 'views', __dirname + '/views' );
    app.set( 'view engine', 'ejs' );
    app.set( 'photos', __dirname + '/public/photos' );

    app.use( express.favicon() );
    app.use( express.logger( 'dev' ));
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( app.router );
    app.use( express.static( __dirname + '/public' ) );
});

app.configure( 'development', function() {
    app.use( express.errorHandler() );
});

app.configure( 'production', function() {
    app.set( 'photos', '/mounted-volume/photos' );
});

app.get( '/', routes.index );
app.get( '/users', users.list );
app.get( '/photos', photos.list );
app.get( '/upload', photos.form );
app.post( '/upload', photos.submit( app.get( 'photos' ) ));
app.get( '/photos/:id/download', photos.download( app.get( 'photos' ) ));

photos.initModule();
// ----- END SERVER CONFIGURATION -----

server.listen( app.get( 'port' ), function(){
    console.log( 'Listening on %d', server.address().port );
});