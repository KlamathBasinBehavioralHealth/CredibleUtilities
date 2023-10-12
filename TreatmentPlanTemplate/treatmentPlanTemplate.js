const templateBlock = '<strong>Level of Care</strong> <br>Pathway <div class=\'buttons\' style=\'display:inline;\'><button>1</button>/<button>2</button>/<button>3</button>/<button>4</button></div><br><br><strong>Client Goals</strong>&nbsp<br><em>Client would like to:</em><ul><li></li><li></li><li></li><li></li><li></li></ul><strong>Treatment Objectives</strong>&nbsp<br><em>These goals will be evidenced by the following objectives:</em><ul><li></li><li></li><li></li><li></li><li></li></ul><strong>Services Planned</strong>&nbsp<div id=\'lineTherapy\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Therapy</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineTherapyGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Group Therapy</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineCaseManagement\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Case Management</em></strong> An expected <div class=\'numbers\' style=\'display:inline;\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTraining\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Skills Training</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTrainingGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Skills Training Group</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupport\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Peer Support</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupportGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Peer Support Group</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineHealthcareNavigationSkillsTraining\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Healthcare Navigation Skills Training</em></strong> An expected 1x&nbsp<div class=\'checkLine\' style=\'display:inline;\'><button style=\'color:white;background-color:limegreen;\'>&check;</button></div> <button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><br><br><strong>Client Participation</strong>&nbsp<br><div id=\'clientParticipation\' class=\'lineDiv\' style=\'display:inline;\'><div class=\'buttons\' style=\'display:inline;\'><button>Client</button>/<button>Client & family</button>/<button>Family</button></div> actively participated in the creation of this treatment plan to determine goals and services.</div><br><br><em>This treatment plan will be reviewed every 90 days.</em><br><br><em><div id=\'seeTIC\' class=\'lineDiv\' style=\'display:inline;\'>See TIC Evaluation dated <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Date</button></div> by <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Name</button></div>, <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Credential(s)</button></div>.</div></em>';

const crisisTemplateBlock = '<strong>Level of Care</strong> <br>Crisis<br><br><strong>Client Goals</strong>&nbsp<br><em>Client would like to:</em><ul><li></li><li></li><li></li><li></li><li></li></ul><strong>Treatment Objectives</strong>&nbsp<br><em>These goals will be evidenced by the following objectives:</em><ul><li></li><li></li><li></li><li></li><li></li></ul><strong>Services Planned</strong>&nbsp<div id=\'lineTherapy\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Therapy</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineTherapyGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Group Therapy</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineCaseManagement\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Case Management</em></strong> An expected <div class=\'numbers\' style=\'display:inline;\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTraining\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Skills Training</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTrainingGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Skills Training Group</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupport\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Peer Support</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupportGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong><em>Peer Support Group</em></strong> An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><br><br><strong>Client Participation</strong>&nbsp<br><div id=\'clientParticipation\' class=\'lineDiv\' style=\'display:inline;\'><div class=\'buttons\' style=\'display:inline;\'><button>Client</button>/<button>Client & family</button>/<button>Family</button></div> actively participated in the creation of this treatment plan to determine goals and services.</div><br><br><em>This treatment plan will be reviewed every 30 days.</em><br><br><em><div id=\'seeTIC\' class=\'lineDiv\' style=\'display:inline;\'>See Crisis Assessment dated <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Date</button></div> by <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Name</button></div>, <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Credential(s)</button></div>.</div></em>';

if(typeof waitForElementInterval !== 'function'){
  function waitForElementInterval (target, maxAttempts = null, interval = 500){
    return new Promise((resolve, reject) => {
      let currentAttempt = 0;
      let currentInterval = setInterval(function(){
        try{
          if(target !== null && target !== undefined){
            clearInterval(currentInterval);
            return resolve(target);
          }else{
            if(maxAttempts !== null && maxAttempts !== undefined){
              console.log(`Attempt ${currentAttempt + 1} out of ${maxAttempts}.`);
              if(currentAttempt >= maxAttempts - 1){
                clearInterval(currentInterval);
                return reject('Not found.');
              }
              else{
                currentAttempt++;
              }
            }
          }
        }catch(error){
          console.log(error);
        }
      }, interval);
    });
  }
}

