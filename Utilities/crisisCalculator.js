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

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Crisis Calculator Primary Load Function');

  try{
    tempVisitID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
  }catch(error){
    console.log(error);
  }
  if(tempVisitID == undefined){
    tempVisitID = '2582616';
  }
	
  crisisCalculatorURL = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0e8PCfuSwWEdENelwx!LcKy&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`;
  
  try{
    crisisCalculatorResult = await getData(crisisCalculatorURL);
    cptCode = crisisCalculatorResult.querySelector('cpt_code').innerHTML;
    modifier1 = crisisCalculatorResult.querySelector('modifier1').innerHTML;
    billingMatrixID = crisisCalculatorResult.querySelector('billing_matrix_id').innerHTML;
    emLevel = crisisCalculatorResult.querySelector('em_level').innerHTML;
    
    document.querySelector('#mcisCPTCode').closest('table').querySelector('input').value = cptCode;
    document.querySelector('#mcisModifier1').closest('table').querySelector('input').value = modifier1;
    document.querySelector('#mcisBillingMatrixID').closest('table').querySelector('input').value = billingMatrixID;
    document.querySelector('#mcisEMLevel').closest('table').querySelector('input').value = emLevel;
  }catch(error){
    console.log(error);
  }
});
