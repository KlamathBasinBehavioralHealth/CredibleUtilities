let clientID = '200079';
let visitTypeID = '922';
const connectionString =
  "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eo6Xujb93cLI0fLowwDKI2";
let url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${connectionString}&start_date=&end_date=&custom_param1=${clientID}&custom_param2=${visitTypeID}&custom_param3=`;

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