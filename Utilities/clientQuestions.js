/***  ***/

function toggleExtraSpace(selector, hiddenBool){
    document.querySelectorAll(selector).forEach(item => {
      const element = item.closest('table').parentElement.parentElement.nextSibling.nextElementSibling;
      element.hidden = hiddenBool;
    });
  };

const qmhpCred = document.querySelector('#credentialQMHP').parentElement.parentElement.querySelector('input');
const qmhaCred = document.querySelector('#credentialQMHA').parentElement.parentElement.querySelector('input');
const clientPresent = document.querySelector('#presentClient').parentElement.parentElement.querySelector('input');
function clientPresentCheck(){
  if (clientPresent.checked){
    visibility("show", ".clientQuestion", true);
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
    visibility("hide", '.clientQuestion', true);
    toggleExtraSpace('.clientQuestion', true);
    visibility('show','objectivesAddressed', true);
    
    if(document.querySelector('#objectivesAddressed') != null){
      document.querySelector('#objectivesAddressed').closest('table').closest('tr').hidden = false;
    }
    visibility('show', 'dxInjection', true);
    if (document.querySelector('#skillsTraining') != null){
      document.querySelector('#skillsTraining').closest('tr').hidden = true;
    }
  }
  if(!(qmhpCred.checked)){
      visibility("hide", '.QMHPOnly', true);
  }
}

window.addEventListener('DOMContentLoaded', () => { 
  clientPresentCheck(); 
  if (!clientPresent.closest('table').querySelector('input').checked){
    clientPresent.closest('table').querySelector('input').click();
  }
  qmhaCred.addEventListener('change', function(){
        clientPresentCheck();
    });
  qmhpCred.addEventListener('change', function(){
        clientPresentCheck();
    });
  clientPresent.addEventListener('change', function(){
        clientPresentCheck();
    });
});
clientPresent.onchange = clientPresentCheck;
