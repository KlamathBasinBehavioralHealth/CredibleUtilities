const connectionString =
    "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0eo6Xujb93cLI0fLowwDKI2";

const defaultMode = 'visit';
const defaultOverride = 'false';

let url = undefined;

function setURL(newConnectionString, newClientID, newDivID, newMode = defaultMode) {
    url = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newClientID}&custom_param2=${newDivID}&custom_param3=${newMode}`;
}

const connectionString2 =
    "LYEC1uwvr-7RAoxbT4TJDuiO!gY1p8-aFVdERsxbI0e3B61Hq5F3g0xNL8B0Lbul";

let url2 = undefined;

function setURL2(newConnectionString, newTempVisitID, newDivID) {
    url2 = `https://cors-everywhere.azurewebsites.net/reportservices.crediblebh.com/reports/ExportService.asmx/ExportXML?connection=${newConnectionString}&start_date=&end_date=&custom_param1=${newTempVisitID}&custom_param2=${newDivID}&custom_param3=`;
}

function getClientID() {
    let clientID = undefined;
    try {
        clientID = window.top.document.querySelector('frame[name=main]').contentDocument.querySelector('frame[id=left]').contentDocument.querySelector('input[id=client_id]').value;
    } catch (error) {
        console.log(error);
        try {
            clientID = window.top.document.querySelector('frame[name=left]').contentDocument.querySelector('input[id=client_id]').value;
        } catch (error) {
            console.log(error);
            clientID = '200079'
        }
    }

    if (clientID == undefined) {
        clientID = '200079';
    }
    return clientID;
}

function getTempVisitID() {
    let tempVisitID = undefined;

    try {
        tempVisitID = window.top.document.querySelector('frame[name=main]').contentDocument.querySelector('frame[id=left]').contentDocument.querySelector('#visittemp_ids').value;
    } catch (error) {
        console.log(error);
        try {
            tempVisitID = window.top.document.querySelector('frame[name=left]').contentDocument.querySelector('#visittemp_ids').value;
        } catch (error) {
            console.log(error);
            tempVisitID = '200079'
        }
    }

    if (tempVisitID == undefined) {
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

async function loadMostRecentAnswer(clientID, divID, mode = defaultMode, override = defaultOverride) {
    setURL(connectionString, clientID, divID, mode);
    try {
        let result = await getData(url);
        thing = result;
        let questionType = result.documentElement.querySelector('question_format').innerHTML;
        let answerIDType = result.documentElement.querySelector('answer_id').innerHTML;
        let visitType = result.documentElement.querySelector('visittype').innerHTML;
        let timeDate = result.documentElement.querySelector('rev_timein').innerHTML;
        let alreadyAnswered = false;
        switch (questionType) {
            case 'CB':
                let answers = [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')];
                for(let i = 0; i < answers.length; i++){
                    let answer = answers[i];
                    if (answer.querySelector('input').checked) {
                        alreadyAnswered = true;
                        break;
                    }
                });
                if (override == 'false' & !alreadyAnswered) {
                    [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
                        let answer = table.querySelector('answer').innerHTML;
                        [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].filter((element) => {
                            return element.innerHTML.includes(answer);
                        })[0].querySelector('input').checked = true;
                    });
                }
            case 'RB':
                [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].forEach((answer) => {
                    if (answer.querySelector('input').checked) {
                        alreadyAnswered = true;
                    }
                });
                if (override == 'false' & !alreadyAnswered) {
                    [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
                        let answer = table.querySelector('answer').innerHTML;
                        [...document.querySelector(`#${divID}`).closest('tbody').querySelector('tbody').querySelectorAll('tr')].filter((element) => {
                            return element.innerHTML.includes(answer);
                        })[0].querySelector('input').checked = true;
                    });
                }
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
                    if (answerID !== '0') {
                        optionValue = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('option')].filter((option) => {
                            return option.innerText === answer;
                        })[0]?.value;
                    } else {
                        optionValue = answer;
                    }
                    document.querySelector(`#${divID}`).closest('table').querySelector('select').value = optionValue;
                });
                break;
            case 'NLC':
                try {
                    let answer = result.documentElement.querySelector('answer').innerHTML;
                    if (answer) {
                        if (!document.querySelector(`#${divID}`).closest('table').querySelector('input').checked) {
                            document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
                        }
                    }
                } catch (error) {
                    console.log(error);
                    if (document.querySelector(`#${divID}`).closest('table').querySelector('input').checked) {
                        document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
                    }
                }
                break;
            case 'PB':
                try {
                    let answer = result.documentElement.querySelector('answer').innerHTML;
                    let target = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('input:not([type=hidden])')].filter((input) => {
                        return input.value == answer;
                    })[0];
                    if (target.style.backgroundColor == 'white' || target.style.backgroundColor == 'rgb(255, 255, 255)') {
                        target.click();
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                console.log('WHO AM I?!!!');
        }

    } catch (error) {
        console.log(error);
    }
}

