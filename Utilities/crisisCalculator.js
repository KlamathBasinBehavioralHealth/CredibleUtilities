let cid = undefined;

let tvid = undefined;

let programID = undefined;
const crisisProgramID = 117; 

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

let isFollowUp = undefined;
let isStabilization = undefined;
let ogHT = undefined;

let cptCode = undefined;
let modifier1 = undefined;
let modifier2 = undefined;

let inHospital = undefined;

function checkHospital(){
  inHospital = [...document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0].checked;
  
  calculateCodes();
}

let tempVisitType = undefined;

document.querySelector("DOMContentLoaded", () => {
  console.log('Crisis Calculator Primary Load Function');

  cptCode = document.querySelector('#crisisAssessmentCPTCode').closest('table').querySelector('input');
  modifier1 = document.querySelector('#crisisAssessmentModifier1').closest('table').querySelector('input');
  modifier2 = document.querySelector('#crisisAssessmentModifier2').closest('table').querySelector('input');

  try{
    cid = (new URL(frameElement.src)).searchParams.get('client_id');
  }catch(error){
    console.log(error);
    cid = '200079';
  }
  if(cid == undefined){
    cid = '200079';
  }

  try{
    tvid = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
  }catch(error){
    console.log(error);
  }
  if(tvid == undefined){
    tvid = '2506903';
  }

  try{ 
    programID = window.parent.parent[0].$('input[id=programId]').val(); 
  }
  catch{ 
    if(programID == undefined){ 
      programID = 117; 
    } 
  } 

  try{
    age = checkAge();
  }catch(error){
    console.log(error);
    age = defaultAge;
  }

  let checkStabilizationURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eaKmY5yrn8bybVnZc2VMjJ&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;
  let checkStabilizationResult;
	
  try{
    checkStabilizationResult = await getData(checkStabilizationURL);
    tempVisitType = checkStabilizationResult.querySelector('visittype').innerHTML;
  }catch(error){
    console.log(error);
    tempVisitType = 'Test';
  }
  
  /*const crisisCalcUrl = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0fjxySud1NFWjBUhc9G4lfD&start_date=&end_date=&custom_param1=${cid}&custom_param2=${serviceTypeID}&custom_param3=`;
  let crisisCalcResult;
  
  try{
    crisisCalcResult = await getData(crisisCalcUrl);
    isFollowUp = parseInt(crisisCalcResult.querySelector('within_72_hours').innerHTML);
    ogHT = parseInt(crisisCalcResult.querySelector('ht').innerHTML);
  }catch(error){
    console.log(error);
  }
  
  checkHospital();
  document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });*/
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
