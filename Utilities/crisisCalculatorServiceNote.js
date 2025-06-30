document.addEventListener('DOMContentLoaded', async () => {
  let dataPull;
  let qmhp = document.querySelector('#credentialQMHP').closest('tr');
  let qmha = document.querySelector('#credentialQMHA').closest('tr');
  let cadc = document.querySelector('#credentialCADC').closest('tr');
  let pss = document.querySelector('#credentialPSS').closest('tr');
  
  document.querySelector('#relevantCredentials').closest('table').closest('tr').hidden = true;
  
  try{
    dataPull = await getData(`https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0dXuqjUt41eVlLBrzHd!rkn&start_date=&end_date=&custom_param1=${getTempVisitID()}&custom_param2=&custom_param3=`);
  }catch(error){
    console.log('error');
  }
  
  if(dataPull.documentElement.querySelectorAll('credentials').length){
    document.querySelector('#relevantCredentials').closest('table').closest('tr').hidden = false;
  }
  
  qmhp.hidden = true;
  qmha.hidden = true;
  cadc.hidden = true;
  pss.hidden = true;
  
  try{
    if(dataPull.documentElement.querySelectorAll('credentials').length){
      [...dataPull.documentElement.querySelectorAll('credentials')].forEach((credential) => {
        switch(true){
          case credential.innerHTML.includes('QMHP'):
            qmhp.hidden = false;
            break;
          case credential.innerHTML.includes('QMHA'):
            qmha.hidden = false;
            break;
          case credential.innerHTML.includes('CADC'):
            cadc.hidden = false;
            break;
          case credential.innerHTML.includes('PSS'):
            pss.hidden = false;
            break;
          default:
            break;
        }
      });
    }
  }catch(error){
    console.log(error);
  }
  
  if(dataPull.documentElement.querySelectorAll('credentials').length === 1){
    switch(true){
      case [...dataPull.documentElement.querySelectorAll('credentials')][0].innerHTML.includes('QMHP'):
        if(!document.querySelector('#credentialQMHP').closest('tr').querySelector('input').checked){
          qmhp.querySelector('input').checked = false;
          qmhp.querySelector('input').disabled = false;
          qmhp.querySelector('input').click();
          qmhp.querySelector('input').disabled = true;
        }
        break;
      case [...dataPull.documentElement.querySelectorAll('credentials')][0].innerHTML.includes('QMHA'):
        if(!document.querySelector('#credentialQMHA').closest('tr').querySelector('input').checked){
          qmha.querySelector('input').checked = false;
          qmha.querySelector('input').disabled = false;
          qmha.querySelector('input').click();
          qmha.querySelector('input').disabled = true;
        }
        break;
      case [...dataPull.documentElement.querySelectorAll('credentials')][0].innerHTML.includes('CADC'):
        if(!document.querySelector('#credentialCADC').closest('tr').querySelector('input').checked){
          cadc.querySelector('input').checked = false;
          cadc.querySelector('input').disabled = false;
          cadc.querySelector('input').click();
          cadc.querySelector('input').disabled = true;
        }
        break;
      case [...dataPull.documentElement.querySelectorAll('credentials')][0].innerHTML.includes('PSS'):
        if(!document.querySelector('#credentialPSS').closest('tr').querySelector('input').checked){
          pss.querySelector('input').checked = false;
          pss.querySelector('input').disabled = false;
          pss.querySelector('input').click();
          pss.querySelector('input').disabled = true;
        }
        break;
      default:
        break;
    }
  }
});

try{
  tempVisitID = undefined;
}catch(error){
  console.log(error);
  let tempVisitID = undefined;
}

try{
  cptCode = undefined;
}catch(error){
  console.log(error);
  let cptCode = undefined;
}
try{
  modifier1 = undefined;
}catch(error){
  console.log(error);
  let modifier1 = undefined;
}

try{
  billingMatrixID = undefined;
}catch(error){
  console.log(error);
  let billingMatrixID = undefined;
}

try{
  age = undefined;
}catch(error){
  console.log(error);
  let age = undefined;
}

const adultAge = 21;

let cptCodeTarget = undefined;
let modifier1Target = undefined;
let mcisNotificationTarget = undefined;
let crisisCalculatorURL = undefined;
let crisisCalculatorResult = undefined;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Crisis Calculator Primary Load Function');

  if($('tr').has('div[id=clientAge]').find('input')?.val() != ''){
		age = $('tr').has('div[id=clientAge]').find('font').text();
		console.log(age);
	}
	if(!$.isNumeric(age)){
		age = 18;
	}

  cptCodeTarget = document.querySelector('#mcisCPTCode').closest('table').querySelector('input');
  modifier1Target = document.querySelector('#mcisModifier1').closest('table').querySelector('input');
  mcisNotificationTarget = document.querySelector('#mcisNotification').closest('table').querySelector('input');

  try{
    tempVisitID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
  }catch(error){
    console.log(error);
  }
  if(tempVisitID == undefined){
    tempVisitID = '2582616';
  }
	
  crisisCalculatorURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0f3Bkthlr2RHWvG95oVWxhJ&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;
  
  visibility('hide', '.mcisQ');
  visibility('hide', '.mcisA');

  try{
    crisisCalculatorResult = await getData(crisisCalculatorURL);
    cptCode = crisisCalculatorResult.querySelector('cpt_code').innerHTML.toUpperCase();
    modifier1 = crisisCalculatorResult.querySelector('modifier1').innerHTML.toUpperCase();
    
    if(cptCode !== '0'){
      cptCodeTarget.value = cptCode;
    }
    if(modifier1 !== '0'){
      modifier1Target.value = modifier1;
    }
  }catch(error){
    console.log(error);
  }

  mcisNotificationTarget.checked = false;
  if(cptCode == 'H2011'){
    mcisNotificationTarget.checked = true;
  }
});

document.querySelector('form').addEventListener('submit', function(e) {
  let selectedCredential = '';

  if(mcisNotificationTarget.checked){
    switch (true) {
      case document.querySelector('#clientOutreach')?.closest('table').querySelector('input').checked:
        selectedCredential = '605';
        break;
      case document.querySelector('#careNavigation')?.closest('tr').querySelector('input').checked:
        selectedCredential = '812';
        break;
      case document.querySelector('#caseManagement')?.closest('tr').querySelector('input').checked:
        selectedCredential = '1043';
        break;
      case document.querySelector('#therapyService')?.closest('tr').querySelector('input').checked:
        selectedCredential = '1047';
        break;
      case document.querySelector('#skillsTraining')?.closest('tr').querySelector('input').checked:
        selectedCredential = '1046';
        break;
    }
  }else{
    switch (true) {
      case document.querySelector('#clientOutreach')?.closest('table').querySelector('input').checked:
        selectedCredential = '605';
        break;
      case document.querySelector('#careNavigation')?.closest('tr').querySelector('input').checked:
        selectedCredential = '812';
        break;
      case document.querySelector('#caseManagement')?.closest('tr').querySelector('input').checked:
        selectedCredential = '465';
        break;
      case document.querySelector('#therapyService')?.closest('tr').querySelector('input').checked:
        selectedCredential = '984';
        break;
      case document.querySelector('#skillsTraining')?.closest('tr').querySelector('input').checked:
        selectedCredential = '444';
        break;
    }
  }

  if (selectedCredential) {
    document.querySelector('#serviceType').closest('table').querySelector('input').value = selectedCredential;
  }
});