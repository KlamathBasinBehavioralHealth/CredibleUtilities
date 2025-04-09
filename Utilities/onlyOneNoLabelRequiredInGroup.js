// This is to grab all the groups and make sure the groups const only has one instance of each group.
const groups = {};
const requiredIndividualCheckboxes = [...document.querySelectorAll('.onlyOneNLCB')];
requiredIndividualCheckboxes.forEach(element => {
  const groupId = element.getAttribute('groupid');
  if (!groups[groupId]) {
    groups[groupId] = [];
  }
  groups[groupId].push(element);
});
const requiredGroupCheckboxes = Object.values(groups);

// This variable is to notify which is the closest group of no label checkboxes does not meet its required checked answer count
var closestUncheckedRequiredLabel;
function checkRequiredGroupCB(checkbox_answer){
	const redAsteriskDiv = document.createElement('div');
    redAsteriskDiv.textContent = '*';  
    redAsteriskDiv.style.color = 'red';
    redAsteriskDiv.style.fontSize = '15px';
	requiredGroupCheckboxes.forEach(checkboxGroup => {
		// This variable is to count how many no label checkboxes in the group are checked
		cbCheckedCount = 0;
		let checkedAnswer;
		if(checkboxGroup[1].getAttribute('groupid') == checkbox_answer.getAttribute('groupid')){
			checkboxGroup.forEach(answer => {
				answer.closest('tbody').querySelector('input').checked = false;
				answer.closest('tbody').querySelector('input').checked = false;
				answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').required = false;
				answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.style.display = 'none';
				checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table').style.display = 'none';
				if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div')){
					checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div').remove();
				}
			});
		}
		checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.style.display = 'inline';
		checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table').style.display = 'inline';
		checkbox_answer.closest('tbody').querySelector('input').checked = true;
		if(checkbox_answer.classList.contains('requireTextarea')){
			checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').required = true;
			if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div')){
				checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div').remove();
			} else{
				checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').appendChild(redAsteriskDiv);
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
    requiredGroupCheckboxes.forEach(checkboxGroup => {
        checkboxGroup.forEach(answer => {
            answer.closest('tbody').querySelector('input').addEventListener('change', function(){
				checkRequiredGroupCB(answer);
			});
        });
    });
});