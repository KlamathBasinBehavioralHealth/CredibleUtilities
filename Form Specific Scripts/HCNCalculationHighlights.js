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

var allMentalHealthAnswers = [];
[...document.querySelectorAll('#mentalHealthCalc')].forEach(answer => {
	allMentalHealthAnswers = [...allMentalHealthAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
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

function mentalHealthHighlight(){
	var lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#resourceMentalHealth'));
	console.log('Start Mental Health');
	if( (document.querySelector('#phq9Q1').closest('tr').nextElementSibling.querySelector('select').options.selectedIndex + 1) + (document.querySelector('#phq9AQ1').closest('tr').nextElementSibling.querySelector('select').options.selectedIndex + 1) >= 3){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	} else{
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'white';
			console.log('Highlighted');
		});
	}
}

$(document).ready(function() {
	mentalHealthHighlight();
	allSafetyAnswers.forEach((input) => {
		input.addEventListener('change', () => {
			safetyHighlight();
		});
	});
	mentalHealthHighlight();
	allMentalHealthAnswers.forEach((input) => {
		input.addEventListener('change', () => {
			mentalHealthHighlight();
		});
	});
});
