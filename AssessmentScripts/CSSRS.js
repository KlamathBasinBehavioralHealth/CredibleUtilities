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
        .has('div[id=motsUrgency]')
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
  ){
    visibility('show', '.cssrsLabel');
    visibility('show', '#cssrsQ1', true);
    visibility('show', '#cssrsQ2', true);
    visibility('show', '#cssrsQ6', true);
    visibility('show', '#urgency');
  }else{
    visibility('hide', '.cssrsLabel');
    visibility('hide', '#cssrsQ1');
    visibility('hide', '#cssrsQ2');
    visibility('hide', '#cssrsQ6');
    visibility('hide', '#urgency');
    $('tr')
      .has('div[id=cssrsQ1], div[id=cssrsQ2], div[id=cssrsQ6]')
      .find('input')
      .prop('checked', false);
    cssrsWorkflow();
    calculateCSSRS();
  }
}
function cssrsWorkflow() {
  visibility('hide', '#cssrsQ3');
  visibility('hide', '#cssrsQ4');
  visibility('hide', '#cssrsQ5a');
  visibility('hide', '#cssrsQ5b');
  if(
    !$('tr')
      .has('div[id=cssrsQ2]')
      .find('tr:contains(\'Yes\')')
      .find('input:even:checked').length)
  {
    $('tr')
      .has('div[id=cssrsQ3], div[id=cssrsQ4], div[id=cssrsQ5a], div[id=cssrsQ5b]')
      .find('input')
      .prop('checked', false);
  }
  if (
    !$('tr')
      .has('div[id=cssrsQ3]')
      .find('tr:contains(\'Yes\')')
      .find('input:even:checked').length)
  {
    $('tr')
      .has('div[id=cssrsQ4], div[id=cssrsQ5a]')
      .find('input')
      .prop('checked', false);
  }
  if (
    $('tr')
      .has('div[id=cssrsQ2]')
      .find('tr:contains(\'Yes\')')
      .find('input:even:checked').length)
  {
    visibility('show', '#cssrsQ3', true);
  }
  if (
    $('tr')
      .has('div[id=cssrsQ3]')
      .find('tr:contains(\'Yes\')')
      .find('input:even:checked').length)
  {
    visibility('show', '#cssrsQ4', true);
    visibility('show', '#cssrsQ5a', true);
  }
  if (
    $('tr')
      .has('div[id=cssrsQ5a]')
      .find('tr:contains(\'Yes\')')
      .find('input:even:checked').length)
  {
    visibility('show', '#cssrsQ5b', true);
  }
}

function setUrgency(urgency){
  switch (urgency){
    case 'routine':
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
    break;
    case 'emergent':
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
    break;
    case 'urgent':
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
    break;
    default:
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

function calculateCSSRS() {
  if( 
    $('tr')
      .has('div[id=cssrsQ6]')
      .find('tr')
      .filter(function(){
        return $(this).text() === 'Yes, within the last three months';    
      })
      .find('input:checked').length)
  {
    setUrgency('emergent');
  }else if( 
    $('tr')
      .has('div[id=cssrsQ6]')
      .find('tr')
      .filter(function(){
        return $(this).text() === 'Yes';    
      })
      .find('input:checked').length)
  {
    if($('tr')
      .has('div[id=cssrsQ4]')
      .find('tr:contains(\'Yes\')')
      .eq(1)
      .find('input:checked').length || 
      $('tr')
      .has('div[id=cssrsQ5b]')
      .find('tr:contains(\'Yes\')')
      .eq(1)
      .find('input:checked').length){
        setUrgency('emergent');        
    }else{
      setUrgency('urgent');
    }
  }else if( 
    $('tr')
      .has('div[id=cssrsQ6]')
      .find('tr')
      .filter(function(){
        return $(this).text() === 'No';    
      })
      .find('input:checked').length)
  {
    if($('tr')
      .has('div[id=cssrsQ4]')
      .find('tr:contains(\'Yes\')')
      .eq(1)
      .find('input:checked').length || 
      $('tr')
      .has('div[id=cssrsQ5b]')
      .find('tr:contains(\'Yes\')')
      .eq(1)
      .find('input:checked').length){
        setUrgency('emergent');        
    }else{
      if($('tr')
        .has('div[id=cssrsQ3]')
        .find('tr:contains(\'Yes\')')
        .eq(1)
        .find('input:checked').length){
          setUrgency('urgent');        
      }else{
        setUrgency('routine');
      }
    } 
  }else{
    if(
      !$('tr')
        .has('div[id=cssrsQ2]')
        .find('tr:contains(\'Yes\')')
        .find('input:even:checked').length &&
      !$('tr')
        .has('div[id=cssrsQ2]')
        .find('tr:contains(\'No\')')
        .find('input:even:checked').length)
    {
      setUrgency('');
    }
  }
}

$('document').ready(function () {
  visibility('hide', '#motsUrgency');
  visibility('hide', '#adminUseLabel');
  initializeCSSRS();
  $('tr').has('div[id=sra]').find('select').change(checkSRA);
  $('tr')
    .has('div[id=cssrsQ1], div[id=cssrsQ2], div[id=cssrsQ3], div[id=cssrsQ5a], div[id=cssrsQ6]')
    .find('input')
    .change(cssrsWorkflow);
  $('tr')
    .has('div[id=cssrsQ1], div[id=cssrsQ2], div[id=cssrsQ3], div[id=cssrsQ5a], div[id=cssrsQ6]')
    .find('input')
    .mouseleave(cssrsWorkflow);
  $('tr').has('div[class=cssrsQ]').find('input').change(calculateCSSRS);
  $('tr').has('div[class=cssrsQ]').find('input').mouseleave(calculateCSSRS);
});

try{
  document.addEventListener('DOMContentLoaded', () => {linkValueToExtFrame(parent.document, 'cssrsScore', '.frame', '#cssrsScore');  });
}catch(error){
  console.log(error);
}
