const templateBlock = '<strong>Level of Care:</strong> Pathway <div class=\'buttons\' style=\'display:inline;\'><button>1.0</button>/<button>2.0</button>/<button>3.0</button>/<button>4.0</button></div><br><br><strong>Client Participation:</strong> <div id=\'clientParticipation\' class=\'lineDiv\' style=\'display:inline;\'><div class=\'buttons\' style=\'display:inline;\'><button>Client</button>/<button>Client & family</button>/<button>Family</button></div> actively participated in the creation of this treatment plan to determine goals and services.</div><br><br><strong>Client Goal(s):</strong>&nbsp<br><br><strong>Treatment Objective(s):</strong>&nbsp<br><br><em>&nbsp;&nbsp;&nbsp;These objectives will be evidenced by the following:</em><ul><li></li><li></li><li></li><li></li><li></li></ul><strong>Services Planned:</strong>&nbsp<div id=\'lineTherapy\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Therapy</strong> <em>(provided by QMHP)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineTherapy\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Group Therapy</strong> <em>(provided by QMHP)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineCareNavigation\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Care Navigation</strong> <em>(provided by QMHA)</em>: An expected <div class=\'numbers\' style=\'display:inline;\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineCaseManagement\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Case Management</strong> <em>(provided by QMHA)</em>: An expected <div class=\'numbers\' style=\'display:inline;\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTraining\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Skills Training</strong> <em>(provided by QMHA)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'lineSkillsTrainingGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Skills Training Group</strong> <em>(provided by QMHA)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupport\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Peer Support</strong> <em>(provided by PSS)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><div id=\'linePeerSupportGroup\' class=\'lineDiv\' style=\'display:inline;\'><br><strong>Peer Support Group</strong> <em>(provided by PSS)</em>: An expected <div class=\'numbers\' style=\'display:inline\'><button>Click to Enter Number</button></div>x per <div class=\'buttons\' style=\'display:inline;\'><button>month</button>/<button>week</button></div>&nbsp<button class=\'clearLine\' style=\'color:white;background-color:red;\'>x</button></div><br><br><em>This treatment plan will be reviewed every 90 days.</em><br><br><em>See TIC Evaluation dated <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Date</button></div> by <div class=\'entry\' style=\'display:inline\'><button>Click to Enter Name</button></div>, <div class=\'entry\' style=\'display:inline\'><button>Click to Credential(s)</button></div>.</em>';

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
  if(!target.querySelector('.buttons, .numbers')){
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
        document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').value = 
          [...document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_ddlCategory').querySelectorAll('option')].filter((option) => {
            return option.innerText == 'Treatment Plan';
          })[0].value;
      }catch(error){
        console.log(error);  
      }
      
      txBody.innerHTML = templateBlock;
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
        
        var userInput = prompt("Enter a number:");
        
        var number = parseInt(userInput);
        
        if(userInput !== null){
          while(isNaN(number) && userInput !== null){
            alert("Number was not entered.");
            userInput = prompt("Enter a number:");
            number = parseInt(userInput);
          }
          
          if(userInput !== null){
            if(event.target.innerText === 'Click to Enter Number of Days'){
              replaceWithText(` ${number}`, event.target.parentNode);
            }else{
              replaceWithText(`${number}`, event.target.parentNode);
            }
            if(checkToComplete){
              completeLine(parent);
            }
          }
        }
      });
    });

    [...txBody.querySelectorAll('.entry')].forEach((element) => {
      element.addEventListener('click', (event) => {
        var userInput = prompt(`${event.target.innerText}:`);
    
        if(userInput !== null){
          
          if(userInput !== null){
            replaceWithText(`${userInput}`, event.target.parentNode);
          }
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
  
  document.querySelector('#txPlanModule').contentDocument.querySelector('input[type=submit]').addEventListener('click', (event) => {
    if(txBody.querySelector('.buttons, .numbers')){
      console.log('Do it.');
      event.preventDefault();
      alert('Please complete all fields or delete service lines that are not use via the X button.');
    }else{
      console.log('This is empty!');
    }
  });
}