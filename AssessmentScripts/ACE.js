var loopcount;
var aceScore;
$('tr').has('div[class=answer]').find('input').prop('readOnly', 'readOnly');
function countQuestions() {
  for (
    loopcount = 0, aceScore = 0;
    loopcount < $('tr').find('div[class=question]').length;
    loopcount++
  ) {
    if (
      $('tr').has('div[class=question]').find('input')[loopcount * 2].checked ==
      true
    ) {
      aceScore++;
    }
  }
  $('tr').has('div[class=answer]').find('input').val(aceScore);
}
$(document).ready(function () {
  $('tr').has('div[class=question]').find('input').click(countQuestions);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'aceScore', '.frame', '#aceScore');  });