


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
    checkboxGroup.forEach(question =>{
		$('tr').find(question).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	});
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
function checkRequiredGroupCB(){
    const completeButtonName = document.querySelector('[name=Complete]');
    const completeButtonValue = document.querySelector('[value=Complete]');
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
		}
	});
	if(checkedRequiredGroupCount < requiredGroupCheckboxes.length){
		if(completeButtonName){
			completeButtonName.setAttribute('disabled',true);
		}
		if(completeButtonValue){
			completeButtonValue.setAttribute('disabled',true);
		}	
	}
	else{
		if(completeButtonName){
			completeButtonName.removeAttribute('disabled');
		}
		if(completeButtonValue){
			completeButtonValue.removeAttribute('disabled');
		}	
	}
}

document.addEventListener('DOMContentLoaded', () => {
    requiredGroupCheckboxes.forEach(checkboxGroup => {
        checkboxGroup.forEach(answer => {
            answer.closest('tbody').querySelector('input').addEventListener('change', checkRequiredGroupCB);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
	const floatingCompleteButton = document.querySelector('#complete');
	const completeButtonName = document.querySelector('[name=Complete]');
	const completeButtonValue = document.querySelector('[value=Complete]');
	if(floatingCompleteButton){
		floatingCompleteButton.addEventListener('mouseover', function() {
			if (this.disabled) {
				alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"");
			}
		});
	}
	else if (completeButtonName){
		completeButtonName.addEventListener('mouseover', function() {
			if (this.disabled) {
				alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"");
			}
		});
	}
	else {
		completeButtonValue.addEventListener('mouseover', function() {
			if (this.disabled) {
				alert('Please check question ' + "\"" + closestUncheckedRequiredLabel.innerText + "\"");
			}
		});
	}
});
