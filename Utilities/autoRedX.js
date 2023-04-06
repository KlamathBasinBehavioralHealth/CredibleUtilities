let visitType; 
let data; 
let tempVisitID; 
let currentIntervention;
let parsedString;

if(typeof visibilty != 'function'){
    window.include = function (file){
      var script = document.createElement('script');
      script.src = file;
      script.type = 'text/javascript';
      script.defer = true;
        
      document.getElementsByTagName('head').item(0).appendChild(script);
    }
  
    include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities/Utilities/visibility.js');
}

if(typeof xlm2js != 'function'){
    window.include = function (file){
      var script = document.createElement('script');
      script.src = file;
      script.type = 'text/javascript';
      script.defer = true;
        
      document.getElementsByTagName('head').item(0).appendChild(script);
    }
  
    include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities/Utilities/x2js.js');
}

if(typeof waitForElementInterval != 'function'){
  function waitForElementInterval (target, interval = 500){   
    return new Promise((resolve) => {     
      let currentInterval = setInterval(function(){         
        if(target?.length){           
          clearInterval(currentInterval);           
          resolve(`${target} exists.`);         
        }     
      }, interval);   
    }); 
  }  
}

async function getVisitType(){   
  $('#automationMessage').closest('table').find('input').prop('checked', false); 
  try {      
    await waitForElementInterval(window.parent[0].$('input[id=visitId]').val());     
    tempVisitID = window.parent[0].$('input[id=visitId]').val();     
    data = $.getJSON(`https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eaKmY5yrn8bybVnZc2VMjJ&start_date=&end_date=&custom_param1=${tempVisitID}&custom_param2=&custom_param3=`);
    try{
        parsedString = response.data.replace('<string xmlns="https://www.crediblebh.com/">', '').replace('</string>', '');
        parsedString = parsedString.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('<Table>', '').replaceAll('</Table>', '')parsedString.replaceAll('\\"', '"').replaceAll('\r', '').replaceAll('\n', '');
      let xmlJS = new X2JS();
      let convertedJSON = xmlJS.xml2js(parsedString);
      visitType = convertedJSON.NewDataSet.visittype;
    }catch(error){
      console.log(error);
      visitType = 'Test';
    }
  }catch(error){  
    console.log(error); 
    try{
      console.log(data.status);
    }catch(error){
      console.log(error);
    }
    $('#automationMessage').closest('table').find('input').prop('checked', true); 
  } 
}

function addRedX(note){   
  $('#approval').closest('table').find('input').val('0');   
  $('#redX').closest('table').find('input').val('1');   
  $('#redXNote').closest('table').find('input').val(note); 
}  

function removeRedX(){   
  $('#approval').closest('table').find('input').val('');   
  $('#redX').closest('table').find('input').val('');   
  $('#redXNote').closest('table').find('input').val('');  
}  

function checkInterventions(){   
  if($('#serviceProvided').closest('table').find('#careNavigation').closest('tr').find('input').prop('checked')){     
    currentIntervention = 'Care Navigation';  
  }else if($('#serviceProvided').closest('table').find('#caseManagement').closest('tr').find('input').prop('checked')){     
    currentIntervention = 'Case Management';  
  }else if($('#serviceProvided').closest('table').find('#skillsTraining').closest('tr').find('input').prop('checked')){     
    currentIntervention = 'Skills Training';   
  }    
  
  try{
    switch(visitType){     
      case 'Care Navigation':       
        removeRedX();       
        if(!$('#serviceProvided').closest('table').find('#careNavigation').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Care Navigation, but Care Navigation was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      case 'Case Management':       
        removeRedX();       
        if(!$('#serviceProvided').closest('table').find('#caseManagement').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Case Management, but Case Management was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      case 'Skills Training':       
        removeRedX();       
        if(!$('#serviceProvided').closest('table').find('#skillsTraining').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Skills Training, but Skills Training was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }    
        break;     
      case 'Test WIP':       
        removeRedX();       
        if(!$('#serviceProvided').closest('table').find('#skillsTraining').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Test WIP, but Skills Training was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      default:       
        removeRedX();   
    }
  }catch(error){
    console.log(error);
  } 
}  

$('document').ready(function(){ 
  getVisitType(); 
});  

$('document').ready(function (){   
  visibility('hide', '.adminUse');   
  checkInterventions();      
  $('#serviceProvided').closest('table').find('input').change(checkInterventions); 
});

async function checkScope(){
  let target = [...document.querySelector('#withinTxPlan').closest('table').querySelectorAll('option')].filter(element => element.innerText.includes('No'))[0].value;
  if(document.querySelector('#withinTxPlan').closest('table').querySelector('select').value == target){
    console.log('Out of scope.');
  }
  else{
    console.log('Not out of scope.');
  }
}