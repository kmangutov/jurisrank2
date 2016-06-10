
var clone = function(oldObject) {
	return JSON.parse(JSON.stringify(oldObject));
}


function Selection(root, enabled) {
	this.enabled = enabled;
	this.root = root;
	this.end = root;
}

Selection.prototype.start = function() {
	return Math.min(this.end, this.root);
}

Selection.prototype.stop = function() {
	return Math.max(this.end, this.root);
}

var HighlightDiv = (function() {
	
	this.that = this;
	this.highlights = [];
	this.canvasHandle;

	this.COLORS = ['#ffb7b7', '#a8d1ff', '#fff2a8', '#b3ff99', '#9999ff', '#99e6ff', '  #cc99ff', '#ff99e6'];
	this.selectedColor = 0;

	this.selection = new Selection(-1, false);
	this.wordStates = {};

	var wordEditable = function(index) {

		console.log("word " + index + " in map: " + (index in wordStates));
		return !(index in wordStates && wordStates[index] == true);
	}

	var commitHighlight = function() {
		highlights.push(that.selection);
		var start = that.selection.start();
		var end = that.selection.stop();

		for(var i = start; i <= end; i++) {
			wordStates[i] = true;
		}

		console.log("commit to wordStates: " + JSON.stringify(wordStates));

		that.selection = new Selection(-1, false);
		selectedColor = (selectedColor + 1) % COLORS.length;
	}

	var selectWordIndex = function(i) {
		return $("span:nth-child(" + (i * 2 + 1) + ")");
	}

	var selectBrIndex = function(i) {
		return $("span:nth-child(" + (i * 2) + ")");
	}

	var selectionDiff = function(a, b) {

		var bStart = b.start();
		var bEnd = b.stop();

		if(a.enabled == false) {
			//initiate

			for(var i = bStart; i <= bEnd; i++) {

				if(wordEditable(i)) {
					selectWordIndex(i).css("background-color", COLORS[selectedColor]);
					selectBrIndex(i).css("background-color", COLORS[selectedColor]);
				}
			}

		} else {
			//begin, end, enable/disable

			var aStart = a.start();
			var aEnd = a.stop();

			for(var i = aStart; i <= aEnd; i++) {

				if(wordEditable(i)) {
					selectWordIndex(i).css("background-color", "");
					selectBrIndex(i).css("background-color", "");
				}
			}

			for(var i = bStart; i <= bEnd; i++) {
				if(wordEditable(i)) {
					selectWordIndex(i).css("background-color", COLORS[selectedColor]);
					selectBrIndex(i).css("background-color", COLORS[selectedColor]);
				}
			}
		}
	}

	var init = function(id) {
		canvasHandle = $(id);
		console.log("HighlightDiv::init");

		$(".word-node").mousedown(function() {
			var id = parseInt($(this).data("word-index"));

			var oldSelection = that.selection;
			var newSelection = new Selection(id, true);

			selectionDiff(oldSelection, newSelection);
			that.selection = newSelection;
		});

		$(".word-node").mouseover(function() {

			if(that.selection.enabled) {

				var id = parseInt($(this).data("word-index"));
				var oldSelection = that.selection;

				console.log("mouseover: " + id + " old.start: " + oldSelection.start);

				var newSelection = new Selection(oldSelection.root, true);
				newSelection.end = id + 1;

				console.log(JSON.stringify(newSelection));

				selectionDiff(oldSelection, newSelection);
				that.selection = newSelection;
			}
		});

		$(".word-node").mouseup(function() {

			if(that.selection.enabled) {
				commitHighlight();
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