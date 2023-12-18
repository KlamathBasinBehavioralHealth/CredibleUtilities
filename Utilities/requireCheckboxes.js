function isChecked(question){
    let checked = false;
    question.closest('table').querySelectorAll('input').forEach((input) => {
      if(input.checked){
          checked = true;
      }
    });
    return checked;
  }
  
  function markUnansweredQuestion(question, mode = 'mark'){
    let newID = `unansweredQuestion${question.innerText.replace(/\s+/g, '')}`;
    if(mode === 'mark'){
      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', newID);
      newDiv.innerText = `Please select at least one option for '${question.innerText}'.`;
      newDiv.style.color = 'red';
      question.closest('table').closest('tr').after(newDiv);
    }else if(mode === 'unmark'){
      document.querySelector(`#${newID}`)?.remove();
    }
    return newID;
  }
  
  function setupRequireCheckboxes(){
    document.querySelector('form').addEventListener('submit', (event) => {
      let validated = true;
      
      document.querySelectorAll('.requireCheckbox').forEach((element) => {
        let unmarkedQuestionID = undefined;
        unmarkedQuestionID = markUnansweredQuestion(element, 'unmark');
        if(!isChecked(element)){
          validated = false;
          unmarkedQuestionID = markUnansweredQuestion(element, 'mark');
          document.querySelector(`#${unmarkedQuestionID}`)?.scrollIntoView();
        }
      });
      
      if(!validated){
        event.preventDefault();
        console.log('Checkboxs not answered!');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('input[name=Complete]').disabled){
      document.querySelector('input[name=Complete]').disabled = false;
    }
    setupRequireCheckboxes();
  });
  