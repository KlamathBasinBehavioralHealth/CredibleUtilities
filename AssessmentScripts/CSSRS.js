var cssrsScore;
function initializeCSSRS() {
  var checkCSSRSQExist = setInterval(function () {
    if ($('tr').has('div[class=cssrsQ]').find('input').length) {
      clearInterval(checkCSSRSQExist);
      $('tr')
        .has('div[id=sra]')
        .find('option')
        .filter(function () {
          return $(this).html() == 'Performed';
        })
        .html('Perform');
      checkSRA();
      $('tr')
        .has('div[id=urgency]')
        .find('select')
        .attr('style', 'pointer-events:none');
      $('tr').has('div[id=urgency]').find('select').attr('tabindex', -1);
      $('tr')
        .has('div[id==motsUrgency]')
        .find('select')
        .attr('style', 'pointer-events:none');
      $('tr').has('div[id=motsUrgency]').find('select').attr('tabindex', -1);
      calculateCSSRS();
      cssrsWorkflow();
    }
  }, 100);
}
function checkSRA() {
  if (
    $('tr').has('div[id=sra]').find('select').val() ==
    $('tr')
      .has('div[id=sra]')
      .find('option')
      .filter(function () {
        return $(this).html() == 'Perform';
      })
      .val()
  ) {
    hideShow('show', 'cssrsQ1', true);
    hideShow('show', 'cssrsQ2', true);
    hideShow('show', 'urgency', false);
    hideShow('hide', 'motsUrgency', true);
  } else {
    hideShow('hide', 'cssrsQ1', true);
    hideShow('hide', 'cssrsQ2', true);
    hideShow('hide', 'urgency', true);
    hideShow('hide', 'motsUrgency', true);
    $('tr')
      .has('div[id=cssrsQ1], div[id=cssrsQ2]')
      .find('input')
      .prop('checked', false);
    cssrsWorkflow();
    calculateCSSRS();
  }
}
function cssrsWorkflow() {
  hideShow('hide', 'cssrsQ3', true);
  hideShow('hide', 'cssrsQ4', true);
  hideShow('hide', 'cssrsQ5', true);
  hideShow('hide', 'cssrsQ6', true);
  if (
    !$('tr')
      .has('div[id=cssrsQ1], div[id=cssrsQ2]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    $('tr')
      .has('div[id=cssrsQ3], div[id=cssrsQ4], div[id=cssrsQ5], div[id=cssrsQ6]')
      .find('input')
      .prop('checked', false);
  }
  if (
    !$('tr')
      .has('div[id=cssrsQ3]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    $('tr')
      .has('div[id=cssrsQ4], div[id=cssrsQ5]')
      .find('input')
      .prop('checked', false);
  }
  if (
    $('tr')
      .has('div[id=cssrsQ1], div[id=cssrsQ2]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    hideShow('show', 'cssrsQ3', true);
    hideShow('show', 'cssrsQ6', true);
  }
  if (
    $('tr')
      .has('div[id=cssrsQ3]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    hideShow('show', 'cssrsQ4', true);
    hideShow('show', 'cssrsQ5', true);
  }
}
function calculateCSSRS() {
  if (
    $('tr')
      .has('div[id=cssrsQ4], div[id=cssrsQ5], div[id=cssrsQ6]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    $('tr')
      .has('div[id=urgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=urgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Emergent (Immediate access)';
          })
          .val()
      );
    $('tr')
      .has('div[id=motsUrgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=motsUrgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Emergent (Immediate access)';
          })
          .val()
      );
    cssrsScore = 'Emergent (Immediate access)';
  } else if (
    $('tr')
      .has('div[id=cssrsQ3]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length &&
    !$('tr')
      .has('div[id=cssrsQ4], div[id=cssrsQ5], div[id=cssrsQ6]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    $('tr')
      .has('div[id=urgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=urgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Urgent (Access within 24 business hours)';
          })
          .val()
      );
    $('tr')
      .has('div[id=motsUrgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=motsUrgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Urgent (Access within 24 business hours)';
          })
          .val()
      );
    cssrsScore = 'Urgent (Access within 24 business hours)';
  } else if (
    !$('tr')
      .has('div[id=cssrsQ3], div[id=cssrsQ4], div[id=cssrsQ5], div[id=cssrsQ6]')
      .find("tr:contains('Yes')")
      .find('input:even:checked').length
  ) {
    $('tr')
      .has('div[id=urgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=urgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Routine (Access within 10 business days)';
          })
          .val()
      );
    $('tr')
      .has('div[id=motsUrgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=motsUrgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == 'Routine (Access within 10 business days)';
          })
          .val()
      );
    cssrsScore = 'Routine (Access within 10 business days)';
  }
  if (
    !$('tr').has('div[id=cssrsQ1], div[id=cssrsQ2]').find('input:checked')
      .length
  ) {
    $('tr')
      .has('div[id=urgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=urgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == '';
          })
          .val()
      );
    $('tr')
      .has('div[id=motsUrgency]')
      .find('select')
      .val(
        $('tr')
          .has('div[id=motsUrgency]')
          .find('option')
          .filter(function () {
            return $(this).html() == '';
          })
          .val()
      );
  }
}

$('document').ready(function () {
  initializeCSSRS();
  $('tr').has('div[id=sra]').find('select').change(checkSRA);
  $('tr')
    .has('div[id=cssrsQ1], div[id=cssrsQ2], div[id=cssrsQ3]')
    .find('input')
    .change(cssrsWorkflow);
  $('tr').has('div[class=cssrsQ]').find('input').change(calculateCSSRS);
});

document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'cssrsScore', '.frame', '#cssrsScore');  });