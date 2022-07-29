/* Util to add headerOnClick to all headers */
function addHeaderScriptToAll() {
	document.querySelectorAll('.frameContainer iframe').forEach(function (iframe) {
		const scriptObj = iframe.contentWindow.document.createElement('script');
		const scriptVal = 'let expandBool = false; function findCorrectFrame() { const header = document.querySelector(\'h1\'); let correctFrame; parent.document.querySelectorAll(\'iframe\').forEach(iframe => { if (iframe.contentWindow.document.contains(header)) { correctFrame = iframe; } }); return correctFrame; } function expandFrame(frameSelector, expand) { const frame = parent.document.querySelector(frameSelector); const questionsContainer = document.querySelector(\'#questions_container\'); questionsContainer.hidden = !expand; } function headerOnClick() { expandBool = !expandBool; const frame = findCorrectFrame(); expandFrame(\'#\' + frame.id, expandBool); }';
		scriptObj.text = scriptVal;
		iframe.contentWindow.document.body.appendChild(scriptObj);
	});
}

function addHeaderFuncToAll() {
	document.querySelectorAll('.frameContainer iframe').forEach(iframe => {
		iframe.contentWindow.document.querySelector('.toolHead').onclick = iframe.contentWindow.headerOnClick;
	});
}

/* Set frame height based on content inside of frame */
function idealFrameHeight(iframe) {
	const contentHeight = iframe.contentWindow.document.body.scrollHeight;
	if (contentHeight < 50){
		return (contentHeight + 67) + 'px';
	}
	else if (contentHeight < 200){
		return (contentHeight + 50) + 'px';
	}
	return (contentHeight + 125) + 'px';
}

function setFrameHeightEvents() {
	var iframes = document.querySelectorAll('.frameContainer iframe');
	iframes.forEach(iframe => {
		iframe.contentWindow.document.querySelector('#questions_container').hidden = true;
		iframe.style.height = idealFrameHeight(iframe);
		iframe.contentWindow.document.body.onclick = () => {
			iframe.style.height = idealFrameHeight(iframe);
		};
	});
}