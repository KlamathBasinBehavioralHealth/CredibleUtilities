function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function addColumn(table, columnName) {
    if (!table[columnName]) {
        table[columnName] = [];
    }
}

function addRecordToColumn(table, columnName, record) {
    if (table[columnName]) {
        table[columnName].push(record);
    }
}

var qtype;
var allQuestionAnswers = [];
[...document.querySelectorAll('.highlightQuestions')].forEach(answer => {
	qtype = answer.getAttribute('qtype');
	if(qtype == 'radio' || qtype == 'checkbox'){
		allQuestionAnswers = [...allQuestionAnswers, ...answer.closest('tbody').querySelector('tbody').querySelectorAll('input')];
	} else if (qtype == 'dropdown'){
		allQuestionAnswers = [...allQuestionAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
	}
});

function checkHighlights() {
	console.log('checkHighlights Triggered');
	var questionCheckRadioAnswers;
	var questionDropdownAnswers;
	var dropdownQuestion;
	var lineToHighlight;
	var answerTrigger;
	var answerDeTrigger;
	var linesToHighlightCount = []
	try{
		console.log('checkHighlights Trying');
		[...document.querySelectorAll('.highlightQuestions')].map((question) => {
			qtype = question.getAttribute('qtype');
			lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#' + question.getAttribute('highlightThis')));
			var tempLinesToHighlight = Object.keys(linesToHighlightCount[0]);
			if(!tempLinesToHighlight.includes(question.getAttribute('highlightThis'))){
				linesToHighlightCount.push({[question.getAttribute('highlightThis')]:1});
			} else {
				linesToHighlightCount.forEach(row => {
					if (row[question.getAttribute('highlightThis')] !== undefined) {
						row[question.getAttribute('highlightThis')] += 1;
					}
				});
			}
			if(qtype == 'radio' || qtype == 'checkbox'){
				console.log('Radio/Checkbox Highlighting Started');
				questionCheckRadioAnswers = Array.from(question.closest('tbody').querySelector('tbody').querySelectorAll('input'));
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number);
				answerDeTrigger = range(0, questionCheckRadioAnswers.length - 1).filter(item => !answerTrigger.includes(item));
				answerDeTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked) {
						lineToHighlight.forEach(row => {
							currentColor = window.getComputedStyle(row).backgroundColor;
							if(!(currentColor == 'yellow' && row[question.getAttribute('highlightThis')] == 1)){
								row.style.backgroundColor = 'white';
								console.log('De-Highlighted');
							}
						});
					}
				});
				answerTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked) {
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'yellow';
							console.log('Highlighted');
						});
					}
				});
				console.log('Radio/Checkbox Highlighting End');
			} else if (qtype == 'dropdown'){
				console.log('Dropdown Highlighting Started');
				dropdownQuestion = question.closest('tr').nextElementSibling.querySelector('select');
				questionDropdownAnswers = Array.from(question.closest('tr').nextElementSibling.querySelectorAll('option'));
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number);
				answerDeTrigger = range(0, questionDropdownAnswers.length - 1).filter(item => !answerTrigger.includes(item));
								console.log('Dropdown Highlighting');
				answerDeTrigger.forEach(index => {
					if (dropdownQuestion.selectedIndex == index) {
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'white';
							console.log('De-Highlighted');
						});
					}
				});
				answerTrigger.forEach(index => {
					if (dropdownQuestion.selectedIndex == index) {
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'yellow';
							console.log('Highlighted');
						});
					}
				});
				console.log('DropDown Highlighting End');
			}
		});
		console.log('checkHighlights End');
	} catch(error){
		console.log(error);
	}
}
	
$(document).ready(function() {
	checkHighlights();
	allQuestionAnswers.forEach((input, index) => {
		input.addEventListener('change', () => {
			checkHighlights(input, index);
		});
	});
});
