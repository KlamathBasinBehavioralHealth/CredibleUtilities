let expandBool = false;

/* Returns the direct parent frame of the h1 inside of iframe */
function findCorrectFrame() {
	const header = document.querySelector('h1');
	let correctFrame;
	parent.document.querySelectorAll('iframe').forEach(iframe => {
		if (iframe.contentWindow.document.contains(header)) {
			correctFrame = iframe;
		}
	});
	return correctFrame;
}

/*** Adjusts frame height to match expanding frame content ***/
function expandFrame(frameSelector, expand) {
	const frame = parent.document.querySelector(frameSelector);
	const questionsContainer = document.querySelector('#questions_container');
	questionsContainer.hidden = !expand;
}

/* Hide form elements on header click */
function headerOnClick() {
	expandBool = !expandBool;
	const frame = findCorrectFrame();
	expandFrame('#' + frame.id, expandBool);
}

const scriptVal = 'let expandBool = false; function findCorrectFrame() { const header = document.querySelector(\'h1\'); let correctFrame; parent.document.querySelectorAll(\'iframe\').forEach(iframe => { if (iframe.contentWindow.document.contains(header)) { correctFrame = iframe; } }); return correctFrame; } function expandFrame(frameSelector, expand) { const frame = parent.document.querySelector(frameSelector); const questionsContainer = document.querySelector(\'#questions_container\'); questionsContainer.hidden = !expand; } function headerOnClick() { expandBool = !expandBool; const frame = findCorrectFrame(); expandFrame(\'#\' + frame.id, expandBool); }';