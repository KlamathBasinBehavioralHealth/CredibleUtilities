var dla20QuestionCount = 0;
var dla20Score = 0;
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
  var checkDLA20Exist = setInterval(function () {
    if ($('tr').has('div[class=dla20Q]').find('select').length) {
      clearInterval(checkDLA20Exist);
      $('tr').has('div[id=dla20A]').find('input').prop('readOnly', 'readOnly');
      calculateDLA20();
    }
  }, 100);
  $('tr').has('div[class=dla20Q]').find('select').change(calculateDLA20);
  $('tr').has('div[class=dla20Q]').find('select').click(calculateDLA20);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'dla20Score', '#ticEvaluation', '#dla20Score');  });