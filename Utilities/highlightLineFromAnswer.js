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


//Function below will check if any question that has the same 'lineToHighlight' indicates a positive for highlighting
var positiveIndicator = false;
function checkPreviousQuestions(lineToHighlight) {
	var questionCheckRadioAnswers;
	var questionDropdownAnswers;
	var dropdownQuestion;
	var lineToHighlight;
	var answerTrigger;
	try{
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
			}
		});
	} catch(error){
		console.log(error);
	}
}

//This function actually looks at the question that was checked and highlights according to the function checkPreviousQuestions's positive indicator
function checkHighlights(lineToHighlight) {
	positiveIndicator = false;
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
			if(qtype == 'radio' || qtype == 'checkbox'){ // If statement for radio and checkboxes since they act different from drop downs
				console.log('Radio/Checkbox Highlighting Started');
				questionCheckRadioAnswers = Array.from(question.closest('tbody').querySelector('tbody').querySelectorAll('input')); // The actual radio buttons/checkboxes themselves
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number); // Array for the answers that can highlight
				answerDeTrigger = range(0, questionCheckRadioAnswers.length - 1).filter(item => !answerTrigger.includes(item)); // Array for non-answers
				answerDeTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked && !positiveIndicator) { // Checks if one of the non-answers are checked and if the positive indicator is false
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'white';
							console.log('De-Highlighted');
						});
					}
				});
				answerTrigger.forEach(index => {
					if (questionCheckRadioAnswers[index].checked && positiveIndicator) { // Checks if one of the answers are checked
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'yellow';
							console.log('Highlighted');
						});
					}
				});
				console.log('Radio/Checkbox Highlighting End');
			} else if (qtype == 'dropdown'){ // Dropdowns act different so we need an else if statement to read dropdowns
				console.log('Dropdown Highlighting Started');
				dropdownQuestion = question.closest('tr').nextElementSibling.querySelector('select'); // The dropdown itself
				questionDropdownAnswers = Array.from(question.closest('tr').nextElementSibling.querySelectorAll('option')); // The actual drop down options
				answerTrigger = question.getAttribute('answerTriggers').split(',').map(Number); // Array for the answers that can highlight
				answerDeTrigger = range(0, questionDropdownAnswers.length - 1).filter(item => !answerTrigger.includes(item));// Array for non-answers
								console.log('Dropdown Highlighting');
				answerDeTrigger.forEach(index => {
					if (dropdownQuestion.selectedIndex == index && !positiveIndicator) { // Checks if one of the non-answers are checked and if the positive indicator is false
						lineToHighlight.forEach(row => {
							row.style.backgroundColor = 'white';
							console.log('De-Highlighted');
						});
					}
				});
				answerTrigger.forEach(index => {
					if (dropdownQuestion.selectedIndex == index  && positiveIndicator) { // Checks if one of the answers are checked
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
				var lineToHighlight = input.closest('tr').previousElementSibling.querySelector('.highlightQuestions').getAttribute('highlightthis');
				checkHighlights(lineToHighlight);
			}
		});
	});
});
var tempAge;

function exerciseMinuteHighlight() {
	console.log('Start Exercise Highlight');
	var lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#resourcePhysicalActivity'));
	var tempindex = document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelector('select').selectedIndex;
	lineToHighlight.forEach(row => {
		row.style.backgroundColor = 'white';
		console.log('De-Highlighted');
	});
	if(tempAge >=6 && tempAge <=17 && tempindex < 7){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	} else if (tempAge >= 18 && tempindex < 10){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	}
	console.log('End Exercise Highlight');
}

document.addEventListener("DOMContentLoaded", async function() {
	var exerciseMinuteAnswers = [...document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelectorAll('select')];
	try{
		var tempUrl = 'https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0cUts!9-2ufaavoy0FyqDIn&start_date=&end_date=&custom_param1=200079&custom_param2=&custom_param3=';
		var tempDataOne = await getData(tempUrl);
		tempAge = tempDataOne.documentElement.querySelector('age').innerHTML;
	
	} catch(error){
		console.log(error);
	}
	exerciseMinuteHighlight();
	exerciseMinuteAnswers.forEach((input, index) => {
		input.addEventListener('change', () => {
			exerciseMinuteHighlight(input, index);
		});
	});
});
var allSafetyAnswers = [];
[...document.querySelectorAll('#safetyAdditionCalc')].forEach(answer => {
	allSafetyAnswers = [...allSafetyAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
});

function safetyHighlight(){
	console.log('Start Safety Highlight');
	var lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#resourceSafety'));
	var score = document.querySelector('#safetyScore').closest('tr').nextElementSibling.querySelector('input').value;
	if(score >= 11){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	} else {
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'white';
			console.log('Highlighted');
		});
	}
	console.log('End Safety Highlight');
}

$(document).ready(function() {
	safetyHighlight();
	allSafetyAnswers.forEach((input) => {
		input.addEventListener('change', () => {
			safetyHighlight();
		});
	});
});
