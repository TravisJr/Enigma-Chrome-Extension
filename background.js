
'use strict';

var keycode, activescript;

//Get keycode from storage
chrome.storage.sync.get(['keyfield'], function (result) {
          		
        let word=result.keyfield;
		let code=0;


        for (let i=0; i<word.length;i++)
			{
				code+=word.charAt(i).charCodeAt();

			}

			keycode=code;

        });





const contextMenuItem = {
	"id": "enc",
	"title": "Encrypt and Copy",
	"contexts": ["selection"]
};


//About swicher that can be off
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.onoff === 'true') 
		{
			activescript = true;
		}	
	else
		{
			activescript = false;
		}
});



//Create context menu
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create(contextMenuItem);
});


//Event context menu
chrome.contextMenus.onClicked.addListener(function encfun(clickData) {
	
	if (activescript===true) {

		let lock = clickData.selectionText,symbol,curline,encline;
		let encline2="[ENIGMA]";
		let multiplier;

		if (clickData.menuItemId=="enc" && clickData.selectionText)

			{
							
				for (let i=0; i<lock.length;i++)
					{
						symbol=lock.charAt(i);
						if (symbol.charCodeAt() & 1) 
							{
							encline2+=symbol.charCodeAt()+keycode+'.';		
							}
						else
							{

							encline2+=symbol.charCodeAt()/2+keycode+'*'+'.';
							}
					}
			}

			encline2+="[ENIGMA]";
			copy(encline2);
	}
       
});


//Sand message to custom.js that page was updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		

	if (activescript===true) 
		{
			chrome.tabs.sendMessage(tab.id, {status: 'Updated'});

		}
});








//Copy to boardclip. I use execCommand because Async Clipboard API have bad browser support. This
// method named is Flash. 
const copy = (str) => {

	let tmp   = document.createElement('INPUT'), // Create nw text field- input
	focus = document.activeElement; // Get focus link
	tmp.value = str; // Insert text into input 
	document.body.appendChild(tmp); //  input to DOM
	tmp.select(); // Select text
	document.execCommand('copy'); 
	document.body.removeChild(tmp); // Delete input
	focus.focus(); // Focus back

};