function scrubAnswer(answer) {
    var entityRegex = /&amp;lt;|&lt;|&amp;gt;|&gt;|&amp;\/|&\//g;

    var result = answer.replace(entityRegex, function(match) {
        switch (match) {
            case "&amp;lt;":
                return "<";
            case "&lt;":
                return "<";
            case "&amp;gt;":
                return ">";
            case "&gt;":
                return ">";
            case "&amp;/":
                return "/";
            case "&/":
                return "/";
            default:
                return match;
        }
    });

    return result;
}

function extractInnerText(string) {
    var tempDiv = document.createElement('div');

    tempDiv.innerHTML = string;

    var innerText = tempDiv.innerText;

    tempDiv.remove();

    return innerText;
}

async function loadTempVisitAnswer(tempVisitID, divID) {
    setURL2(connectionString2, tempVisitID, divID);
    try {
        let result = await getData(url2);
        thing = result;
        let questionType = result.documentElement.querySelector('question_format').innerHTML;

        switch (questionType) {
            case 'CB':
            case 'RB':
                [...result.documentElement.querySelectorAll('Table')].forEach((table) => {
                    let answer = table.querySelector('answer').innerHTML;
                    answer = scrubAnswer(answer);
                    answer = extractInnerText(answer);
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
                    if (answerID !== '0') {
                        optionValue = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('option')].filter((option) => {
                            return option.innerText === answer;
                        })[0]?.value;
                    } else {
                        optionValue = answer;
                    }
                    document.querySelector(`#${divID}`).closest('table').querySelector('select').value = optionValue;
                });
                break;
            case 'NLC':
                try {
                    let answer = result.documentElement.querySelector('answer').innerHTML;
                    if (answer) {
                        if (!document.querySelector(`#${divID}`).closest('table').querySelector('input').checked) {
                            document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
                        }
                    }
                } catch (error) {
                    console.log(error);
                    if (document.querySelector(`#${divID}`).closest('table').querySelector('input').checked) {
                        document.querySelector(`#${divID}`).closest('table').querySelector('input').click();
                    }
                }
                break;
            case 'PB':
                try {
                    let answer = result.documentElement.querySelector('answer').innerHTML;
                    let target = [...document.querySelector(`#${divID}`).closest('table').querySelectorAll('input:not([type=hidden])')].filter((input) => {
                        return input.value == answer;
                    })[0];
                    if (target.style.backgroundColor == 'white' || target.style.backgroundColor == 'rgb(255, 255, 255)') {
                        target.click();
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                console.log('WHO AM I?!!!');
        }
    } catch (error) {
        console.log(error);
    }
}



function loadMostRecentQuestions(clientID, tempVisitID) {
    document.querySelectorAll('.loadPreviousAnswer').forEach((question) => {
        let divID = question.getAttribute('id');
        let mode = undefined;
        let override = undefined;
        try {
            mode = question.getAttribute('mode') || defaultMode;
            override = question.getAttribute('override') || defaultOverride;
        } catch (error) {
            mode = defaultMode;
            override = defaultOverride;
        }

        loadMostRecentAnswer(clientID, divID, mode, override);
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
