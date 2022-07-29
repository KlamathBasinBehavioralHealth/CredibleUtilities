var gad7Score;
$('document').ready(function () {
  $('tr')
    .has('div[class=untouchable]')
    .find('input')
    .prop('readOnly', 'readOnly');
  $('input[type=button]').click(function () {
    gad7Score = 0;
    $('input[name*=_calc]').each(function () {
      if (this.value) {
        gad7Score += parseInt(this.value);
      }
    });
    $('tr').has('div[id=answer]').find('input').val(gad7Score);
  });
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'gad7Score', '#ticEvaluation', '#gad7Score');  });