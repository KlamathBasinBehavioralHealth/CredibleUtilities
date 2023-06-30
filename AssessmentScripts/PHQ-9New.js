if(typeof visibilty != 'function'){
  window.include = function (file){
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
      
    document.getElementsByTagName('head').item(0).appendChild(script);
  }

  include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@0da3d17/Utilities/visibility.js');
}

let age;
try{
  age = $('tr').has('div[id=clientAge]').find('font').text();
  if(!isNumeric(age)){
    age = 0;
  }
}catch(error){
  console.log(error);
  age = 0;
}
function checkAge(){
  visibility('hide', '.phq9AdultQ', false);
  visibility('hide', '.phq9AdolescentQ', false);
  if(age > 18){
    visibility('show', '.phq9AdultQ', true);
  }else{
    visibility('show', '.phq9AdolescentQ', true);
  }
}

let phq9Score;
function calculatePHQ9() {
  phq9Score = 0;
  if(age > 18){
    $('tr')
      .has('div[class=phq9AdultQ]')
      .find('select')
      .each(function () {
        if (!isNaN(parseInt($(this).find('option:selected').html()))) {
          phq9Score =
            phq9Score + parseInt($(this).find('option:selected').html());
        }
      });
  }else{
    $('tr')
      .has('div[class=phq9AdolescentQ]')
      .find('select')
      .each(function () {
        if (!isNaN(parseInt($(this).find('option:selected').html()))) {
          phq9Score =
            phq9Score + parseInt($(this).find('option:selected').html());
        }
      });
  }
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
  visibility('hide', '#phq9Q10', false);
  if (phq9Score > 0) {
    visibility('show', '#phq9Q10', true);
  }
}
function checkPositiveScreening() {
  visibility('hide', 'positiveScreening', false);
  if (phq9Score >= 9) {
    visibility('show', 'positiveScreening', true);
  }
}
$('document').ready(function () {
  checkAge();
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