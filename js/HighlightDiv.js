
var HighlightDiv = (function() {
	
	this.highlights = [];
	this.canvasHandle;

	var CLASS_HOVER = "highlight-hover";
	var colors = ['#ffb7b7', '#a8d1ff', '#fff2a8', '#b3ff99', '#9999ff', '#99e6ff', '  #cc99ff', '#ff99e6'];

	this.highlightStart = -1;

	var init = function(id) {
		canvasHandle = $(id);
		console.log("HighlightDiv::init");

		$(".word_node").mousedown(function() {
			
		});

		/*$(".word-node").mouseover(function() {
			$(this).css("background-color", colors[0]);
		});*/

		/*$(".word-node").mouseleave(function() {
			$(this).css("background-color", "");
		});*/
		
	}

	return function(id) {
		init(id);
		return {

		}
	}
})();

var highlightDiv;
$("body").ready(function() {
	highlightDiv = new HighlightDiv("#text-case");
});