'use strict';

/**
* List import and require paths.
*
* @module @stdlib/tools/modules/import-require
*
* @example
* var readFile = require( '@stdlib/fs/read-file' ).sync;
* var ls = require( '@stdlib/tools/modules/import-require' );
*
* var src = readFile( __filename );
* var results = ls( src );
*
* console.dir( results );
*/

// MODULES //

var ls = require( './ls.js' );


// EXPORTS //

module.exports = ls;
