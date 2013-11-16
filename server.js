var browserify = require( 'browserify-middleware' );
var express = require( 'express' );
var app = express();

browserify.settings.development( 'basedir', __dirname );

// browser assets
app.use( '/js', browserify( './client' ) );

var shared = [];


app.get( '/js/bundle.js', browserify([
  'domready',
  'bean',
  'bonzo',
  'reqwest',
  'qwery',
  'lodash',
  'backbone',
  'three'
]));

/*app.get( '/js/bundle.js', browserify([
  './jeesh',
  'lodash',
  'backbone',

]));*/

// static dir
app.use( express.static( __dirname + '/public' ) );

app.get( '/ajax', function ( req, res ) {
  res.end( 'An AJAX request was made using modules that were made available publicly' );
});

app.listen( 3000 );
console.log( 'Running on port 3000' );