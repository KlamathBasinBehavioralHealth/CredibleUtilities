let cid = undefined;
try{
  cid = getClientID();
}catch(error){
  console.log(error);
  cid = '200079';
}
let tempVisitID = undefined;
try{
  tempVisitID = getTempVisitID();
}catch(error){
  console.log(error);
  tempVisitID = '';
}
let programID = undefined;
const crisisProgramID = 117;

try{ 
  programID = window.parent.parent[0].$('input[id=programId]').val(); 
}
catch{ 
  if(programID == undefined){ 
    programID = 117; 
  } 
}  

let serviceTypeID = '1036';

let age = undefined;
let defaultAge = 18;

function checkAge(){
  let tempAge = undefined;
  if($('tr').has('div[id=clientAge]').find('input')?.val() != ''){
		tempAge = parseInt($('tr').has('div[id=clientAge]').find('font').text(), 10);
	}
	if(!$.isNumeric(tempAge)){
		tempAge = defaultAge;
    document.querySelector('#clientAge').closest('table').querySelector('font').innerText = '18';
	}
  return tempAge;
}

try{
  age = checkAge();
}catch(error){
  console.log(error);
  age = defaultAge;
}

let isFollowUp = undefined;
let isStabilization = undefined;
let ogHT = undefined;

let cptCode = document.querySelector('#crisisAssessmentCPTCode').closest('table').querySelector('input');
let modifier1 = document.querySelector('#crisisAssessmentModifier1').closest('table').querySelector('input');
let modifier2 = document.querySelector('#crisisAssessmentModifier2').closest('table').querySelector('input');

let inHospital = undefined;

function checkHospital(){
  inHospital = [...document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0].checked;
  
  calculateCodes();
}

let tempVisitType = undefined;

document.addEventListener('DOMContentLoaded', async () => {
  tempVisitID = '2506903';
  
  let checkStabilizationURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eaKmY5yrn8bybVnZc2VMjJ&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;
  
  try{
    let checkStabilizationResult = await getData(checkStabilizationURL);
    tempVisitType = checkStabilizationResult.querySelector('visittype').innerHTML;
  }catch(error){
    console.log(error);
    tempVisitType = 'Test';
  }
  
  const crisisCalcUrl = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0fjxySud1NFWjBUhc9G4lfD&start_date=&end_date=&custom_param1=${cid}&custom_param2=${serviceTypeID}&custom_param3=`;
  
  try{
    let crisisCalcResult = await getData(crisisCalcUrl);
    isFollowUp = parseInt(crisisCalcResult.querySelector('within_72_hours').innerHTML);
    ogHT = parseInt(crisisCalcResult.querySelector('ht').innerHTML);
  }catch(error){
    console.log(error);
  }
  
  checkHospital();
  document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });
});

function calculateCodes(){
  if(programID == crisisProgramID){
    if(isFollowUp){
      if(age >= 18){
        if(inHospital){
          cptCode.value = 'H2011';
          modifier1.value = 'HE';
          modifier2.value = '';
        }else{
          if(ogHT){
            cptCode.value = 'H2011';
            modifier1.value = 'HE';
            modifier2.value = 'HT';
          }else{
            cptCode.value = 'H2011';
            modifier1.value = 'HE';
            modifier2.value = '';
          }
        }
      }else{
        if(isStabilization){
          cptCode.value = 'H2011';
          modifier1.value = 'TS';
          modifier2.value = '';
        }else{
          cptCode.value = 'H2011';
          modifier1.value = '';
          modifier2.value = '';
        }
      }
    }
  }
}  