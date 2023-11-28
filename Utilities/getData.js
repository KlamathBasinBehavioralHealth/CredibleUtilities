const connectionString =
  "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eo6Xujb93cLI0fLowwDKI2";

  const defaultMode = 'visit';

  function setURL(newConnectionString, newClientID, newDivID, newMode = defaultMode){
  url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newClientID}&custom_param2=${newDivID}&custom_param3=${newMode}`;
}

const connectionString2 =
  "oCvUCZJCI!ExsUFMSM3US3ODuss0!MTmamK3bps9-Rt1a6C1KwvBUgHwlwVgSYJo";

function setURL2(newConnectionString, newTempVisitID, newDivID){
  url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newTempVisitID}&custom_param2=${newDivID}&custom_param3=`;
}

function getClientID(){
  let clientID = undefined;
  try{
    clientID = (new URL(frameElement.src)).searchParams.get('client_id');
  }catch(error){
    console.log(error);    
  }
  
  if(clientID == undefined){
    try{
      clientID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#client_id').value;
    }catch(error){
      console.log(error);
    }
  }

  if(clientID == undefined){
    clientID = '200079';
  }
  return clientID;
}

function getTempVisitID(){
  let tempVisitID = undefined;
  
  if(tempVisitID == undefined){
    try{
      tempVisitID = parent.document.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
    }catch(error){
      console.log(error);
    }
  }

  if(tempVisitID == undefined){
    tempVisitID = '99999999';
  }
  return tempVisitID;
}

function getData(url) {
  return new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
          return resolve("Could not fetch data.");
        }

        const xmlString = await response.text();
    
        const parser = new DOMParser();
        const cleanedXmlString = xmlString.replaceAll(/<string\b[^>]*>(?:.*?)|<\/string>|<\/string>|\n/g, '')
            .replaceAll(/\s+/g, ' ')
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>');
        
        const xmlResult = parser.parseFromString(cleanedXmlString, "application/xml");

        return resolve(xmlResult);
    } catch (error) {
      console.log(error);

      resolve("Could not fetch data.");
    }
  });
}

let thing = undefined;

async function loadMostRecentAnswer(clientID, divID, mode = defaultMode){
  setURL(connectionString, clientID, divID, mode);
  try{
    let result = await getData(url);
    thing = result;
    let questionType = result.documentElement.querySelector('question_format').innerHTML;
    let answerIDType = result.documentElement.querySelector('answer_id').innerHTML;
    let visitType = result.documentElement.querySelector('visittype').innerHTML;
    let timeDate = result.documentElement.querySelector('rev_timein').innerHTML;
    switch(questionType){
      case 'CB':
      case 'RB':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].filter((element) => {
            return element.innerHTML.includes(answer);
          })[0].querySelector('input').checked = true;
        });
      break;
      case 'CAL':
      case 'TXT':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          document.querySelector(`#${divID}`).closest('table').querySelector('input').value = answer;
        });
      break;
      case 'DD':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          let answerID = table.querySelector('answer_id').innerHTML;
          let optionValue = undefined;
          if(answerID !== '0'){
            optionValue = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('option')].filter((option) => {
              return option.innerText === answer;
            })[0]?.value;
          }else{
            optionValue = answer;
          }
          document.querySelector(`#${divID}`).closest('table').querySelector('select').value = optionValue;
        });
      break;
      case 'NLC':
        try{
          let answer = result.documentElement.querySelector('answer').innerHTML;
          if(answer){
            if(!document.querySelector(`#${divID}`).closest('table').querySelector('input').checked){
              document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
            }
          }
        }catch(error){
          console.log(error);
          if(document.querySelector(`#${divID}`).closest('table').querySelector('input').checked){
            document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
          }
        }
      break;
      case 'PB':
        try{
          let answer = result.documentElement.querySelector('answer').innerHTML;
          let target = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('input:not([type=hidden])')].filter((input) => {
            return input.value == answer;
          })[0];
          if(target.style.backgroundColor == 'white' || target.style.backgroundColor == 'rgb(255, 255, 255)'){
            target.click();
          }
        }catch(error){
          console.log(error);
        }
      break;
      default:
        console.log('WHO AM I?!!!');
    }
  }catch(error){
    console.log(error);
  }
}

async function loadTempVisitAnswer(tempVisitID, divID){
  setURL(connectionString2, tempVisitID, divID);
  try{
    let result = await getData(url);
    thing = result;
    let questionType = result.documentElement.querySelector('question_format').innerHTML;
    
    switch(questionType){
      case 'CB':
      case 'RB':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].filter((element) => {
            return element.innerHTML.includes(answer);
          })[0].querySelector('input').checked = true;
        });
      break;
      case 'CAL':
      case 'TXT':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          document.querySelector(`#${divID}`).closest('table').querySelector('input').value = answer;
        });
      break;
      case 'DD':
        [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
          let answer = table.querySelector('answer').innerHTML;
          let answerID = table.querySelector('answer_id').innerHTML;
          let optionValue = undefined;
          if(answerID !== '0'){
            optionValue = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('option')].filter((option) => {
              return option.innerText === answer;
            })[0]?.value;
          }else{
            optionValue = answer;
          }
          document.querySelector(`#${divID}`).closest('table').querySelector('select').value = optionValue;
        });
      break;
      case 'NLC':
        try{
          let answer = result.documentElement.querySelector('answer').innerHTML;
          if(answer){
            if(!document.querySelector(`#${divID}`).closest('table').querySelector('input').checked){
              document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
            }
          }
        }catch(error){
          console.log(error);
          if(document.querySelector(`#${divID}`).closest('table').querySelector('input').checked){
            document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
          }
        }
      break;
      case 'PB':
        try{
          let answer = result.documentElement.querySelector('answer').innerHTML;
          let target = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('input:not([type=hidden])')].filter((input) => {
            return input.value == answer;
          })[0];
          if(target.style.backgroundColor == 'white' || target.style.backgroundColor == 'rgb(255, 255, 255)'){
            target.click();
          }
        }catch(error){
          console.log(error);
        }
      break;
      default:
        console.log('WHO AM I?!!!');
    }
  }catch(error){
    console.log(error);
  }
}

function loadMostRecentQuestions(clientID, tempVisitID){
  document.querySelectorAll('.loadPreviousAnswer').forEach((question) => {
    let divID = question.getAttribute('id');
    let mode = undefined; 
    try{
      mode = question.getAttribute('mode');
    }catch(error){
      mode = defaultMode;
    }

    loadMostRecentAnswer(clientID, divID, mode);
  });

  document.querySelectorAll('.loadTempVisitAnswer').forEach((question) => {
    let divID = question.getAttribute('id');

    loadTempVisitAnswer(tempVisitID, divID);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let clientID = getClientID();
  let tempVisitID = getTempVisitID();
  loadMostRecentQuestions(clientID, tempVisitID);
});