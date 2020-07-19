// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
const ect = require('ect')
const merge = require('merge')
const clone = require('clone')
const minify = require('html-minifier').minify;

module.exports = function(options){
	
	var options = options || {}
	var renderer = ect(merge({ 
		root : options.path, 
		ext: '.html', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
	}, options))
	
	return function ectrender($){
		$.htmlModule = function(pathname){
		    if(!pathname || pathname.indexOf(/\n|\r/) === -1) {
    			let path = pathname || 'index.html' 
    			let context = merge(clone($, false, 1), $.data)
				let html = renderer.render(path, context)
				if (options.minify) {
					html = minify(hmtl);
				}
    			$.response.end(html)
			} else if (pathname) {
			    $.response.end(pathname)
			}
			
			$.nextRoute() // call next route
		}
		$.return()
	}
}