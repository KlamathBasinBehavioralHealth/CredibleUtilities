let visitType; 
let data; 
let tempVisitID;
let currentIntervention;
let parsedString; 
let result;

if(typeof waitForElementInterval === 'undefined'){
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

function addResources(){
  return new Promise(resolve => {
    if(typeof visibility === 'undefined'){
      let script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities/Utilities/visibility.js';
      document.head.appendChild(script);
    }

    if(typeof X2JS === 'undefined'){
      let script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities/Utilities/x2js.js';
      document.head.appendChild(script);
    }

    resolve('Resolved.');
  });
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

function checkScope(){
  try{
    let target = [...document.querySelector('#withinTxPlan').closest('table').querySelectorAll('option')].filter(element => element.innerText.includes('No'))[0].value;
    if(document.querySelector('#withinTxPlan').closest('table').querySelector('select').value == target && !$('#serviceProvided').closest('table').find('#careNavigation').closest('tr').find('input').prop('checked')){
      console.log('Out of scope.');
      return true;
    }
    else{
      console.log('Not out of scope.');
      return false;
    }
  }catch(error){
    console.log(error);
  }
}

function reviewRedX(){
  if(checkScope()){
    removeRedX();
    addRedX('OUT OF SCOPE - AUTO');
  }
  else{
    removeRedX();
  }
}

async function startUp(){
  await addResources();
  console.log('Resources loaded.');
  await waitForElementInterval('document.querySelector(\'script[src=https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities/Utilities/visibility.js]\')');
  setTimeout(() => {
    visibility('hide', '.adminUse');
    reviewRedX();
    document.querySelector('#withinTxPlan').closest('table').querySelector('select').addEventListener('change', reviewRedX);
    document.querySelector('[name=Complete]').addEventListener('click', reviewRedX);
  }, 500);
}

startUp();

function getData(url) {
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((response) => response.text())
        .then((xmlString) => {
          const parser = new DOMParser();
          xmlString = xmlString.replaceAll(/<string\b[^>]*>(?:.*?)|<\/string>|<\/string>|&lt;\/?Table&gt;|\n/g, '').replaceAll(/\s+/g, ' ').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
          let xmlResult = parser.parseFromString(xmlString, "application/xml");
          resolve(xmlResult);
        })
        .catch((error) => {
          console.log(error);

          resolve("Could not fetch data.");
        });
    } catch (error) {
      console.log(error);

      resolve("Could not fetch data.");
    }
  });
}

async function getVisitType(){   
  $('#automationMessage').closest('table').find('input').prop('checked', false); 
  tempVisitID = window.parent.document.querySelector('frame[name=left]').contentDocument.querySelector('#visitId').value;
  try {      
    result = await getData(url);
    visitType = result.documentElement.querySelector('visittype').innerHTML;
  }catch(error){  
    console.log(error); 
    $('#automationMessage').closest('table').find('input').prop('checked', true); 
  } 
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
    removeRedX();
    switch(visitType){     
      case 'Care Navigation':             
        if(!$('#serviceProvided').closest('table').find('#careNavigation').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Care Navigation, but Care Navigation was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      case 'Case Management':              
        if(!$('#serviceProvided').closest('table').find('#caseManagement').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Case Management, but Case Management was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      case 'Skills Training':              
        if(!$('#serviceProvided').closest('table').find('#skillsTraining').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Skills Training, but Skills Training was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }    
        break;     
      case 'Test WIP':            
        if(!$('#serviceProvided').closest('table').find('#skillsTraining').closest('tr').find('input').prop('checked')){         
          addRedX(`Service type was set as Test WIP, but Skills Training was not checked under Interventions Provided. Service documented as ${currentIntervention}.`);       
        }     
        break;     
      default:       
           
    }
  }catch(error){
    console.log(error);
  } 
}