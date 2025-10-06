var is_cha;
var client_id = 200079;

function chaHighlight(client_id){
	let divs = document.querySelectorAll('div[groupid="group1"]');
	let trs = Array.from(divs).map(div => div.closest('tr'));
	let hasYellowHighlight = false;
	trs.forEach(tr => {
	  if (tr.style.backgroundColor === 'yellow') {
	    hasYellowHighlight = true;
	  }
	});

	if(hasYellowHighlights & is_cha == 1){
		document.querySelector('tr:has(div#resourceSdoh').style.backgroundColor = 'yellow';
	}
}

function exerciseMinuteHighlight() {
	console.log('Start Exercise Highlight');
	var lineToHighlight = Array.from(document.querySelectorAll('tr:has(div#resourcePhysicalActivity'));
	var minuteIndex = document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelector('select').selectedIndex;
	let dayIndex = document.querySelector('#daysExercise').closest('tr').nextElementSibling.querySelector('select').selectedIndex;
	lineToHighlight.forEach(row => {
		row.style.backgroundColor = 'white';
		console.log('De-Highlighted');
	});
	if(tempAge >=6 && tempAge <=17 && document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelector('select')[minuteIndex].innerHTML * document.querySelector('#daysExercise').closest('tr').nextElementSibling.querySelector('select')[minuteIndex].innerHTML < 420){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	} else if (tempAge >= 18 && document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelector('select')[minuteIndex].innerHTML * document.querySelector('#daysExercise').closest('tr').nextElementSibling.querySelector('select')[minuteIndex].innerHTML < 150){
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = 'yellow';
			console.log('Highlighted');
		});
	} else {
		lineToHighlight.forEach(row => {
			row.style.backgroundColor = '';
			console.log('Unhighlighted');
		});
	}
	console.log('End Exercise Highlight');
}

document.addEventListener("DOMContentLoaded", async function() {
	try{
		client_id = parseInt(window.top.document.querySelector('frame[name=left]').contentDocument.querySelector('tbody').querySelector('#client_id').value);
	} catch(error){
		console.log(error);
	}
	try{
		var tempUrl = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0e8DPI5CjeQD6IFvAshrmh8&start_date=&end_date=&custom_param1=${client_id}&custom_param2=&custom_param3=`;
		var tempDataOne = await getData(tempUrl);
		is_cha = tempDataOne.documentElement.querySelector('cha_client').innerHTML;
	} catch(error){
		console.log(error);
	}
	var exerciseMinuteAnswers = [...document.querySelector('#minutesExercise').closest('tr').nextElementSibling.querySelectorAll('select')];
	try{
		client_id = parseInt(window.top.document.querySelector('frame[name=left]').contentDocument.querySelector('tbody').querySelector('#client_id').value);
	} catch(error){
		console.log(error);
	}
	try{
		var tempUrl = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0cUts!9-2ufaavoy0FyqDIn&start_date=&end_date=&custom_param1=${client_id}&custom_param2=&custom_param3=`;
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
	setInterval(() => {
	  chaHighlight(client_id);
	}, 3000); // 3000 milliseconds = 3 seconds
});
var allSafetyAnswers = [];


var allMentalHealthAnswers = [];


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
	[...document.querySelectorAll('#safetyAdditionCalc')].forEach(answer => {
	allSafetyAnswers = [...allSafetyAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
	});
	[...document.querySelectorAll('#phq9AQ1')].forEach(answer => {
	allMentalHealthAnswers = [...allMentalHealthAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
	});
	[...document.querySelectorAll('#phq9Q1')].forEach(answer => {
		allMentalHealthAnswers = [...allMentalHealthAnswers, ...answer.closest('tr').nextElementSibling.querySelectorAll('select')];
	});
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



