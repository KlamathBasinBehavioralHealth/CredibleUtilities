const defaultAge = 18;
if(typeof visibilty != 'function'){
  window.include = function (file){
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
      
    document.getElementsByTagName('head').item(0).appendChild(script);
  }

  include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@5996df8/Utilities/visibility.js');
}

let age;

function checkAge(){
  try{
    age = parseInt($('tr').has('div[id=clientAge]').find('font').text());
    if(isNaN(age)){
      age = defaultAge;
    }
  }catch(error){
    console.log(error);
    age = defaultAge;
  }
  visibility('hide', '.phq9Label', false);
  visibility('hide', '.phq9AdultQ', false);
  visibility('hide', '.phq9AdolescentQ', false);
  visibility('hide', '.phq9Q', false);
  visibility('hide', '#phq9A', false);
  visibility('hide', '#clientAge', false);
  try{
    document.querySelector('#underEleven').remove();
  }catch(error){
      console.log(error);
  }
  if(age >= 18){
    visibility('show', '.phq9Label', false);
    visibility('show', '.phq9AdultQ', true);
    visibility('show', '.phq9Q', true);
    visibility('show', '#phq9A', false);
  }else if(age < 18 && age >= 11){
    visibility('show', '.phq9Label', false);
    visibility('show', '.phq9AdolescentQ', true);
    visibility('show', '.phq9Q', true);
    visibility('show', '#phq9A', false);
  }else{
    let underEleven = document.createElement('div');
    underEleven.setAttribute('id', 'underEleven');
    underEleven.innerText = 'Client is under the age of 11. PHQ-9 not necessary.';
    document.querySelector('#clientAge').closest('table').parentNode.parentNode.nextSibling.after(underEleven);
  }
  try{
    checkPHQ9();
    checkPositiveScreening();
  }catch(error){
    console.log(error);
  }
}

var phq9Score;
function calculatePHQ9() {
  phq9Score = 0;
  if(age >= 18){
    $('tr')
      .has('div[class=phq9AdultQ]')
      .find('select')
      .each(function () {
        if (!isNaN(parseInt($(this).find('option:selected').html()))) {
          phq9Score =
            phq9Score + parseInt($(this).find('option:selected').html());
        }
      });
  }
  if(age < 18 && age >= 11){
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
  visibility('hide', '#positiveScreening', false);
  if (phq9Score >= 9) {
    visibility('show', '#positiveScreening', true);
  }
}

function delay(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function setup(){
  while(typeof visibility !== 'function'){
    await delay(100);
  }
  let checkAgeExist = setInterval(() =>{
    if (document.querySelector('#clientAge')?.closest('table').querySelector('font')) {
      clearInterval(checkAgeExist);
      checkAge();
    }
  }, 100);
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
  $('tr').has('div[class=phq9AdultQ]').find('select').change(checkPHQ9);
  $('tr').has('div[class=phq9AdultQ]').find('select').change(checkPositiveScreening);
  $('tr').has('div[class=phq9AdolescentQ]').find('select').change(checkPHQ9);
  $('tr').has('div[class=phq9AdolescentQ]').find('select').change(checkPositiveScreening);
}

$('document').ready(function () {
  setup();  
});

document.addEventListener('DOMContentLoaded', () => {
  try{
    linkValueToExtFrame(parent.document, 'phq9Score', '.frame', '#phq9Score');
  }catch(error){
    console.log(error);
  }
});
