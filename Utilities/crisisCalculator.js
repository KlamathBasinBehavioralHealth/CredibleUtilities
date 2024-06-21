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

const stabilizationServices = ['CRC Admit', 'CRC Observation', 'CRD Discharge', 'Admin Note'];

function checkHospital(){
  inHospital = [...document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0].checked;
  
  calculateCodes();
}

let tempVisitType = undefined;

let checkStabilizationURL = undefined;

let isStabilizationYes;
let isStabilizationNo;
let within72OfAssessmentYes;
let within72OfAssessmentNo;
let ogHTYes;
let ogHTNo;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Crisis Calculator Primary Load Function');

  cptCode = document.querySelector('#crisisAssessmentCPTCode').closest('table').querySelector('input');
  modifier1 = document.querySelector('#crisisAssessmentModifier1').closest('table').querySelector('input');
  modifier2 = document.querySelector('#crisisAssessmentModifier2').closest('table').querySelector('input');

  let isStabilizationYes = [...document.querySelector('#isStabilization').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0];
  
  let isStabilizationNo = [...document.querySelector('#isStabilization').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('No');
  })[0];
  
  let within72OfAssessmentYes = [...document.querySelector('#within72OfAssessment').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0];
  
  let within72OfAssessmentNo = [...document.querySelector('#within72OfAssessment').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('No');
  })[0];
  
  let ogHTYes = [...document.querySelector('#ogHT').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('Yes');
  })[0];
  
  let ogHTNo = [...document.querySelector('#ogHT').closest('table').querySelectorAll('input')].filter((input) => {
    return input.closest('tr').innerHTML.includes('No');
  })[0];

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
	
  checkStabilizationURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eaKmY5yrn8bybVnZc2VMjJ&start_date=&end_date=&custom_param1=${tvid}&custom_param2=&custom_param3=`;
  
  try{
    checkStabilizationResult = await getData(checkStabilizationURL);
    tempVisitType = checkStabilizationResult.querySelector('visittype').innerHTML;
  }catch(error){
    console.log(error);
    tempVisitType = 'Test';
  }

  if(stabilizationServices.includes(tempVisitType)){
    isStabilizationYes.checked = false;
    isStabilizationNo.checked = false;
    isStabilizationYes.click();
    visibility('hide', '#isStabilization');
  }else{
    isStabilizationYes.checked = false;
    isStabilizationNo.checked = false;
    if(programID == crisisProgramID){
      visibility('show', '#isStabilization', true);
    }
  }

  console.log('Check Stabilization done.');
  
  const crisisCalcUrl = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0fjxySud1NFWjBUhc9G4lfD&start_date=&end_date=&custom_param1=${cid}&custom_param2=${serviceTypeID}&custom_param3=`;
  let crisisCalcResult;
  
  try{
    crisisCalcResult = await getData(crisisCalcUrl);
    isFollowUp = parseInt(crisisCalcResult.querySelector('within_72_hours').innerHTML);
    ogHT = parseInt(crisisCalcResult.querySelector('ht').innerHTML);
  }catch(error){
    console.log(error);
  }

  if(isFollowUp){
    within72OfAssessmentYes.checked = false;
    within72OfAssessmentNo.checked = false;
    within72OfAssessmentYes.click();
    visibility('hide', '#within72OfAssessment');
  }else{
    within72OfAssessmentYes.checked = false;
    within72OfAssessmentNo.checked = false;
    if(programID == crisisProgramID){
      visibility('show', '#within72OfAssessment', true);
    }
  }

  if(ogHT){
    ogHTYes.checked = false;
    ogHTNo.checked = false;
    ogHTYes.click();
    visibility('hide', '#ogHT');
  }else{
    ogHTYes.checked = false;
    ogHTNo.checked = false;
    if(programID == crisisProgramID){
      visibility('show', '#ogHT', true);
    }
  }

  checkHospital();

  document.querySelector('#crisisAtHospital').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });
  document.querySelector('#isStabilization').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });
  document.querySelector('#within72OfAssessment').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });
  document.querySelector('#ogHT').closest('table').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', checkHospital);
    input.addEventListener('mouseleave', checkHospital);
  });
});

function calculateCodes(){
  if(programID == crisisProgramID){
    if(within72OfAssessmentYes){
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
        if(isStabilizationYes){
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
  }else{
    visibility('hide', '.crisisCalculatorQ');
  }
}