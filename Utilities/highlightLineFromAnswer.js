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

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
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

var questionHighlights = {};
[...document.querySelectorAll('.highlightQuestions')].map((question) => {
	var lineToHighlight = question.getAttribute('highlightThis');
	if(!Object.keys(questionHighlights).includes(lineToHighlight)){
		addColumn(questionHighlights,lineToHighlight);
		addRecordToColumn(questionHighlights, lineToHighlight, question);
	} else {
		addRecordToColumn(questionHighlights, lineToHighlight, question);
	}
});
var positiveIndicator = false;
function checkPreviousQuestions(lineToHighlight) {
console.log('checkHighlights Triggered');
	var questionCheckRadioAnswers;
	var questionDropdownAnswers;
	var dropdownQuestion;
	var lineToHighlight;
	var answerTrigger;
	try{
		console.log('checkHighlights Trying');
		questionHighlights[lineToHighlight].forEach(question => {
			qtype = question.getAttribute('qtype');
			if(qtype == 'radio' || qtype == 'checkbox'){
				console.log('Radio/Checkbox Highlighting Started');
				questionCheckRadioAnswers = Array.from(question.closest('tbody').querySelector('tbody').querySelectorAll('input'));
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number);
				answerTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked) {
						positiveIndicator = true;
					}
				});
				console.log('Radio/Checkbox Highlighting End');
			} else if (qtype == 'dropdown'){
				console.log('Dropdown Highlighting Started');
				dropdownQuestion = question.closest('tr').nextElementSibling.querySelector('select');
				questionDropdownAnswers = Array.from(question.closest('tr').nextElementSibling.querySelectorAll('option'));
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number);
				answerTrigger.forEach(index => {
					if (dropdownQuestion.selectedIndex == index) {
						positiveIndicator = true;
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

function checkHighlights(lineToHighlight) {
	console.log('checkHighlights Triggered');
	var questionCheckRadioAnswers;
	var questionDropdownAnswers;
	var dropdownQuestion;
	var lineToHighlight;
	var answerTrigger;
	var answerDeTrigger;

	try{
		console.log('checkHighlights Trying');
		questionHighlights[lineToHighlight].forEach(question => {
			checkPreviousQuestions(lineToHighlight);
			lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#' + question.getAttribute('highlightThis')));
			qtype = question.getAttribute('qtype');
			if(qtype == 'radio' || qtype == 'checkbox'){
				console.log('Radio/Checkbox Highlighting Started');
				questionCheckRadioAnswers = Array.from(question.closest('tbody').querySelector('tbody').querySelectorAll('input'));
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number);
				answerDeTrigger = range(0, questionCheckRadioAnswers.length - 1).filter(item => !answerTrigger.includes(item));
				answerDeTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked && !positiveIndicator) {
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'white';
							console.log('De-Highlighted');
						});
					}
				});
				answerTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked && positiveIndicator) {
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
					if (dropdownQuestion.selectedIndex == index && positiveIndicator) {
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
	allQuestionAnswers.forEach((input) => {
		input.addEventListener('change', () => {
			if(input.tagName.toLowerCase() == 'input'){
				var lineToHighlight = input.closest('td').closest('table').closest('tr').previousElementSibling.querySelector('.highlightQuestions').getAttribute('highlightthis');
				checkHighlights(lineToHighlight);
			} else if(input.tagName.toLowerCase() == 'select'){
				
			}
		});
	});
});
