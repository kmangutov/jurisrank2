
var clone = function(oldObject) {
	return JSON.parse(JSON.stringify(oldObject));
}

var HighlightDiv = (function() {
	
	this.that = this;
	this.highlights = [];
	this.canvasHandle;

	var CLASS_HOVER = "highlight-hover";
	var colors = ['#ffb7b7', '#a8d1ff', '#fff2a8', '#b3ff99', '#9999ff', '#99e6ff', '  #cc99ff', '#ff99e6'];

	this.selection = {
		enabled: false,
		start: -1.0,
		end: -1.0
	}

	var selectWordIndex = function(i) {
		return $("span:nth-child(" + (i * 2 + 1) + ")");
		/*return $("[data-word-index]").filter(function() {
			return $(this).data('word-index') == i;
		});*/
	}

	var selectBrIndex = function(i) {
		return $("span:nth-child(" + (i * 2) + ")");
		/*return $("[data-word-index]").filter(function() {
			return $(this).data('word-index') == i;
		});*/
	}

	var selectionDiff = function(a, b) {



		if(a.enabled == false) {
			//initiate

			console.log("a.enabled == false")

			for(var i = 0; i < (b.end-b.start) + 1; i++) {
				//$("[data-word-index=" + i + "]").css("background-color", colors[0]);
				console.log("highlgihting " + i + " (" + b.start +"," + b.end + ")")
				selectWordIndex(i + b.start).css("background-color", colors[0]);
			} 
		} else {
			//perform diff

			var diff = parseInt(b.end - a.end);
			//if it's positive, highlight more at the end
			//if it's negative, remove highlights at beginning

			console.log("diff: " + a.end + " to " + (a.end + diff + 1.0));

			if(diff > 0) {
				for(var i = 0; i < diff + 1; i++) {
					selectWordIndex(i + a.end).css("background-color", colors[0]);
				}
			} else if (diff < 0) {

				var begin = (a.end + diff) + 1;
				var end = a.end + 1;

				for(var i = begin; i < end; i++) {
					selectWordIndex(i).css("background-color", "");
				}			
			}
		}
	}

	var init = function(id) {
		canvasHandle = $(id);
		console.log("HighlightDiv::init");

		selectWordIndex(1).css("background-color", colors[0]);
		selectWordIndex(2).css("background-color", colors[1]);


		$(".word-node").mousedown(function() {
			var id = parseInt($(this).data("word-index"));

			var oldSelection = that.selection;
			var newSelection = {
				enabled: true,
				start: id,
				end: id
			}

			selectionDiff(oldSelection, newSelection);
			that.selection = newSelection;
		});

		$(".word-node").mouseover(function() {

			if(that.selection.enabled) {
				var id = parseInt($(this).data("word-index"));



				var oldSelection = that.selection;
				var newSelection = {
					enabled: true,
					start: oldSelection.start,
					end: id
				}

				console.log(JSON.stringify(newSelection));

				selectionDiff(oldSelection, newSelection);
				that.selection = newSelection;
			}
		});

		$(".word-node").mouseup(function() {

			that.selection = {
				enabled: false,
				start: -1.0,
				end: -1.0
			}

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