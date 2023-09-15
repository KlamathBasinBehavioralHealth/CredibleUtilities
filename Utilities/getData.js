let clientID = '200079';
let visitTypeID = '922';
const connectionString =
  "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eo6Xujb93cLI0fLowwDKI2";
let url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${connectionString}&start_date=&end_date=&custom_param1=${clientID}&custom_param2=${visitTypeID}&custom_param3=`;

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