let clientID = '200079';
let divID = 'getTest2';
const connectionString =
  "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eo6Xujb93cLI0fLowwDKI2";
let url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${connectionString}&start_date=&end_date=&custom_param1=${clientID}&custom_param2=${divID}&custom_param3=`;

function setURL(newConnectionString, newClientID, newDivID){
    url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newClientID}&custom_param2=${newDivID}&custom_param3=`;
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

let anotherOne = undefined;

async function getAnswer(){
    
    let result = await getData(url);
    try{
        anotherOne = result;
    }catch(error){
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  getAnswer();
});

let thing = undefined;

async function loadMostRecentQuestion(clientID, divID){
  setURL(connectionString, clientID, divID);
  try{
      let result = await getData(url);
      thing = result;
      let questionType = result.documentElement.querySelector('question_format').innerHTML;
      let answerIDType = result.documentElement.querySelector('answer_id').innerHTML;
      switch(questionType){
        case 'CB':
          [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
            let answer = table.querySelector('answer').innerHTML;
            [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].filter((element) => {
              return element.innerHTML.includes(answer);
            })[0].querySelector('input').checked = true;
          });
        break;
        case 'TXT':
          [...thing.documentElement.querySelectorAll('Table')].forEach((table) => {
            let answer = table.querySelector('answer').innerHTML;
            document.querySelector(`#${divID}`).closest('table').querySelector('input').value = answer;
          });
        break;
        case 'DD':
          [...thing.documentElement.querySelectorAll('Table')].forEach((table) => {
            let answer = table.querySelector('answer').innerHTML;
            let answerID = table.querySelector('answer').innerHTML;
            let optionValue = undefined;
            if(answerID !== '0'){
              optionValue = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('option')].filter((option) => {
                return option.innerText === answer;
              })[0].value;
            }else{
              optionValue = answer;
            }
            document.querySelector(`#${divID}`).closest('table').querySelector('select').value = optionValue;
          });
        break;
        default:

      }

      
  }catch(error){
    console.log(error);
  }
    
}