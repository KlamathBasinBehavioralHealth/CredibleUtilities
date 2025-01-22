const groups = {};
const requiredIndividualCheckboxes = [...document.querySelectorAll('.requireIndividualCheckboxes')];
requiredIndividualCheckboxes.forEach(element => {
  const groupId = element.getAttribute('groupid');
  if (!groups[groupId]) {
    groups[groupId] = [];
  }
  groups[groupId].push(element);
});

const requiredGroupCheckboxes = Object.values(groups);



requiredGroupCheckboxes.forEach(checkboxGroup => {
	const asterisk = document.createElement('span');
	asterisk.textContent = '*';
	asterisk.style.color = 'red'; 
	searchClosestLabel(checkboxGroup).parentElement.appendChild(asterisk);
	//checkboxGroup.forEach(question =>{
	//	$('tr').find(question).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	//});
});

var closestB;
function searchClosestLabel(checkboxGroup){
	let currentRow = checkboxGroup[0].closest('table').closest('tr');  
	let previousRow = currentRow.previousElementSibling; 
	while (previousRow) {
		const bElement = previousRow.querySelector('b');
		previousRow = previousRow.previousElementSibling;
		if (bElement) {
			closestB = bElement;
			previousRow = null;
			return bElement;
		}
	}
}


var closestUncheckedRequiredLabel;
var closestUncheckedRequiredCount = 1;
function checkRequiredGroupCB(){
    closestUncheckedRequiredLabel = null;
    const completeButtonName = document.querySelector('[name=Complete]');
    const completeButtonValue = document.querySelector('[value=Complete]');
    const floatingCompleteButton = document.querySelector('#complete');
	let cbCheckedCount = 0;
	let checkedRequiredGroupCount = 0;
	requiredGroupCheckboxes.forEach(checkboxGroup => {
		let requiredCount = 1;
		cbCheckedCount = 0;
		checkboxGroup.forEach(answer => {
			requiredCount = parseInt(answer.getAttribute('requiredCount'), 10);	
			if(answer.closest('tbody').querySelector('input').checked){
				cbCheckedCount = cbCheckedCount + 1;
			}
		});
		if(cbCheckedCount >= requiredCount){
			checkedRequiredGroupCount = checkedRequiredGroupCount + 1;
		} 
		else{
			closestUncheckedRequiredLabel = searchClosestLabel(checkboxGroup);
			closestUncheckedRequiredCount = requiredCount;
		}
	});
	if(checkedRequiredGroupCount < requiredGroupCheckboxes.length){
		// firstCBUnchecked is from the visibility.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		if(completeButtonName && firstCBUnchecked == null){
			completeButtonName.setAttribute('disabled',true);
		}
		if(completeButtonValue && firstCBUnchecked == null){
			completeButtonValue.setAttribute('disabled',true);
		}
		if(floatingCompleteButton && firstCBUnchecked == null){
			floatingCompleteButton.setAttribute('disabled',true);
		}
	}
	else{
		// firstCBUnchecked is from the visibility.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		if(completeButtonName && firstCBUnchecked == null){
			completeButtonName.removeAttribute('disabled');
		}
		if(completeButtonValue && firstCBUnchecked == null){
			completeButtonValue.removeAttribute('disabled');
		}
		if(floatingCompleteButton && firstCBUnchecked == null){
			floatingCompleteButton.removeAttribute('disabled');
		}
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const floatingCompleteButton = document.querySelector('#complete');
	const completeButtonName = document.querySelector('[name=Complete]');
	const completeButtonValue = document.querySelector('[value=Complete]');
	if(floatingCompleteButton){
		floatingCompleteButton.addEventListener('mouseover', function() {
			if (this.disabled) {
				if(closestUncheckedRequiredLabel ){
					alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"" + " and ensure at least " + closestUncheckedRequiredCount + " checkbox is selected.");
				}
			}
		});
	}
	else if (completeButtonName){
		completeButtonName.addEventListener('mouseover', function() {
			if (this.disabled) {
				if(closestUncheckedRequiredLabel ){
					alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"" + " and ensure at least " + closestUncheckedRequiredCount + " checkbox is selected.");
				}
			}
		});
	}
	else {
		completeButtonValue.addEventListener('mouseover', function() {
			if (this.disabled) {
				if(closestUncheckedRequiredLabel ){
					alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"" + " and ensure at least " + closestUncheckedRequiredCount + " checkbox is selected.");
				}
			}
		});
	}
	checkRequiredGroupCB();
});


document.addEventListener('DOMContentLoaded', () => {
    requiredGroupCheckboxes.forEach(checkboxGroup => {
        checkboxGroup.forEach(answer => {
            answer.closest('tbody').querySelector('input').addEventListener('change', checkRequiredGroupCB);
        });
    });
});


