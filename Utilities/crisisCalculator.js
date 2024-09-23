if(typeof tempVisitID === 'undefined'){
  try{
    var tempVisitID = undefined;
  }catch(error){
    console.log(error);
  }
} 
if(typeof cptCode === 'undefined'){
  try{
    var cptCode = undefined;
  }catch(error){
    console.log(error);
  }
}
if(typeof modifier1 === 'undefined'){
  try{
    var modifier1 = undefined;
  }catch(error){
    console.log(error);
  }
}
if(typeof billingMatrixID === 'undefined'){
  try{
    var billingMatrixID = undefined;
  }catch(error){
    console.log(error);
  }
}
if(typeof emLevel === 'undefined'){
  try{
    var emLevel = undefined;
  }catch(error){
    console.log(error);
  }
}
let age = undefined;
const adultAge = 21;

let cptCodeTarget = undefined;
let modifier1Target = undefined;
let billingMatrixIDTarget = undefined;
let emLevelTarget = undefined;

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
  billingMatrixIDTarget = document.querySelector('#mcisBillingMatrixID').closest('table').querySelector('input');
  emLevelTarget = document.querySelector('#mcisEMLevel').closest('table').querySelector('input');

  try{
    tempVisitID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
  }catch(error){
    console.log(error);
  }
  if(tempVisitID == undefined){
    tempVisitID = '2582616';
  }
	
  crisisCalculatorURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eaKmY5yrn8bybVnZc2VMjJ&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;

  try{
    visibility('hide', '.mcisQ');
  //visibility('hide', '.mcisA');
  }catch(error){
    console.log(error);
  }
  

  try{
    crisisCalculatorResult = await getData(crisisCalculatorURL2);
    cptCode = crisisCalculatorResult.querySelector('cpt_code').innerHTML;
    modifier1 = crisisCalculatorResult.querySelector('modifier1').innerHTML;
    billingMatrixID = crisisCalculatorResult.querySelector('billing_matrix_id').innerHTML;
    emLevel = crisisCalculatorResult.querySelector('em_level').innerHTML;
    
    cptCodeTarget.value = cptCode;
    modifier1Target.value = modifier1;
    billingMatrixIDTarget.value = billingMatrixID;
    emLevelTarget.value = emLevel;
  }catch(error){
    console.log(error);

    stabilizationCheckYes = [...document.querySelector('#stabilizationCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('Yes');
    })[0];
    stabilizationCheckNo = [...document.querySelector('#stabilizationCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('No');
    })[0];
    crisisAssessmentCheckYes = [...document.querySelector('#crisisAssessmentCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('Yes');
    })[0];
    crisisAssessmentCheckNo = [...document.querySelector('#crisisAssessmentCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('No');
    })[0];
    followUpCheckYes = [...document.querySelector('#followUpCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('Yes');
    })[0];
    followUpCheckNo = [...document.querySelector('#followUpCheck').closest('table').querySelectorAll('input')].filter((input) => {
      return input.closest('tr').innerHTML.includes('No');
    })[0];

    stabilizationCheckYes.addEventListener('change', calculateCrisisCodes);
    stabilizationCheckYes.addEventListener('mouseleave', calculateCrisisCodes);
    stabilizationCheckNo.addEventListener('change', calculateCrisisCodes);
    stabilizationCheckNo.addEventListener('mouseleave', calculateCrisisCodes);
    crisisAssessmentCheckYes.addEventListener('change', calculateCrisisCodes);
    crisisAssessmentCheckYes.addEventListener('mouseleave', calculateCrisisCodes);
    crisisAssessmentCheckNo.addEventListener('change', calculateCrisisCodes);
    crisisAssessmentCheckNo.addEventListener('mouseleave', calculateCrisisCodes);
    followUpCheckYes.addEventListener('change', calculateCrisisCodes);
    followUpCheckYes.addEventListener('mouseleave', calculateCrisisCodes);
    followUpCheckNo.addEventListener('change', calculateCrisisCodes);
    followUpCheckNo.addEventListener('mouseleave', calculateCrisisCodes);

    calculateCrisisCodes();

    visibility('show', '.mcisQ', true);
    //visibility('hide', '.mcisA');
  }
});

let stabilizationCheckYes = undefined;
let stabilizationCheckNo = undefined;
let crisisAssessmentCheckYes = undefined;
let crisisAssessmentCheckNo = undefined;
let followUpCheckYes = undefined;
let followUpCheckNo = undefined;

function calculateCrisisCodes(){
  if(document.querySelector('#crisisAssessmentLabel')){
    if(!crisisAssessmentCheckYes.checked){
      crisisAssessmentCheckYes.click();
    }
    visibility('hide', '#crisisAssessmentCheck');

    if(!followUpCheckYes.checked){
      followUpCheckYes.click();
    }
    visibility('hide', '#followUpCheck');
  }

  if(stabilizationCheckYes.checked){
    if(age < adultAge){
      cptCodeTarget.value = 'H2011';
      modifier1Target.value = 'TS';
      billingMatrixIDTarget.value = '';
      emLevelTarget.value = '';
    }else{
      cptCodeTarget.value = '';
      modifier1Target.value = '';
      billingMatrixIDTarget.value = '';
      emLevelTarget.value = '';
    }
  }else if(stabilizationCheckNo.checked){
    if(crisisAssessmentCheckYes.checked){
      cptCodeTarget.value = 'H2011';
      modifier1Target.value = 'HE';
      billingMatrixIDTarget.value = '';
      emLevelTarget.value = '1';  
    }else if(crisisAssessmentCheckNo){
      if(followUpCheckYes.checked){
        cptCodeTarget.value = 'H2011';
        modifier1Target.value = 'HE';
        billingMatrixIDTarget.value = '';
        emLevelTarget.value = '1'; 
      }else if(followUpCheckNo.checked){
        cptCodeTarget.value = '';
        modifier1Target.value = '';
        billingMatrixIDTarget.value = '';
        emLevelTarget.value = '';
      }else{
        cptCodeTarget.value = '';
        modifier1Target.value = '';
        billingMatrixIDTarget.value = '';
        emLevelTarget.value = '';
      }
    }else{
      cptCodeTarget.value = '';
      modifier1Target.value = '';
      billingMatrixIDTarget.value = '';
      emLevelTarget.value = '';
    }
  }else{
    cptCodeTarget.value = '';
    modifier1Target.value = '';
    billingMatrixIDTarget.value = '';
    emLevelTarget.value = '';
  }
}
