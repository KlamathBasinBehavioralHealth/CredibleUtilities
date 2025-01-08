const criticalIncident = Array.from(document.querySelector('#incidentType').closest('tbody').querySelector('tbody').querySelectorAll('input'));
$(document).ready(function() {
	try{
		criticalIncident.forEach((input) => {
		input.addEventListener('change', () => {
			var incidentLocation = Array.from(document.querySelector('#incidentLocation').closest('tr').nextElementSibling.querySelectorAll('select')).map(select => select.value);
			if(criticalIncident[0].checked & (incidentLocation == 234 || incidentLocation == 235)){
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[0].checked = true;
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[1].checked = true;
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[5].checked = true;
			} else{
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[0].checked = false;
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[1].checked = false;
				Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'))[5].checked = false;
			}
		});
	});
	}
	catch(error){
		console.log(error);
	}

});

const incidentDescription = Array.from(document.querySelector('#incidentDescription').closest('tr').nextElementSibling.querySelectorAll('input'));
$(document).ready(function() {
    try {
        incidentDescription.forEach((input) => {
            input.addEventListener('change', () => {
                if (incidentDescription[0].checked || incidentDescription[1].checked || incidentDescription[3].checked || incidentDescription[4].checked || incidentDescription[6].checked || incidentDescription[7].checked || incidentDescription[9].checked || incidentDescription[10].checked || incidentDescription[11].checked || incidentDescription[13].checked) {
                    criticalIncident[1].checked = false;
					criticalIncident[0].checked = true;
                  	criticalIncident[0].dispatchEvent(new Event('change'));
                } else {
                    criticalIncident[0].checked = false;
					criticalIncident[1].checked = true;
                  	criticalIncident[0].dispatchEvent(new Event('change'));
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
});


const notificationDetails = Array.from(document.querySelector('#notificationDetails').closest('tr').nextElementSibling.querySelectorAll('input'));
$(document).ready(function() {
	try{
		notificationDetails.forEach((input) => {
		input.addEventListener('change', () => {
			var incidentLocation = Array.from(document.querySelector('#incidentLocation').closest('tr').nextElementSibling.querySelectorAll('select')).map(select => select.value);
			if(notificationDetails[0].checked || notificationDetails[1].checked || notificationDetails[2].checked || notificationDetails[3].checked || notificationDetails[5].checked || notificationDetails[6].checked || notificationDetails[8].checked){
				criticalIncident[1].checked = false;
				criticalIncident[0].checked = true;
				input.dispatchEvent(new Event('change'));
			} else{
				criticalIncident[0].checked = false;
				criticalIncident[1].checked = true;
				input.dispatchEvent(new Event('change'));
			}
		});
	});
	}
	catch(error){
		console.log(error);
	}
});


window.addEventListener("DOMContentLoaded", async function() { 
	try{
		var tempVisitID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
		var urlOne = 'https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0fyrLBM3FmJKQKe0EXxvxfq&start_date=&end_date=&custom_param1=' + tempVisitID + '&custom_param2=&custom_param3=';
		var urlTwo = 'https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0d2OrY!N2hPtHmlYAt2jUes&start_date=&end_date=&custom_param1=' + tempVisitID + '&custom_param2=&custom_param3=';
		var tempProgram = await getData(urlOne);
		tempProgram = tempProgram.querySelector('program_id').textContent;
		var tempLocation = await getData(urlTwo);
		tempLocation = tempLocation.querySelector('location_id').textContent;
		document.querySelector('#incidentProgram').closest('tr').nextElementSibling.querySelector('select').value = tempProgram;
		if(tempProgram == 142 || tempProgram == 124){
			document.querySelector('#incidentLocation').closest('tr').nextElementSibling.querySelector('select').value = tempLocation;
		}
	}
	catch(error){
		console.log(error);
	}
});
