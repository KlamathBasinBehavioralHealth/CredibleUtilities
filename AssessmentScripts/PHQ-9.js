var phq9Score;
function calculatePHQ9() {
  phq9Score = 0;
  $('tr')
    .has('div[class=phq9Q]')
    .find('select')
    .each(function () {
      if (!isNaN(parseInt($(this).find('option:selected').html()))) {
        phq9Score =
          phq9Score + parseInt($(this).find('option:selected').html());
      }
    });
  $('tr')
    .has('div[id=phq9A]')
    .find('select')
    .val(
      $('tr')
        .has('div[id=phq9A]')
        .find('option')
        .filter(function () {
          return $(this).html() == phq9Score;
        })
        .val()
    );
}
function checkPHQ9() {
  calculatePHQ9();
  hideShow('hide', 'phq9Q10', true);
  if (phq9Score > 0) {
    hideShow('show', 'phq9Q10', true);
  }
}
function checkPositiveScreening() {
  hideShow('hide', 'positiveScreening');
  if (phq9Score >= 9) {
    hideShow('show', 'positiveScreening');
  }
}
$('document').ready(function () {
  var checkPHQ9Exist = setInterval(function () {
    if ($('tr').has('div[id=phq9A]').find('select').length) {
      clearInterval(checkPHQ9Exist);
      checkPHQ9();
    }
  }, 100);
  var checkPHQ9AExist = setInterval(function () {
    if ($('tr').has('div[id=phq9A]').find('select').length) {
      clearInterval(checkPHQ9AExist);
      $('tr')
        .has('div[id=phq9A]')
        .find('select')
        .attr('style', 'pointer-events:none');
      $('tr').has('div[id=phq9A]').find('select').attr('tabindex', -1);
      checkPositiveScreening();
    }
  }, 100);
  $('tr').has('div[id=phq9Perform]').find('input').change(checkPHQ9);
  $('tr').has('div[class=phq9Q]').find('select').change(checkPHQ9);
  $('tr').has('div[class=phq9Q]').find('select').change(checkPositiveScreening);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'phq9Score', '.frame', '#phq9Score');  });