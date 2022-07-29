function exclusiveCheckbox(e){
	const elemRow = e.target.closest('tr');
	e.target.closest('table').querySelectorAll('tr').forEach(row => {
    if(row.textContent !== elemRow.textContent ){
    	if (row.querySelector('input').checked == true){
      	row.querySelector('input').checked = false;
      }
    }
  });
}

function deployExclusiveCheckbox(selector){
    document.querySelectorAll(selector).forEach((elem) => {
        if (elem.closest('tr').querySelector('input') != null){
            const input = elem.closest('tr').querySelector('input');
            input.onclick = (e) => {
                exclusiveCheckbox(e);
            }
        }
    });
}