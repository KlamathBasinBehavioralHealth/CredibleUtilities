function getGlobalFrameValue(context, frameSelector, valueVariable){
    try{
        const frame = context.querySelector(frameSelector);
    return frame.contentWindow[valueVariable];    
    }catch(error){
        console.log(error);
    }
}

function setGlobalFrameValue(context, frameSelector, valueVariable, value){
    try{
        const frame = context.querySelector(frameSelector);
    frame.contentWindow[valueVariable] = value;
    }catch(error){
        console.log(error);
    }
}

function setExtFrameValue(context, value, frameSelector, targetSelector){
    try{
        const frame = context.querySelector(frameSelector);
    const element = frame.contentDocument.querySelector(targetSelector);
    const elemInput = element.closest('table').querySelector('input, select');

    elemInput.value = value;
    }catch(error){
        console.log(error);
    } 
}

function linkValueToExtFrame(context, variable, frameSelector, targetSelector){
    if (frameElement != null && frameElement.classList.contains('frame')){
        document.querySelector('table').onclick = () => {
            try{
                setExtFrameValue(context, window[variable], frameSelector, targetSelector);
            }catch(error){
                console.log(error);
            }
        }
    }
}