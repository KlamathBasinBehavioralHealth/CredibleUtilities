let clientAge = null;
var dla20QuestionCount = 0;
var dla20Score = 0;
const naTabIndex = 0;
$.widget.bridge('uitooltip', $.ui.tooltip);

function checkAge(){
  try{
    clientAge = $('tr').has('div[id=dla20ClientAge]').find('font').text();
    console.log(clientAge);
  } catch(error){
    console.log(error);
    clientAge = 18;
  }

  $('#dla20NA').closest('table').find('input').css('pointer-events', 'auto');
  $('#dla20NA').closest('table').find('input').attr('tabindex', naTabIndex);
  $('#dla20NA').closest('table').attr('title', '');
  $('#dla20NA').closest('table').uitooltip('disable');

  if(clientAge < 6  && clientAge != ' '){
    visibility('hide', '.dla20Q', false);
    visibility('hide', '#dla20A', false);
    
    if($('#dla20NA').closest('table').find('input').prop('checked') == false){
      $('#dla20NA').closest('table').find('input').trigger('click');
      $('#dla20NA').closest('table').find('input').css('pointer-events', 'none');
      $('#dla20NA').closest('table').find('input').attr('tabindex', -1);
      $('#dla20NA').closest('table').attr('title', 'Client is under the age of 6.');
      $('#dla20NA').closest('table').uitooltip({content:'Client is under the age of 6.'});
    }
  }
  else{
    visibility('show', '.dla20Q', true);
    visibility('show', '#dla20A', false);
  }

  visibility('hide', '#dla20ClientAge');
}

function checkNA(){
  if(clientAge >= 6 || clientAge == ' '){
    visibility('show', '.dla20Q', true);
    visibility('show', '#dla20A', false);
  }
  if($('#dla20NA').closest('table').find('input').prop('checked')){
    visibility('hide', '.dla20Q', false);
    visibility('hide', '#dla20A', false);
    $('.dla20Q').closest('table').find('select').val('');
  }
  calculateDLA20();
}

function questionCountError(element) {
  const err = document.createElement('p');
  err.className = 'errMsg';
  err.innerHTML = 'At least 13 questions must be answered';
  err.style.color = 'red';
  if((clientAge >= 6 || clientAge == ' ') && $('#dla20NA').closest('table').find('input').prop('checked') == false){
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
}

function calculateDLA20() {
  var scoreTotal = 0;
  dla20QuestionCount = 0;
  dla20Score = 'N/A';
  if((clientAge >= 6 || clientAge == ' ') && $('#dla20NA').closest('table').find('input').prop('checked') == false){
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
  }
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

  var checkDLA20NAExist = setInterval(function () {
    if ($('#dla20NA').closest('table').find('input').length) {
      clearInterval(checkDLA20NAExist);
      checkNA();
    }
  }, 100);

  $('#dla20NA').closest('table').find('input').change(checkNA);
  $('tr').has('div[class=dla20Q]').find('select').change(calculateDLA20);
  $('tr').has('div[class=dla20Q]').find('select').click(calculateDLA20);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'dla20Score', '.frame', '#dla20Score');});