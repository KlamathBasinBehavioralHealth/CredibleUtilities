let clientID = '200079';
let divID = 'getTest2';
const connectionString =
  "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0fJzvVosuMbg2B!gMCUWTrE";
let url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${connectionString}&start_date=&end_date=&custom_param1=${clientID}&custom_param2=${visitTypeID}&custom_param3=`;

function setURL(newConnectionString, newClientID, newDivID){
    url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newClientID}&custom_param2=${newVisitTypeID}&custom_param3=`;
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
        const cleanedXmlString = xmlString.replaceAll(/<string\b[^>]*>(?:.*?)|<\/string>|<\/string>|&lt;\/?Table&gt;|\n/g, '')
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

    if(recentVisitId !== undefined){
        console.log('Found something.');
    }
    else{
        console.log('It\'s empty.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
  getAnswer();
});
