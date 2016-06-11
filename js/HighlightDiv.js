
var clone = function(oldObject) {
	return JSON.parse(JSON.stringify(oldObject));
}

var selectWordIndex = function(i) {
	return $("span:nth-child(" + (i * 2 + 1) + ")");
}

var selectBrIndex = function(i) {
	return $("span:nth-child(" + (i * 2) + ")");
}

////////////////

function Selection(root, enabled) {
	this.enabled = enabled;
	this.root = root;
	this.end = root;
	this.text = "";
}

Selection.prototype.start = function() {
	return Math.min(this.end, this.root);
}

Selection.prototype.stop = function() {
	return Math.max(this.end, this.root);
}

Selection.prototype.highlight = function(wordEditable, color) {
	for(var i = this.start(); i <= this.stop(); i++) {

		if(wordEditable(i)) {
			selectWordIndex(i).css("background-color", color);
			selectBrIndex(i).css("background-color", color);
		}
	}
}

Selection.prototype.clear = function(wordEditable) {
	this.highlight(wordEditable, "");
}

////////////////

var HighlightDiv = (function() {
	
	this.that = this;
	this.highlights = [];
	this.canvasHandle;

	this.COLORS = ['#ffb7b7', '#a8d1ff', '#fff2a8', '#b3ff99', '#9999ff', '#99e6ff', '  #cc99ff', '#ff99e6'];
	this.selectedColor = 0;

	this.selection = new Selection(-1, false);
	this.wordStates = {};

	this.highlightListener = null;

	var wordEditable = function(index) {

		console.log("word " + index + " in map: " + (index in wordStates));
		return !(index in wordStates && wordStates[index] == true);
	}

	var commitHighlight = function() {

		//abort if overlaps any highlight
		var start = that.selection.start();
		var end = that.selection.stop();

		for(var i = start; i <= end; i++) {
			if(!wordEditable(i)) {
				console.log("attempted overlap aborted");
				that.selection.clear(wordEditable);
				that.selection = new Selection(-1, false);
				return false;
			}
		}

		//commit to highlights and wordStates
		var concat = "";
	
		for(var i = start; i <= end; i++) {
			wordStates[i] = true;
			concat += selectWordIndex(i).text() + " ";
		}
		that.selection.text = concat.trim();
		that.selection.id = highlights.length;
		highlights.push(that.selection);

		console.log("commit to wordStates: " + JSON.stringify(wordStates));
		console.log("commit to highlights: " + JSON.stringify(highlights));

		//reset selection
		selectedColor = (selectedColor + 1) % COLORS.length;
		that.selection = new Selection(-1, false);

		//callback
		if(highlightListener) {
			console.log("calling callback")
			highlightListener(highlights);
		}
	}


	var selectionDiff = function(a, b) {

		var bStart = b.start();
		var bEnd = b.stop();

		if(a.enabled == false) {
			//initiate

			b.highlight(wordEditable, COLORS[selectedColor]);

		} else {
			//begin, end, enable/disable

			var aStart = a.start();
			var aEnd = a.stop();

			a.clear(wordEditable);
			b.highlight(wordEditable, COLORS[selectedColor]);
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
				newSelection.end = id;

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
			addHighlightListener: function(f) {
				console.log("HighlightDiv::addHighlightListener");
				that.highlightListener = f;
			}
		}
	}
})();

var highlightDiv;
$("body").ready(function() {
	highlightDiv = new HighlightDiv("#text-case");
});