function checkDrinks(){
	if($('tr').has('div#drinksPastYear').find('td:contains("Yes")').prev('td').find('input[type="radio"]').is(':checked')){
		console.log('Drinks Yes');
	}
}

$('document').ready(function(){
	checkDrinks();
	$('tr').has('div[id=drinksPastYear]').find('input').change(checkDrinks);
});
