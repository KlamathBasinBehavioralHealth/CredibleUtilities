if(typeof tempVisitID === 'undefined'){
  try{
    tempVisitID = undefined;
  }catch(error){
    console.log(error);
    let tempVisitID = undefined;
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

try{
  var emLevel = undefined;
}catch(error){
  console.log(error);
}

if(typeof age === 'undefined'){
  try{
    age = undefined;
  }catch(error){
    console.log(error);
    let age = undefined;
  }
}

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
	
  crisisCalculatorURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0e8PCfuSwWEdENelwx!LcKy&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;
  
  visibility('hide', '.mcisQ');
  visibility('hide', '.mcisA');

  try{
    crisisCalculatorResult = await getData(crisisCalculatorURL);
    cptCode = crisisCalculatorResult.querySelector('cpt_code').innerHTML.toUpperCase();
    modifier1 = crisisCalculatorResult.querySelector('modifier1').innerHTML.toUpperCase();
    billingMatrixID = crisisCalculatorResult.querySelector('billing_matrix_id').innerHTML;
    emLevel = crisisCalculatorResult.querySelector('em_level').innerHTML;
    
    if(cptCode !== '0'){
      cptCodeTarget.value = cptCode;
    }
    if(modifier1 !== '0'){
      modifier1Target.value = modifier1;
    }
    if(billingMatrixID !== '0'){
      billingMatrixIDTarget.value = billingMatrixID;
    }
    if(emLevel !== '0'){
      emLevelTarget.value = emLevel;
    }
  }catch(error){
    console.log(error);
  }
});