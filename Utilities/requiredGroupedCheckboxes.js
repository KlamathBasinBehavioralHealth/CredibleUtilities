// This is to grab all the groups and make sure the groups const only has one instance of each group.
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

// This is to add the red asterisk to the main label for the no label checkbox group that is using this script
requiredGroupCheckboxes.forEach(checkboxGroup => {
	const asterisk = document.createElement('span');
	asterisk.textContent = '*';
	asterisk.style.color = 'red'; 
	searchClosestLabel(checkboxGroup).parentElement.appendChild(asterisk);
	//checkboxGroup.forEach(question =>{
	//	$('tr').find(question).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	//});
});

// This is to get the closest <b>. From looking at how the form is structured in html and our style guide, we always put a label before a no label checklist. This is grabbing the <b> for that label.
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

// This variable is to notify which is the closest group of no label checkboxes does not meet its required checked answer count
var closestUncheckedRequiredLabel;
// This variable grab the requirement for the closest group that didn't meet it's requirement. This is used later in a different function.
var closestUncheckedRequiredCount = 1;
function checkRequiredGroupCB(){
    // This variable is to notify which is the closest group of no label checkboxes does not meet its required checked answer count
    closestUncheckedRequiredLabel = null;
    // These variables are the complete buttons that can show up in a form
    const completeButtonName = document.querySelector('[name=Complete]');
    const completeButtonValue = document.querySelector('[value=Complete]');
    const floatingCompleteButton = document.querySelector('#complete');
	// This variable is to count how many no label checkboxes in the group are checked
	let cbCheckedCount = 0;
	// This variable is to count how groups met their requirement
	let checkedRequiredGroupCount = 0;
	requiredGroupCheckboxes.forEach(checkboxGroup => {
		// This variable is to track how many no label check boxes are required for the group being looked at
		let requiredCount = 1;
		// This variable is to count how many no label checkboxes in the group are checked
		cbCheckedCount = 0;
		checkboxGroup.forEach(answer => {
			// This variable is to track how many no label check boxes are required for the group being looked at
			requiredCount = parseInt(answer.getAttribute('requiredCount'), 10);	
			//This if statement actually checks if the no label was checked.
			if(answer.closest('tbody').querySelector('input').checked){
				// This variable is to count how many no label checkboxes in the group are checked
				cbCheckedCount = cbCheckedCount + 1;
			}
		});
		if(cbCheckedCount >= requiredCount){
			// This variable is to count how groups met their requirement
			checkedRequiredGroupCount = checkedRequiredGroupCount + 1;
		} 
		else{
			// This variable is to notify which is the closest group of no label checkboxes does not meet its required checked answer count 
			closestUncheckedRequiredLabel = searchClosestLabel(checkboxGroup);
			closestUncheckedRequiredCount = requiredCount;
		}
	});
	if(checkedRequiredGroupCount < requiredGroupCheckboxes.length){
		// firstCBUnchecked is from the visibility.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		// This section is to disable or enable the complete button depending on if all group meet thedir required checked answer count
		try{
			if(completeButtonName && firstCBUnchecked == null){
				completeButtonName.setAttribute('disabled',true);
			}
			if(completeButtonValue && firstCBUnchecked == null){
				completeButtonValue.setAttribute('disabled',true);
			}
			if(floatingCompleteButton && firstCBUnchecked == null){
				floatingCompleteButton.setAttribute('disabled',true);
			}
		} catch (e){
			if(e instanceof ReferenceError){
				completeButtonName.setAttribute('disabled',true);
				completeButtonValue.setAttribute('disabled',true);
				floatingCompleteButton.setAttribute('disabled',true);
			}
		}
	}
	else{
		// firstCBUnchecked is from the visibility.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		try{
			if(completeButtonName && firstCBUnchecked == null){
				completeButtonName.removeAttribute('disabled');
			}
			if(completeButtonValue && firstCBUnchecked == null){
				completeButtonValue.removeAttribute('disabled');
			}
			if(floatingCompleteButton && firstCBUnchecked == null){
				floatingCompleteButton.removeAttribute('disabled');
			}
		} catch (e){
			if(e instanceof ReferenceError){
				completeButtonName.removeAttribute('disabled');
				completeButtonValue.removeAttribute('disabled');
				floatingCompleteButton.removeAttribute('disabled');
			}
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
