const sudRefList = {
  initialInformation:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132855',
  dimension1:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132856',
  dimension2:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132857',
  dimension3:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132858',
  dimension4:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132859',
  dimension5:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132860',
  dimension6:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132861',
  diagnosis_TreatmentPlan:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132862',
  dimensionalSummary:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132863',
  informedConsent:
    'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132864',
};

let refList = {};
function findLinkFromText(text, documentContext, resultIndex = 0) {
  const elements = Array.from(documentContext.getElementsByTagName('a'));
  return elements.filter((element) => element.innerHTML == text)[resultIndex];
}
function camelCase(str) {
  const capitalLetterAfterSpace = (word, index) =>
    index == 0 ? word.toLowerCase() : word.toUpperCase();
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, capitalLetterAfterSpace)
    .replace(/\s+/g, '')
    .replace(/[&\/\\#,+()$~%.:*?<>{}]/g, '_');
}
function buildHrefList(folderText, documentContext) {
  findLinkFromText(folderText, documentContext)
    .parentElement.querySelectorAll('a.form_yellow')
    .forEach((link) => {
      const cleanedLinkName = camelCase(link.innerHTML);
      refList[cleanedLinkName] = link.href;
    });
}
async function generateIframes(
  parent,
  env = 'test',
  folderText = '',
  documentContext = document,
  testRefList = sudRefList
) {
  const parentEl = document.querySelector(parent);
  const parentFirst = parentEl.firstChild;
  if (env == 'live') {
    buildHrefList(folderText, documentContext);
  } else if ('test') {
    refList = testRefList;
  }
  const promises = Object.keys(refList).map((ref) => {
    return new Promise((resolve, reject) => {
      let tmpDiv = document.createElement('div');
      tmpDiv.className = 'frameContainer';
      let tmpFrame = document.createElement('iframe');
      tmpFrame.id = ref;
      tmpFrame.className = 'frame';
      tmpFrame.src = refList[ref];
      tmpFrame.frameBorder = 0;
      tmpDiv.appendChild(tmpFrame);
      parentEl.insertBefore(tmpDiv, parentFirst);
      tmpFrame.onload = resolve;
    });
  });
  return Promise.all(promises);
}
async function waitForElement(context, selector) {
  return new Promise((resolve, reject) => {
    let el = context.querySelector(selector);
    if (el) {
      resolve(el);
    }
    new MutationObserver((mutationRecords, observer) => {
      const element = context.querySelector(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    }).observe(context.documentElement, { childList: true, subtree: true });
  });
}
async function waitForDelete(context, selector) {
  return new Promise((resolve, reject) => {
    let el = context.querySelector(selector);
    if (!el) {
      resolve(el);
    }
    new MutationObserver((mutationRecords, observer) => {
      const element = context.querySelector(selector);
      if (!element) {
        resolve(element);
        observer.disconnect();
      }
    }).observe(context.documentElement, { childList: true, subtree: true });
  });
}

function addHeaderScriptToAll() {
  document
    .querySelectorAll('.frameContainer iframe')
    .forEach(function (iframe) {
      const scriptObj = iframe.contentWindow.document.createElement('script');
      const scriptVal =
        "let expandBool = false; function findCorrectFrame() { const header = document.querySelector('h1'); let correctFrame; parent.document.querySelectorAll('iframe').forEach(iframe => { if (iframe.contentWindow.document.contains(header)) { correctFrame = iframe; } }); return correctFrame; } function expandFrame(frameSelector, expand) { const frame = parent.document.querySelector(frameSelector); const questionsContainer = document.querySelector('#questions_container'); questionsContainer.hidden = expand ? false : true; } function headerOnClick() { expandBool = !expandBool; const frame = findCorrectFrame(); expandFrame('#' + frame.id, expandBool); }";
      scriptObj.text = scriptVal;
      iframe.contentWindow.document.body.appendChild(scriptObj);
    });
}

function addHeaderFuncToAll() {
  document.querySelectorAll('.frameContainer iframe').forEach((iframe) => {
    iframe.contentWindow.document.querySelector('.toolHead').onclick =
      iframe.contentWindow.headerOnClick;
  });
}

function idealFrameHeight(iframe) {
  const contentHeight = iframe.contentWindow.document.body.scrollHeight;
  if (contentHeight < 50) {
    return contentHeight + 67 + 'px';
  } else if (contentHeight < 200) {
    return contentHeight + 50 + 'px';
  }
  return contentHeight + 125 + 'px';
}
function setFrameHeightEvents() {
  var iframes = document.querySelectorAll('.frameContainer iframe');
  iframes.forEach((iframe) => {
    iframe.contentWindow.document.querySelector(
      '#questions_container'
    ).hidden = true;
    iframe.style.height = idealFrameHeight(iframe);
    iframe.contentWindow.document.body.onclick = () => {
      iframe.style.height = idealFrameHeight(iframe);
    };
  });
}

let mainHref;
function setHref(context, formName, submitBool) {
  const navTree = context.querySelector('a.form_yellow').closest('tbody');
  navTree.querySelectorAll('a').forEach((link) => {
    if (link.textContent != formName) {
      if (submitBool) {
        link.href = refList[camelCase(link.textContent)];
      } else {
        link.href = 'javascript:void(0)';
      }
    } else {
      if (submitBool) {
        link.href = mainHref;
      } else {
        mainHref = link.href;
        link.href = 'javascript:void(0)';
      }
    }
  });
}
function hideSubforms(context, folderText, bool) {
  const subformParent = findLinkFromText(folderText, context).parentElement;
  if (bool) {
    subformParent.hidden = true;
  } else {
    subformParent.hidden = false;
  }
}
function setLinks(context, folderText) {
  const links = findLinkFromText(
    folderText,
    context
  ).parentElement.querySelectorAll('a.form_yellow');
  links.forEach((link) => {
    link.onclick = (e) => {
      const frame = document.querySelector('#' + camelCase(link.textContent));
      frame.scrollIntoView();
      if (
        frame.contentWindow.document.querySelector('#questions_container')
          .hidden
      ) {
        frame.contentWindow.document.querySelector('.toolHead').click();
      }
    };
  });
}

function pasteVal(e, regex) {
  const clip = e.clipboardData || window.clipboardData;
  if (!regex.test(clip.getData('Text'))) {
    e.preventDefault();
  }
}
function keypressVal(e, regex) {
  if (!regex.test(e.key)) {
    e.preventDefault();
  }
}
function onblurVal(e, regex, msg) {
  if (!regex.test(e.target.value)) {
    inlineError(e.target, (x) => regex.test(x), msg);
  } else {
    if (e.target.hasAttribute('data-value')) {
      e.target.setAttribute('data-value', e.target.value);
    }
  }
}
function setDatePickerOption(element, option, value) {
  $('#' + element.id)
    .datepicker('option', option, value)
    .datepicker('refresh');
}
function setDateRange(date) {
  const startInc = parseInt(date.getAttribute('startDate'));
  const endInc = parseInt(date.getAttribute('endDate'));
  const startIncValid = !isNaN(startInc);
  const endIncValid = !isNaN(endInc);
  if (date.hasAttribute('startDate') && startIncValid) {
    setDatePickerOption(date, 'minDate', date.getAttribute('startDate'));
    if (date.hasAttribute('endDate') && endIncValid && startInc <= endInc) {
      setDatePickerOption(date, 'maxDate', date.getAttribute('endDate'));
    }
  } else if (date.hasAttribute('endDate') && endIncValid) {
    setDatePickerOption(date, 'maxDate', date.getAttribute('endDate'));
  }
}
function dateRangeVal(e) {
  const startInc = parseInt(e.target.getAttribute('startDate'));
  const endInc = parseInt(e.target.getAttribute('endDate'));
  const startDate = new Date();
  const endDate = new Date();
  if (e.target.hasAttribute('startDate')) {
    startDate.setDate(startDate.getDate() + startInc);
    if (e.target.hasAttribute('endDate')) {
      endDate.setDate(endDate.getDate() + endInc);
      if (
        !(
          startDate.valueOf() <= Date.parse(e.target.value) &&
          Date.parse(e.target.value) <= endDate.valueOf()
        )
      ) {
        let errString = `<b>Invalid date!</b> Date must be from ${startDate.toLocaleDateString(
          { month: '2-digit', day: '2-digit', year: 'numeric' }
        )} to ${endDate.toLocaleDateString({
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })}`;
        inlineError(
          e.target,
          (x) => {
            startDate.valueOf() <= Date.parse(x.value) &&
              Date.parse(e.target.value) <= endDate.valueOf();
          },
          errString
        );
      }
    } else if (Date.parse(e.target.value) <= startDate.valueOf()) {
      let errString = `<b>Invalid date!</b> Date must be after ${startDate.toLocaleDateString(
        { month: '2-digit', day: '2-digit', year: 'numeric' }
      )}`;
      inlineError(
        e.target,
        (x) => {
          startDate.valueOf() <= Date.parse(x.value);
        },
        errString
      );
    }
  } else if (e.target.hasAttribute('endDate')) {
    endDate.setDate(endDate.getDate() + endInc);
    if (endDate.valueOf() <= Date.parse(e.target.value)) {
      let errString = `<b>Invalid date!</b> Date must be before ${endDate.toLocaleDateString(
        { month: '2-digit', day: '2-digit', year: 'numeric' }
      )}`;
      inlineError(
        e.target,
        (x) => {
          Date.parse(x.value) <= endDate.valueOf();
        },
        errString
      );
    }
  }
}

function numTypeInputVal(context) {
  const numRegex = /[\d]+$/;
  context.querySelectorAll("input[type='number']").forEach((numInput) => {
    numInput.min = 0;
    numInput.onkeypress = (e) => {
      keypressVal(e, numRegex);
    };
    numInput.onpaste = (e) => {
      pasteVal(e, numRegex);
    };
  });
}
function dateInputVal(context) {
  const dateFields = context.querySelectorAll('.hasDatepicker');
  const inputRegex = /[\d\/]+$/;
  const completeRegex =
    /(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[0-1])\/(19[0-9][0-9]|20[0-3][0-9])+$/;
  dateFields.forEach((date) => {
    setTimeout(() => setDateRange(date), 2000);
    date.maxLength = 10;
    date.onkeypress = (e) => {
      keypressVal(e, inputRegex);
    };
    date.onpaste = (e) => {
      pasteVal(e, completeRegex);
    };
    date.onblur = (e) => {
      onblurVal(
        e,
        completeRegex,
        '<b>Invalid date!</b> Please enter a date in format MM/DD/YYYY'
      );
      dateRangeVal(e);
    };
  });
}
function numTextInputVal(context) {
  const numRegex = /[\d]+$/;
  context.querySelectorAll('input[maxlength]').forEach((numInput) => {
    if (numInput.maxLength < 10) {
      numInput.onkeypress = (e) => {
        keypressVal(e, numRegex);
      };
      numInput.onpaste = (e) => {
        pasteVal(e, numRegex);
      };
    }
  });
}
function inlineError(element, condition, msg) {
  const err = document.createElement('p');
  err.className = 'errMsg';
  err.innerHTML = msg;
  err.style.color = 'red';
  element.style.border = '2px solid red';
  element.style.borderRadius = '0.25em';
  element.onchange = (e) => {
    if (condition) {
      e.target.style.border = '1px solid #8f8f9d';
      if (e.target.parentElement.querySelector('.errMsg') != null) {
        e.target.parentElement.querySelector('.errMsg').remove();
      }
    }
  };
  if (element.parentElement.querySelector('.errMsg') == null) {
    element.parentElement.appendChild(err);
  }
}
function deployInlineValidation() {
  const frames = document.querySelectorAll('.frame');
  frames.forEach((frame) => {
    numTypeInputVal(frame.contentWindow.document);
    dateInputVal(frame.contentWindow.document);
    numTextInputVal(frame.contentWindow.document);
  });
}

let errCount = 0;
function errorMsg(element) {
  const err = document.createElement('p');
  err.className = 'errMsg';
  if (element.parentElement != null) {
    err.innerHTML = `Please complete <b><i>${element.parentElement.textContent.replace(
      '*',
      ''
    )}</i></b>`;
  }
  err.style.color = 'red';
  let inputElements = [];
  if (
    element.closest('tr') != null &&
    element.closest('tr').querySelector('div[questionSelector]') != null
  ) {
    const selector = element
      .closest('tr')
      .querySelector('div[questionSelector]')
      .getAttribute('questionSelector');
    inputElements = [...element.closest('body').querySelectorAll(selector)].map(
      (x) => x.closest('tr').querySelector('input, select, textarea')
    );
  } else if (element.closest('table') != null) {
    inputElements = element
      .closest('table')
      .querySelectorAll('input, select, textarea');
  }
  inputElements = [...inputElements].filter((x) => x.type != 'button');
  if (inputElements.length == 1) {
    const elem = inputElements[0];
    elem.style.border = '2px solid red';
    elem.style.borderRadius = '0.25em';
    elem.onchange = (e) => {
      if (inputElements.length == 1) {
        if (e.target.value != '' || e.target.getAttribute('data-value') != '') {
          e.target.style.border = '1px solid #8f8f9d';
          if (e.target.closest('table').querySelector('.errMsg') != null) {
            e.target.closest('table').querySelector('.errMsg').remove();
            errCount -= 1;
          }
        } else {
          errorMsg(element);
        }
      }
    };
    if (
      inputElements[inputElements.length - 1]
        .closest('table')
        .querySelector('.errMsg') == null
    ) {
      inputElements[inputElements.length - 1].closest('table').appendChild(err);
      errCount += 1;
      if (errCount == 1) {
        inputElements[0].focus();
      }
    }
  } else if (inputElements.length > 1) {
    inputElements.forEach((elem) => {
      elem.style.outline = '2px solid red';
      elem.style.borderRadius = '0.25em';
    });
    inputElements.forEach((inp) => {
      inp.closest('tr').onclick = (e) => {
        let noneSelected = true;
        inputElements.forEach((elem) => {
          if (elem.type == 'radio' || elem.type == 'checkbox') {
            if (elem.checked) {
              noneSelected = false;
            }
          } else {
            if (elem.value != '') {
              noneSelected = false;
            }
          }
        });
        if (noneSelected) {
          errorMsg(element);
        } else {
          inputElements.forEach((elem) => {
            elem.style.outline = 'none';
          });
          if (
            inputElements[inputElements.length - 1]
              .closest('table')
              .closest('td')
              .querySelector('.errMsg') != null
          ) {
            inputElements[inputElements.length - 1]
              .closest('table')
              .closest('td')
              .querySelector('.errMsg')
              .remove();
            errCount -= 1;
          }
        }
      };
    });
    if (
      inputElements[inputElements.length - 1]
        .closest('table')
        .closest('td')
        .querySelector('.errMsg') == null
    ) {
      inputElements[inputElements.length - 1]
        .closest('table')
        .closest('td')
        .appendChild(err);
      errCount += 1;
      if (errCount == 1) {
        inputElements[inputElements.length - 1].focus();
      }
    }
  }
}

function validation() {
  let isValid = true;
  if (document.querySelectorAll("font[color='red'], .redAsterisk").length > 0) {
    document
      .querySelectorAll("font[color='red'], .redAsterisk")
      .forEach((font) => {
        let inputElements;
        if (font.closest('tr').querySelector('div[questionSelector]') != null) {
          const selector = font
            .closest('tr')
            .querySelector('div[questionSelector]')
            .getAttribute('questionSelector');
          inputElements = [...document.querySelectorAll(selector)].map((x) =>
            x.closest('tr').querySelector('input, select, textarea')
          );
        } else {
          inputElements = font
            .closest('table')
            .querySelectorAll('input, select, textarea');
        }
        inputElements = [...inputElements].filter((x) => x.type != 'button');
        if (inputElements.length == 1) {
          if (
            inputElements[0].value == '' &&
            inputElements[0].getAttribute('data-value') == '' &&
            (inputElements[0].offsetParent != null || userChange == true)
          ) {
            errorMsg(font);
            isValid = false;
          }
        } else if (inputElements.length > 1) {
          let noneSelected = true;
          inputElements.forEach((elem) => {
            if (elem.type == 'radio' || elem.type == 'checkbox') {
              if (elem.checked) {
                noneSelected = false;
              }
            } else {
              if (elem.value != '') {
                noneSelected = false;
              }
            }
          });
          if (noneSelected && font.offsetParent != null) {
            errorMsg(font);
            isValid = false;
          }
        }
      });
  }
  if (document.querySelectorAll('.frame').length > 0) {
    document.querySelectorAll('.frame').forEach((frame) => {
      if (frame.contentWindow.userChange) {
        if (
          frame.contentWindow.document.querySelectorAll(
            "font[color='red'], .redAsterisk"
          ).length > 0
        ) {
          frame.contentWindow.document
            .querySelectorAll("font[color='red'], .redAsterisk")
            .forEach((font) => {
              let inputElements;
              if (
                font.closest('tr').querySelector('div[questionSelector]') !=
                null
              ) {
                const selector = font
                  .closest('tr')
                  .querySelector('div[questionSelector]')
                  .getAttribute('questionSelector');
                inputElements = [
                  ...frame.contentWindow.document.querySelectorAll(selector),
                ].map((x) =>
                  x.closest('tr').querySelector('input, select, textarea')
                );
              } else {
                inputElements = font
                  .closest('table')
                  .querySelectorAll('input, select, textarea');
              }
              inputElements = [...inputElements].filter(
                (x) => x.type != 'button'
              );
              if (inputElements.length == 1) {
                if (
                  inputElements[0].value == '' &&
                  (inputElements[0].offsetParent != null ||
                    frame.contentWindow.userChange == true)
                ) {
                  errorMsg(font);
                  isValid = false;
                  if (
                    frame.contentWindow.document.querySelector(
                      '#questions_container'
                    ).hidden
                  ) {
                    frame.contentWindow.document
                      .querySelector('.toolHead')
                      .click();
                  }
                  frame.style.height = idealFrameHeight(frame);
                }
              } else if (inputElements.length > 1) {
                let noneSelected = true;
                inputElements.forEach((elem) => {
                  if (elem.type == 'radio' || elem.type == 'checkbox') {
                    if (elem.checked) {
                      noneSelected = false;
                    }
                  } else {
                    if (elem.value != '') {
                      noneSelected = false;
                    }
                  }
                });
                if (
                  noneSelected &&
                  (font.offsetParent != null ||
                    frame.contentWindow.userChange == true)
                ) {
                  errorMsg(font);
                  isValid = false;
                  if (
                    frame.contentWindow.document.querySelector(
                      '#questions_container'
                    ).hidden
                  ) {
                    frame.contentWindow.document
                      .querySelector('.toolHead')
                      .click();
                  }
                  frame.style.height = idealFrameHeight(frame);
                }
              }
            });
        }
      }
    });
  }
  let errorMsgs = [...document.querySelectorAll('.errMsg')];
  document.querySelectorAll('.frame').forEach((frame) => {
    errorMsgs = [
      ...errorMsgs,
      ...frame.contentDocument.querySelectorAll('.errMsg'),
    ];
  });
  if (errorMsgs.length > 0) {
    isValid = false;
  }
  return isValid;
}

let globalIsValid = true;
async function unrequireAll() {
  const promises = [];
  if (document.querySelectorAll('.frame').length > 0) {
    document.querySelectorAll('.frame').forEach((frame) => {
      const reqFlags =
        frame.contentWindow.document.querySelectorAll('[required]');
      reqFlags.forEach((req) => {
        req.removeAttribute('required');
      });
      promises.push(
        new Promise((resolve, reject) => {
          if (
            frame.contentWindow.document.querySelectorAll('[required]')
              .length == 0
          ) {
            resolve();
          }
        })
      );
    });
  } else {
    document.querySelectorAll('[required]').forEach((req) => {
      req.removeAttribute('required');
    });
    promises.push(
      new Promise((resolve, reject) => {
        if (document.querySelectorAll('[required]').length == 0) {
          resolve();
        }
      })
    );
  }
  return Promise.all(promises);
}
async function submitFrames() {
  const frames = document.querySelectorAll('.frame');
  const promises = [...frames].map((frame) => {
    if (frame.contentWindow.userChange) {
      return new Promise((resolve, reject) => {
        frame.contentWindow.document.querySelector('#oldComplete').click();
        frame.onload = resolve;
      });
    }
  });
  setHref(
    parent.document.querySelector("frame[name='left']").contentDocument,
    'TIC EVAL',
    true
  );
  hideSubforms(
    parent.document.querySelector("frame[name='left']").contentDocument,
    'Eval Subforms',
    true
  );
  return Promise.all(promises);
}
async function deleteFrames() {
  const frames = document.querySelectorAll('.frame');
  const promises = [...frames].map((frame) => {
    frame.remove();
    waitForDelete(document, '#' + frame.id);
  });
  return Promise.all(promises);
}
function formSubmit() {
  if (document.querySelectorAll('.frame').length > 0) {
    unrequireAll().then(() => {
      submitFrames().then(() => {
        deleteFrames().then(() => {
          document.querySelector('#input').submit();
        });
      });
    });
  } else {
    unrequireAll(document).then(() => {
      document.querySelector('#oldComplete').click();
    });
  }
}

function completeButton() {
  const oldComplete = document.querySelector("input[name='Complete']");
  oldComplete.id = 'oldComplete';
  oldComplete.hidden = true;
  oldComplete.disabled = false;
  const complete = document.createElement('input');
  complete.type = 'button';
  complete.id = 'complete';
  complete.value = 'Complete';
  complete.onclick = (e) => {
    e.preventDefault();
    const isValidSubmit = validation() && globalIsValid;
    if (isValidSubmit) {
      formSubmit();
    }
  };
  return complete;
}
function saveProgressButton() {
  const saveProgress = document.createElement('input');
  saveProgress.id = 'saveProgress';
  saveProgress.type = 'submit';
  saveProgress.name = 'Save Progress';
  saveProgress.value = 'Save Progress';
  saveProgress.onclick = (e) => {
    e.preventDefault();
    formSubmit();
  };
  return saveProgress;
}
function createSubmitButtons() {
  const form = document.querySelector('#input');
  form.setexit.value = 1;
  const complete = completeButton();
  const saveProgress = saveProgressButton();
  const oldComplete = document.querySelector('#oldComplete');
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';
  const buttonWrapper = oldComplete.parentElement;
  buttonWrapper.id = 'buttonWrapper';
  if (
    (frameElement != null && !frameElement.classList.contains('frame')) ||
    getURLQueryStringParameter('formbuilder') == '1'
  ) {
    buttonWrapper.insertBefore(buttonContainer, oldComplete);
    buttonContainer.appendChild(saveProgress);
    buttonContainer.appendChild(complete);
  }
  window.onbeforeunload = () => {
    console.log(document.querySelector('.toolHead').textContent);
  };
}

/* Catch any complete buttons where the subforms don't have submit button functionality */
function hideSubCompletes(){
	const frames = document.querySelectorAll('.frame');
	frames.forEach(frame => {
        const oldComplete = frame.contentWindow.document.querySelector('input[name=\'Complete\']');
        oldComplete.id = 'oldComplete';
        oldComplete.hidden = true;
        frame.contentWindow.document.querySelector('#input').setexit.value = 1;
        frame.contentWindow.onbeforeunload = (e) => {console.log(`${frame.id} submitted`)};
	});
}

/*  */
function addStyling() {
  const css = document.createElement('style');
  css.textContent = `body{ width: 98vw; } /* IFRAMES */ .frameContainer{ width: 98vw; height: auto; margin-left: -2.75em; overflow-y: hidden; } .frame{ border: none; width: 100%; height: 100vh; overflow-y: hidden; } /* SUBMIT BUTTONS */ #buttonWrapper{ width: 100vw; max-width: 100%; margin-top: 2em; } #buttonContainer{ width: 25%; margin: 0px 37.5% 0px calc(37.5% - 30px); display: flex; flex-direction: row; column-gap: 1.5em; } #saveProgress, #complete{ margin: 0; width: 8.25em !important; font-size: 0.8em !important; } @media screen and (max-width: 800px){ #buttonContainer{ flex-direction: column; row-gap: 1.25em; } }`;
  document.head.appendChild(css);
}

waitForElement(parent.document, "frame[name='left']").then((navFrame) => {
  generateIframes(
    '#questions_container',
    'live',
    'Eval Subforms',
    navFrame.contentWindow.document
  ).then(() => {
    addHeaderScriptToAll();
    addHeaderFuncToAll();
    setFrameHeightEvents();
    hideSubforms(
      parent.document.querySelector("frame[name='left']").contentDocument,
      'Eval Subforms',
      false
    );
    setHref(
      parent.document.querySelector("frame[name='left']").contentDocument,
      'TIC EVAL',
      false
    );
    setLinks(
      parent.document.querySelector("frame[name='left']").contentDocument,
      'Eval Subforms'
    );
    createSubmitButtons();
    hideSubCompletes();
    addStyling();
    deployInlineValidation();
  });
});
