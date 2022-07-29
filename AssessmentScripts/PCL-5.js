var pcl5Score;
$('document').ready(function () {
  $('tr')
    .has('div[class=untouchable]')
    .find('input')
    .prop('readOnly', 'readOnly');
  $('input[type=button]').click(function () {
    pcl5Score = 0;
    $('input[name*=_calc]').each(function () {
      if (this.value) {
        pcl5Score += parseInt(this.value);
      }
    });
    $('tr').has('div[id=answer]').find('input').val(pcl5Score);
  });
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'pcl5Score', '.frame', '#pcl5Score');  });