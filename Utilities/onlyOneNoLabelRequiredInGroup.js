// This is to grab all the groups and make sure the groups const only has one instance of each group.
const onlyOneGroups = {};
const onlyOneGroupedIndividualCheckboxes = [...document.querySelectorAll('.onlyOneNLCB')];
onlyOneGroupedIndividualCheckboxes.forEach(element => {
  const groupId = element.getAttribute('groupid');
  if (!onlyOneGroups[groupId]) {
    onlyOneGroups[groupId] = [];
  }
  onlyOneGroups[groupId].push(element);
});

const onlyOneGroupedCheckboxes = Object.values(onlyOneGroups);

function onlyOneGroupedNLCB(checkbox_answer){
	const redAsteriskDiv = document.createElement('div');
	// Red asterisk for the text box
        redAsteriskDiv.textContent = '*';  
        redAsteriskDiv.style.color = 'red';
        redAsteriskDiv.style.fontSize = '15px';
	onlyOneGroupedCheckboxes.forEach(checkboxGroup => {
		if(checkboxGroup[1].getAttribute('groupid') == checkbox_answer.getAttribute('groupid')){
			checkboxGroup.forEach(answer => {
				answer.closest('tbody').querySelector('input').checked = false;
				if(answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea')){
					answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').required = false;
					answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.style.display = 'none';
					if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table')){
						checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table').style.display = 'none';
					}
					if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea')){
						if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td')){
							if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div')){
								checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div').remove();
							}
						}
					}
				}			
			});
		}
		checkbox_answer.closest('tbody').querySelector('input').checked = true;
		checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.style.display = 'inline';
		if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table')){
			checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('table').style.display = 'inline';
		}
		if(checkbox_answer.classList.contains('requireTextarea')){
			if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea')){
				checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').required = true;
				if(checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div')){
					checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').querySelector('div').remove();
				} else{
					checkbox_answer.closest('tr').closest('tbody').closest('tr').nextElementSibling.querySelector('textarea').closest('td').appendChild(redAsteriskDiv);
				}
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
    onlyOneGroupedCheckboxes.forEach(checkboxGroup => {
        checkboxGroup.forEach(answer => {
            answer.closest('tbody').querySelector('input').addEventListener('change', function(){
				onlyOneGroupedNLCB(answer);
			});
        });
    });
});
