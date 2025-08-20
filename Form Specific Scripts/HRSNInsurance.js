let primaryInsurance = null;
let clientID;
let dataPull;

// Yu Hsu's code of grabbing primary insurance and looking at the payer_description
async function loadPrimaryInsurance(){
  try{
    dataPull = await getData(`https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eoAIHi!D-Kucs6-GUh0YNt&start_date=&end_date=&custom_param1=${clientID}&custom_param2=&custom_param3=`);
  }catch(error){
    console.log('error');
  }
  
  if(dataPull.documentElement.querySelector('payer_description').innerHTML){
    primaryInsurance = dataPull.documentElement.querySelector('payer_description').innerHTML;
  }
}

// Function to check the conditions listed in CRED-16171
async function checkHRSN() {
    loadPrimaryInsurance();
    if ((primaryInsurance.includes('OMAP')) && (document.querySelector('#hrsnUtilities').closest('tr').querySelector('td').querySelector('input').checked || [...document.querySelector('#housingStatus').closest('tr').nextElementSibling.querySelectorAll('input')][1].checked)) {
        [...document.querySelector('#hrsn').closest('tr').nextElementSibling.querySelectorAll('input')][0].checked = true;
    } else {
        [...document.querySelector('#hrsn').closest('tr').nextElementSibling.querySelectorAll('input')][1].checked = true;
    }
}

// Section where the code actually runs
document.addEventListener('DOMContentLoaded', async function() {
   // Grabbing the client id from the service or setting it to patty
    try {
        clientID = parseInt(window.top.document.querySelector('frame[name=left]').contentDocument.querySelector('#client_id').value);
    } catch (error) {
        console.log(error);
    }
    try {
        clientID = parseInt(window.top.document.querySelector('frame[name=main]').contentDocument.querySelector('frame[name=left]').contentDocument.querySelector('#client_id').value);
    } catch (error) {
        console.log(error);
    }
    if (clientID === null || clientID === undefined) {
        clientID = 200079;
    }
    checkHRSN();
    
    // The event listeners for the housing status and utilities
    [...document.querySelector('#housingStatus').closest('tr').nextElementSibling.querySelectorAll('input')].forEach((answer) => {
        answer.addEventListener('change', () => {
            checkHRSN();
        });
    });
    document.querySelector('#hrsnUtilities').closest('tr').querySelector('td').querySelector('input').addEventListener('change', () => {
        checkHRSN();
    });

});

