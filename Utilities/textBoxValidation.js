/*
HOW TO USE:
1. add the class of validEmail and/or noSpecialChar and/or addressOne depending on which one you want to use.
2. add <Text Box Validator> <script type='text/javascript' src='https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@da34423/Utilities/textBoxValidation.js'></script> as a no label checkbox. Ensure the @da34423 matches the most recent version.
3. done.
*/


// Function to check emails
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(email)){
	console.log('Valid Email');
  } else {
	alert("Please Ensure A Valid Email");
  }
  return(emailRegex.test(email));
}

// Add these event listers to the specific text boxes that have the respective classes
document.addEventListener('DOMContentLoaded', () => {
	[...document.querySelectorAll('.validEmail')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('change', function(){
			isValidEmail(this.value);
		});
		/* Commenting this mouse leave out. It acts odd since it triggers a second alert of the first change event happens and an alert popped up. Causes 2 alerts if the first alert happens.
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('mouseleave', function() {
			console.log("Mouse left the input field");
			let delayedString1 = this.value;
			let inputField = this;
			setTimeout(function() {
				let delayedString2 = inputField.value;
				if (delayedString1 === delayedString2) {
					isValidEmail(inputField.value);
				}
			}, 1000);
		});
                */
		// Make it so the email box can't even have spaces.
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('input', function() {
			const spaceRegex = /\s/g;
			this.value = this.value.replace(spaceRegex, '');	
			console.log('no spaces allowed');
		});
	});
	// This makes sure that no special characters allowed (only numbers and letters)
	[...document.querySelectorAll('.noSpecialChar')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('input', function() {
			const specialCharRegex = /[^a-zA-Z0-9\s]/g;
			this.value = this.value.replace(specialCharRegex, '');
			console.log('no special characters allowed');
		});
	});
	// This alerts if it is missing an address suffix.
	[...document.querySelectorAll('.addressOne')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('change', function () {
			let value = this.value.trim();

			let startsWithNumber = /^\d/.test(value);

			let endsWithSuffix = /\b(?:Allee|Alley|Ally|Aly|Anex|Annex|Annx|Anx|Arc|Arcade|Av|Ave|Aven|Avenu|Avenue|Avn|Avnue|Bayoo|Bayou|Bch|Beach|Bend|Bg|Bgs|Blf|Blfs|Bluf|Bluff|Bluffs|Blvd|Bnd|Bot|Bottm|Bottom|Boul|Boulevard|Boulv|Br|Branch|Brdge|Brg|Bridge|Brk|Brks|Brnch|Brook|Brooks|Btm|Burg|Burgs|Byp|Bypa|Bypas|Bypass|Byps|Byu|Camp|Canyn|Canyon|Cape|Causeway|Causwa|Cen|Cent|Center|Centers|Centr|Centre|Cir|Circ|Circl|Circle|Circles|Cirs|Clb|Clf|Clfs|Cliff|Cliffs|Club|Cmn|Cmns|Cmp|Cnter|Cntr|Cnyn|Common|Commons|Cor|Corner|Corners|Cors|Course|Court|Courts|Cove|Coves|Cp|Cpe|Crcl|Crcle|Creek|Cres|Crescent|Crest|Crk|Crossing|Crossroad|Crossroads|Crse|Crsent|Crsnt|Crssng|Crst|Cswy|Ct|Ctr|Ctrs|Cts|Curv|Curve|Cv|Cvs|Cyn|Dale|Dam|Div|Divide|Dl|Dm|Dr|Driv|Drive|Drives|Drs|Drv|Dv|Dvd|Est|Estate|Estates|Ests|Exp|Expr|Express|Expressway|Expw|Expy|Ext|Extension|Extensions|Extn|Extnsn|Exts|Fall|Falls|Ferry|Field|Fields|Flat|Flats|Fld|Flds|Fls|Flt|Flts|Ford|Fords|Forest|Forests|Forg|Forge|Forges|Fork|Forks|Fort|Frd|Frds|Freeway|Freewy|Frg|Frgs|Frk|Frks|Frry|Frst|Frt|Frway|Frwy|Fry|Ft|Fwy|Garden|Gardens|Gardn|Gateway|Gatewy|Gatway|Gdn|Gdns|Glen|Glens|Gln|Glns|Grden|Grdn|Grdns|Green|Greens|Grn|Grns|Grov|Grove|Groves|Grv|Grvs|Gtway|Gtwy|Harb|Harbor|Harbors|Harbr|Haven|Hbr|Hbrs|Heights|Highway|Highwy|Hill|Hills|Hiway|Hiwy|Hl|Hllw|Hls|Hollow|Hollows|Holw|Holws|Hrbor|Ht|Hts|Hvn|Hway|Hwy|Inlet|Inlt|Is|Island|Islands|Isle|Isles|Islnd|Islnds|Iss|Jct|Jction|Jctn|Jctns|Jcts|Junction|Junctions|Junctn|Juncton|Key|Keys|Knl|Knls|Knol|Knoll|Knolls|Ky|Kys|Lake|Lakes|Land|Landing|Lane|Lck|Lcks|Ldg|Ldge|Lf|Lgt|Lgts|Light|Lights|Lk|Lks|Ln|Lndg|Lndng|Loaf|Lock|Locks|Lodg|Lodge|Loop|Loops|Mall|Manor|Manors|Mdw|Mdws|Meadow|Meadows|Medows|Mews|Mill|Mills|Mission|Missn|Ml|Mls|Mnr|Mnrs|Mnt|Mntain|Mntn|Mntns|Motorway|Mount|Mountain|Mountains|Mountin|Msn|Mssn|Mt|Mtin|Mtn|Mtns|Mtwy|Nck|Neck|Opas|Orch|Orchard|Orchrd|Oval|Overpass|Ovl|Park|Parks|Parkway|Parkways|Parkwy|Pass|Passage|Path|Paths|Pike|Pikes|Pine|Pines|Pkway|Pkwy|Pkwys|Pky|Pl|Place|Plain|Plains|Plaza|Pln|Plns|Plz|Plza|Pne|Pnes|Point|Points|Port|Ports|Pr|Prairie|Prk|Prr|Prt|Prts|Psge|Pt|Pts|Rad|Radial|Radiel|Radl|Ramp|Ranch|Ranches|Rapid|Rapids|Rd|Rdg|Rdge|Rdgs|Rds|Rest|Ridge|Ridges|Riv|River|Rivr|Rnch|Rnchs|Road|Roads|Route|Row|Rpd|Rpds|Rst|Rte|Rue|Run|Rvr|Shl|Shls|Shoal|Shoals|Shoar|Shoars|Shore|Shores|Shr|Shrs|Skwy|Skyway|Smt|Spg|Spgs|Spng|Spngs|Spring|Springs|Sprng|Sprngs|Spur|Spurs|Sq|Sqr|Sqre|Sqrs|Sqs|Squ|Square|Squares|St|Sta|Station|Statn|Stn|Str|Stra|Strav|Straven|Stravenue|Stravn|Stream|Street|Streets|Streme|Strm|Strt|Strvn|Strvnue|Sts|Sumit|Sumitt|Summit|Ter|Terr|Terrace|Throughway|Tpke|Trace|Traces|Track|Tracks|Trafficway|Trail|Trailer|Trails|Trak|Trce|Trfy|Trk|Trks|Trl|Trlr|Trlrs|Trls|Trnpk|Trwy|Tunel|Tunl|Tunls|Tunnel|Tunnels|Tunnl|Turnpike|Turnpk|Un|Underpass|Union|Unions|Uns|Upas|Valley|Valleys|Vally|Vdct|Via|Viadct|Viaduct|View|Views|Vill|Villag|Village|Villages|Ville|Villg|Villiage|Vis|Vist|Vista|Vl|Vlg|Vlgs|Vlly|Vly|Vlys|Vst|Vsta|Vw|Vws|Walk|Walks|Wall|Way|Ways|Well|Wells|Wl|Wls|Wy|Xing|Xrd|Xrds)\b$/i.test(value);

			if (!startsWithNumber) {
				alert('Address should start with a number unless homeless or PO Box.');
			} else if (!endsWithSuffix) {
				alert('Address should end with a valid street suffix (e.g., St, Ave, Blvd) unless homeless or PO Box.');
			} else {
				console.log('Valid address format.');
			}
		});
	});
});
