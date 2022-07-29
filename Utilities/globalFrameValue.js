function getGlobalFrameValue(context, frameSelector, valueVariable){
    const frame = context.querySelector(frameSelector);
    return frame.contentWindow[valueVariable];
}

function setGlobalFrameValue(context, frameSelector, valueVariable, value){
    const frame = context.querySelector(frameSelector);
    frame.contentWindow[valueVariable] = value;
}

function setExtFrameValue(context, value, frameSelector, targetSelector){
    const frame = context.querySelector(frameSelector);
    const element = frame.contentDocument.querySelector(targetSelector);
    const elemInput = element.closest('table').querySelector('input, select');

    elemInput.value = value;
}

function linkValueToExtFrame(context, variable, frameSelector, targetSelector){
    if (frameElement != null && frameElement.classList.contains('frame')){
        document.querySelector('table').onclick = () => {
            setExtFrameValue(context, window[variable], frameSelector, targetSelector);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => { createSubmitButtons(); linkValueToExtFrame(parent.document, 'cssrsScore', '#ticEvaluation', '#cssrsScore');  });