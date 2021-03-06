'use strict';

// MODULES //

var debug = require( 'debug' )( 'import-require:walk' );
var walk = require( 'acorn/dist/walk.js' );
var isRequire = require( './is_require.js' );


// MAIN //

/**
* Walks an AST in search of import and require paths.
*
* @private
* @param {string} src - source string
* @param {Object} ast - AST
* @returns {Object} results
*/
function walker( src, ast ) {
	var results;
	var opts;
	opts = {
		'CallExpression': callExpression,
		'ImportDeclaration': importDeclaration
	};
	results = {
		'literals': [],
		'expressions': []
	};
	walk.recursive( ast, null, opts );
	return results;

	/**
	* Callback invoked upon visiting a `CallExpression` AST node.
	*
	* @private
	* @param {Node} node - AST node
	* @param {*} state - start state
	* @param {Callback} clbk - callback to continue walking a sub-node
	*/
	function callExpression( node, state, clbk ) {
		var expression;
		var arg;
		walk.base[ node.type ]( node, state, clbk );
		if ( isRequire( node ) === false ) {
			return;
		}
		debug( 'Found a `require` statement.' );
		if ( node.arguments.length ) {
			arg = node.arguments[ 0 ];
			if ( arg.type === 'Literal' ) {
				debug( '`require` literal: %s', arg.value );
				results.literals.push( arg.value );
			} else {
				expression = src.slice( arg.start, arg.end );
				debug( '`require` expression: %s', expression );
				results.expressions.push( expression );
			}
		}
	} // end FUNCTION callExpression()

	/**
	* Callback invoked upon visiting an `ImportDeclaration` AST node.
	*
	* @private
	* @param {Node} node - AST node
	* @param {*} state - start state
	* @param {Callback} clbk - callback to continue walking a sub-node
	*/
	function importDeclaration( node ) {
		debug( 'Found an `import` declaration: %s', node.source.value );
		if ( node.source.type === 'Literal' ) {
			debug( '`import` literal: %s', node.source.value );
			results.literals.push( node.source.value );
		}
		// NOTE: expressions are not currently supported in `import` declarations.
	} // end FUNCTION importDeclaration()
} // end FUNCTION walker()


// EXPORTS //

module.exports = walker;
