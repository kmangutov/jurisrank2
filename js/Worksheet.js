


var worksheet = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    }
});

var onHighlightsUpdate = function(data) {
	console.log("Worksheet::onHighlightsUpdate");
	worksheet.message = JSON.stringify(data);
};

$("body").ready(function() {
	highlightDiv.addHighlightListener(onHighlightsUpdate);
});