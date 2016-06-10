
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
		end: -1.0,
		root: -1.0
	}



	var selectWordIndex = function(i) {
		return $("span:nth-child(" + (i * 2 + 1) + ")");
	}

	var selectBrIndex = function(i) {
		return $("span:nth-child(" + (i * 2) + ")");
	}

	var selectionDiff = function(a, b) {

		var bStart = Math.min(b.end, b.root);
		var bEnd = Math.max(b.end, b.root);

		if(a.enabled == false) {
			//initiate

			for(var i = bStart; i < bEnd + 1; i++) {
				selectWordIndex(i).css("background-color", colors[0]);
				selectBrIndex(i).css("background-color", colors[0]);
			}

		} else {
			//begin, end, enable/disable

			var aStart = Math.min(a.end, a.root);
			var aEnd = Math.max(a.end, a.root);

			for(var i = aStart; i < aEnd + 1; i++) {
				selectWordIndex(i).css("background-color", "");
				selectBrIndex(i).css("background-color", "");
			}

			for(var i = bStart; i < bEnd + 1; i++) {
				selectWordIndex(i).css("background-color", colors[0]);
				selectBrIndex(i).css("background-color", colors[0]);
			}

			/*var diffA = parseInt(b.start - a.start);
			var diffB = parseInt(b.end - a.end);

			if(diffB != 0.0) {
				var diff = parseInt(b.end - a.end);
				//if it's positive, highlight more at the end
				//if it's negative, remove highlights at beginning

				console.log("diff: " + a.end + " to " + (a.end + diff + 1.0));

				if(diff > 0) {
					for(var i = 0; i < diff + 1; i++) {
						selectWordIndex(i + a.end).css("background-color", colors[0]);
						selectBrIndex(i + a.end).css("background-color", colors[0]);
					}
				} else if (diff < 0) {

					var begin = (a.end + diff) + 1;
					var end = a.end + 1;

					for(var i = begin; i < end; i++) {
						selectWordIndex(i).css("background-color", "");
						selectBrIndex(i).css("background-color", "");
					}			
				}
			}*/
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
				end: id,
				root: id
			}

			selectionDiff(oldSelection, newSelection);
			that.selection = newSelection;
		});

		$(".word-node").mouseover(function() {

			if(that.selection.enabled) {

				var id = parseInt($(this).data("word-index"));
				var oldSelection = that.selection;

				console.log("mouseover: " + id + " old.start: " + oldSelection.start);

				
				var newSelection = {
					enabled: true,
					end: id,
					root: oldSelection.root
				}

				console.log(JSON.stringify(newSelection));

				selectionDiff(oldSelection, newSelection);
				that.selection = newSelection;
			}
		});

		$(".word-node").mouseup(function() {

			if(that.selection.enabled) {
				highlights.push(that.selection);
				console.log(JSON.stringify(highlights))
			}

			that.selection = {
				enabled: false,
				end: -1.0,
				root: -1.0
			}

		});
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