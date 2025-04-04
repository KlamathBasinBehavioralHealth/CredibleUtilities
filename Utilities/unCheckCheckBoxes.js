function unCheckAnswers(questions){
	questions.forEach((question) => {
		let triggers = question.getAttribute('unCheckTrigger').split(',').map(Number);
		let allAnswers = [...question.closest('tr').nextElementSibling.querySelectorAll('input')];
		let indices = Array.from({ length: allAnswers.length}, (_, index) => index);
		let toUncheck = indices.filter(value => !triggers.includes(value));
		triggers.forEach((trigger) => {
			if(allAnswers[trigger].checked){
				toUncheck.forEach((element) => {
					allAnswers[element].checked = false;
				});
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	questions = [...document.querySelectorAll('.unCheck')];
	questions.forEach((question) => {
		[...question.closest('tr').nextElementSibling.querySelectorAll('input')].forEach((answer) => {
			answer.addEventListener('change', () => {
				unCheckAnswers(questions);
			});
			answer.addEventListener('mouseleave', () => {
				unCheckAnswers(questions);
			});
		});
	});
});