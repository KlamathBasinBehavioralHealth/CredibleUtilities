let clientAge = null;
var dla20QuestionCount = 0;
var dla20Score = 0;

function checkAge(){
  try{
    clientAge = $('tr').has('div[id=dla20ClientAge]').find('font').text();
    console.log(clientAge);
  } catch(error){
    console.log(error);
    clientAge = 18;
  }

  if(clientAge < 6  && clientAge != ' '){
    visibility('hide', '.dla20Q', false);
    visibility('hide', '#dla20A', false);
  }
  else{
    visibility('show', '.dla20Q', true);
    visibility('show', '#dla20A', false);
  }

  visibility('hide', '#dla20ClientAge');
}

function checkNA(){
  if($('#dla20NA').closest('table').find('input').prop('checked')){
    visibility('hide', '.dla20Q', false);
    visibility('hide', '#dla20A', false);
  }
  else{
    if(clientAge >= 6){
      visibility('show', '.dla20Q', true);
      visibility('show', '#dla20A', false);
    }
  }
}

function questionCountError(element) {
  const err = document.createElement('p');
  err.className = 'errMsg';
  err.innerHTML = 'At least 13 questions must be answered';
  err.style.color = 'red';
  if (dla20QuestionCount >= 13) {
    element.style.border = 'none';
    if (element.parentElement.querySelector('.errMsg') != null) {
      element.parentElement.querySelector('.errMsg').remove();
    }
  } else {
    element.style.border = '2px solid red';
    element.style.borderRadius = '0.25em';
    if (element.parentElement.querySelector('.errMsg') == null) {
      element.parentElement.appendChild(err);
    }
  }
}
function calculateDLA20() {
  var scoreTotal = 0;
  dla20QuestionCount = 0;
  $('tr')
    .has('div[class=dla20Q]')
    .find('select')
    .each(function () {
      console.log(parseInt($(this).find('option:selected').html()));
      if (
        !isNaN(parseInt($(this).find('option:selected').html())) &&
        $(this).find('option:selected').html() != 'Did Not Answer'
      ) {
        scoreTotal =
          scoreTotal + parseInt($(this).find('option:selected').html());
        dla20QuestionCount++;
        questionCountError(document.querySelector('#questions_container'));
      } else if ($(this).find('option:selected').html() == 'Did Not Answer') {
      } else {
      }
    });
  dla20Score = (scoreTotal / dla20QuestionCount).toFixed(2);
  $('tr').has('div[id=dla20A]').find('input').val(dla20Score);
}

$('document').ready(function () {
  var checkAgeExist = setInterval(function () {
    if ($('tr').has('div[id=dla20ClientAge]').find('font').text().length) {
      clearInterval(checkAgeExist);
      checkAge();
    }
  }, 100);
  var checkDLA20Exist = setInterval(function () {
    if ($('tr').has('div[class=dla20Q]').find('select').length) {
      clearInterval(checkDLA20Exist);
      $('tr').has('div[id=dla20A]').find('input').prop('readOnly', 'readOnly');
      calculateDLA20();
    }
  }, 100);

  checkNA();

  $('#dla20NA').closest('table').find('input').change(checkNA);
  $('#dla20NA').closest('table').find('input').mouseleave(checkNA);
  $('tr').has('div[class=dla20Q]').find('select').change(calculateDLA20);
  $('tr').has('div[class=dla20Q]').find('select').click(calculateDLA20);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'dla20Score', '.frame', '#dla20Score');});