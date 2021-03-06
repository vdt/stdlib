'use strict';

/**
* Infer license information from file content.
*
* @module @stdlib/tools/licenses/infer
*
* @example
* var licenses = require( '@stdlib/tools/licenses/licenses' );
* var infer = require( '@stdlib/tools/licenses/infer' );
*
* var pattern = '{readme*,licen[cs]e*,copying*}';
*
* licenses( onResults );
*
* function onResults( error, results ) {
*     if ( error ) {
*         throw error;
*     }
*     infer( results, pattern, onInfer );
* }
*
* function onInfer( error, results ) {
*     if ( error ) {
*         throw error;
*     }
*     console.dir( results );
* }
*/

// MODULES //

var infer = require( './infer.js' );


// EXPORTS //

module.exports = infer;
