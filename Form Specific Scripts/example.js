var incidentNotification = Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'));
$(document).ready(function() {
	try{
		incidentNotification.forEach((input) => {
		input.addEventListener('change', () => {
			var incidentLocation = Array.from(document.querySelector('#incidentLocation').closest('tr').nextElementSibling.querySelectorAll('select')).map(select => select.value);
			if(incidentNotification[0].checked || incidentNotification[1].checked || incidentNotification[2].checked || incidentNotification[3].checked || incidentNotification[5].checked || incidentNotification[6].checked || incidentNotification[8].checked){
				criticalIncident[0].checked = true;
			} else{
				criticalIncident[0].checked = false;
			}
		});
	});
	}
	catch(error){
		console.log(error);
	}
});