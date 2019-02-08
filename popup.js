'use strict';

//Get keyfield from storage and put in input field. Default value is  "your_word".
chrome.storage.sync.get(['keyfield'], function(result) {
          if(result.keyfield!="" && result.keyfield!=undefined)
          	{
          	document.getElementById('text').value=result.keyfield;
          	}
          else
          	{
    		chrome.storage.sync.set({'keyfield': 'your_word'});
    		document.getElementById('text').value='your_word';      		
          	}
        });



//Get infofmation from storage about switcher that turn off/on script.
chrome.storage.sync.get(['onoff'], function(result) {
			if (result.onoff === 'false') 
				{
				document.getElementById('on-off').checked = false;
				}
			else
				{
				document.getElementById('on-off').checked = true;	
				}

});


//Get inf from storage about swither that hide keyword
chrome.storage.sync.get(['hider'], function(result) {
			if (result.hider === 'hidden') 
				{
				document.getElementById('text').attributes['type'].value = 'password';	
				document.getElementById('hider').checked = true;
				}
			else
				{
				document.getElementById('text').attributes['type'].value = 'text';
				document.getElementById('hider').checked = false;	
				}

});



//Just save button event
document.getElementById('save').addEventListener('click', function() {
	
	let pw=document.getElementById('text').value;
	chrome.storage.sync.set({'keyfield': pw});
	animate('save');

});


//Switch event that turn off/on script
document.getElementById('on-off').addEventListener ('click', function () {


	if (document.getElementById("on-off").checked === true)
			{
			chrome.runtime.sendMessage({onoff: 'true'});
			chrome.storage.sync.set({'onoff': 'true'});
			animate('checked');
			}


	else 
			{
			chrome.runtime.sendMessage({onoff: 'false'});
			chrome.storage.sync.set({'onoff': 'false'});
			animate('uncheked');

			}

});

//Switch event that hide/show inf.
document.getElementById('hider').addEventListener('click', function () {

	if (document.getElementById('hider').checked === true)
		{
			 document.getElementById('text').attributes['type'].value = 'password';
			 chrome.storage.sync.set({'hider': 'hidden'});
			 animate('hidden');
		}
	else
		{
			 document.getElementById('text').attributes['type'].value = 'text';
			 chrome.storage.sync.set({'hider': 'show'});
			 animate('show');	
		}

	
});



//Animate function that show help(status) information. 
const animate = (information) => {

let el=document.getElementById('fadeIn1');
el.classList.add('fadeIn1');

	switch (information) {
	  case 'save':
	    el.innerHTML = 'SAVED';
	    break;
	  case 'checked':
		el.innerHTML = 'ON';
	    break;
	  case 'uncheked':
	    el.innerHTML = 'OFF';
	    break;
	  case 'hidden':
	    el.innerHTML = 'HIDDEN';
	    break;
	  case 'show':
	    el.innerHTML = 'SHOWED';
	    break;
	  }

el.classList.remove('fadeIn1');  
el.classList.add('fadeIn2');
setTimeout(function() { el.classList.remove('fadeIn2');  el.classList.add('fadeIn1'); }, 500); 
};