$('#txPlanModule').load(async () => {
  console.log('Tx plan iFrame load event.');
  
  lookForBlankTxPlan();
});

function replaceWithText(text, node){
  let textNode = document.createTextNode(text);
  let myDiv = node;
  let parent = node.parentNode;
  parent.replaceChild(textNode, myDiv);
}

function cleanUp(html){
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  const divElements = tempElement.querySelectorAll('div');
  for (let i = 0; i < divElements.length; i++) {
    const divElement = divElements[i];
    divElement.parentNode.removeChild(divElement);
  }

  return tempElement.innerHTML;
}

function completeLine(target){
  if(!target.querySelector('.buttons, .numbers, .entry, .checkLine')){
    try{
        target.querySelector('.clearLine').remove();
    }catch(error){
        console.log(error);
    }
    
    target.outerHTML = target.innerHTML;
  }
}

function clearLine(button){
  button.parentNode.remove();
}

try{
  let program;
}catch(error){
  console.log(error);
}


async function lookForBlankTxPlan(){
  let txModule = document.querySelector('#txPlanModule').contentDocument.querySelector('[name=\'ctl00$cph$txtGoals\']');
  await waitForElementInterval(txModule);
  console.log('Tx plan module detected.');
  await waitForElementInterval(txModule.closest('tr').querySelector('iframe').contentDocument.querySelector('body'));
  setTimeout(() => {
    try{
        console.log(txModule.closest('tr').querySelector('iframe').contentDocument.querySelector('body').innerText);
    }catch(error){
        console.log(error);
    }
  }, 500);
  let txBody = txModule.closest('tr').querySelector('iframe').contentDocument.querySelector('body');
  
  try{    
    if(!txBody.innerText){
      console.log('Here lies a blank Tx plan.');
      
      try{
        program = parent.parent.document.querySelector('#left').contentDocument.querySelector('#programId').value;
      }catch(error){
        program = 'Ah beans';
      }

      let dayTreatment = '96';
      let crisis = '117';
      let crisisAssessment = 'Crisis Assessment & Plan';

      if(program != dayTreatment){
        if(program == crisis || document.querySelector('h1').innerText == crisisAssessment){
          try{
            let today = new Date();
            let formattedToday = `${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}/${today.getDate() < 10 ? '0' : ''}${today.getDate()}/${today.getFullYear()}`;
            let nextYear = new Date();
            nextYear.setDate(today.getDate() + 30);
            let formattedNextYear = `${nextYear.getMonth() < 9 ? '0' : ''}${nextYear.getMonth() + 1}/${nextYear.getDate() < 10 ? '0' : ''}${nextYear.getDate()}/${nextYear.getFullYear()}`;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_txtStartDate').value = formattedToday;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_txtEndDate').value = formattedNextYear;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').value = 
              [...document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').querySelectorAll('option')].filter((option) => {
                return option.innerText == 'Treatment Plan';
              })[0].value;
          }catch(error){
            console.log(error);  
          }
          
          txBody.innerHTML = crisisTemplateBlock;
        }
        else{
          try{ 
            let today = new Date();
            let formattedToday = `${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}/${today.getDate() < 10 ? '0' : ''}${today.getDate()}/${today.getFullYear()}`;
            let nextYear = new Date();
            nextYear.setDate(today.getDate() + 365);
            let formattedNextYear = `${nextYear.getMonth() < 9 ? '0' : ''}${nextYear.getMonth() + 1}/${nextYear.getDate() < 10 ? '0' : ''}${nextYear.getDate()}/${nextYear.getFullYear()}`;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_txtStartDate').value = formattedToday;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_txtEndDate').value = formattedNextYear;

            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').value = 
              [...document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').querySelectorAll('option')].filter((option) => {
                return option.innerText == 'Treatment Plan';
              })[0].value;
          }catch(error){
            console.log(error);  
          }
          
          txBody.innerHTML = templateBlock;
        }
      }
    }
    
    [...txBody.querySelectorAll('.buttons')].forEach((element) => {
      element.addEventListener('click', (event) => {
        let checkToComplete = false;
        let parent = event.target.parentNode.parentNode;
        if(parent.className = 'lineDiv'){
          checkToComplete = true;
        }
        replaceWithText(event.target.innerText, event.target.parentNode);
        if(checkToComplete){
          completeLine(parent);
        }
      });
      
    });
    
    [...txBody.querySelectorAll('.numbers')].forEach((element) => {
      element.addEventListener('click', (event) => {
        let checkToComplete = false;
        let parent = event.target.parentNode.parentNode;
        if(parent.className = 'lineDiv'){
          checkToComplete = true;
        }
        
        var userInput = prompt('Enter a number:');
        
        var number = parseInt(userInput);
        
        if(userInput !== null){
          while(isNaN(number) && userInput !== null){
            alert('Number was not entered.');
            userInput = prompt('Enter a number:');
            number = parseInt(userInput);
          }
          
          if(userInput !== null){
            replaceWithText(`${number}`, event.target.parentNode);
            
            if(checkToComplete){
              completeLine(parent);
            }
          }
        }
      });
    });

    [...txBody.querySelectorAll('.entry')].forEach((element) => {
      element.addEventListener('click', (event) => {
        let checkToComplete = false;
        let parent = event.target.parentNode.parentNode;
        if(parent.className = 'lineDiv'){
          checkToComplete = true;
        }

        var userInput = prompt(`${event.target.innerText}:`);
    ``
        if(userInput !== null){
          while(userInput === '' && userInput !== null){
            alert('Nothing entered.');
            userInput = prompt(`${event.target.innerText}:`);
          }
          if(userInput !== null){
            replaceWithText(`${userInput}`, event.target.parentNode);

            if(checkToComplete){
              completeLine(parent);
            }
          }
        }
      });
    });

    [...txBody.querySelectorAll('.checkLine')].forEach((element) => {
      element.addEventListener('click', (event) => {
        let checkToComplete = false;
        let parent = event.target.parentNode.parentNode;
        if(parent.className = 'lineDiv'){
          checkToComplete = true;
        }
        if(checkToComplete){
          element.remove();
          completeLine(parent);
        }
      });
    });
    
    [...txBody.querySelectorAll('.clearLine')].forEach((element) => {
      element.addEventListener('click', (event) => {
        clearLine(event.target);
      });
    });
  }    
  catch(error){
    console.log(error);
  }

  /*document.querySelector('#txPlanModule').contentDocument.querySelector('input[type=submit]').addEventListener('click', (event) => {
    if(txBody.querySelector('.buttons, .numbers, .entry')){
      event.preventDefault();
      alert('Please complete all fields or delete service lines that are not use via the X button.');
    }else{
      console.log('This is empty!');
    }
  });*/
  restoreTemplateValidator();
}

function templateValidator(event){
  if(document.querySelector('#txPlanModule').contentDocument.querySelector('[name=\'ctl00$cph$txtGoals\']').closest('tr').querySelector('iframe').contentDocument.querySelector('body').querySelector('.buttons, .numbers, .entry, .checkLine')){
    event.preventDefault();
    alert('Please complete all fields or delete service lines that are not use via the X button.');
  }else{
    console.log('This is empty!');
  }
}

function overrideTemplateValidator(){
  document.querySelector('#txPlanModule').contentDocument.querySelector('input[type=submit]').removeEventListener('click', templateValidator);
}

function restoreTemplateValidator(){
  document.querySelector('#txPlanModule').contentDocument.querySelector('input[type=submit]').addEventListener('click', templateValidator);
}