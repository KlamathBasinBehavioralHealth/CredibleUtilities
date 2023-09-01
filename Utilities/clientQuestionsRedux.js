/***  ***/

function toggleExtraSpace(selector, hiddenBool){
    document.querySelectorAll(selector).forEach(item => {
      const element = item.closest('table').parentElement.parentElement.nextSibling.nextElementSibling;
      element.hidden = hiddenBool;
    });
  };

function checkAllowClientQuestions(){
  let check = false;
  [...document.querySelectorAll('.allowClientQuestions')].forEach((element) => {
    if(element.closest('tr').querySelector('input').checked){
      check = true;
    }
  });
  return check;
}

function clientPresentCheck(){
  if (checkAllowClientQuestions()){
    hideShow("show", "clientQuestion", true);
    toggleExtraSpace(".clientQuestion", false);
    if (document.querySelector('#skillsTraining') != null){
      document.querySelector('#skillsTraining').closest('tr').hidden = false;
    }
    if (document.querySelector('#subAddNotes') != null){
      const subAddNotes = document.querySelector('#subAddNotes');
      subAddNotes.closest('tr').querySelector('input').required = false;
      subAddNotes.closest('tr').querySelector('.redAsterisk').remove();
    }
  }
  else{
    hideShow("hide", 'clientQuestion', true);
    toggleExtraSpace('.clientQuestion', true);
    hideShow('show','objectivesAddressed', true);
    
    if(document.querySelector('#objectivesAddressed') != null){
      document.querySelector('#objectivesAddressed').closest('table').closest('tr').hidden = false;
    }
    hideShow('show', 'dxInjection', true);
    if (document.querySelector('#skillsTraining') != null){
      document.querySelector('#skillsTraining').closest('tr').hidden = true;
    }
  }
}
window.addEventListener('DOMContentLoaded', () => { 
  clientPresentCheck(); 

  let clientPresent = [...document.querySelectorAll('.allowClientQuestions')].filter((element) => {
    return element.innerText.includes('Client');
  })[0];

  if (!clientPresent.closest('table').querySelector('input').checked){
    clientPresent.closest('table').querySelector('input').click();
  }
});

[...document.querySelectorAll('.allowClientQuestions')].forEach((element) => {
  element.closest('tr').querySelector('input').onchange = clientPresentCheck;
});