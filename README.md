![Image alt](https://github.com/TravisJr/Enigma-Chrome-Extension/blob/master/images/get_started128.png)

# Enigma Chrome Extension

This is a simple Google Chrome extension that allows you to encode selected text. 

The essence of the encryption algorithm is the code word that the user enters in the settings.
After entering a code word using method **charCodeAr()**, the sum of all character codes is calculated.
Then the sum of the code word is added to each character of the selected text. When decoding everything happens in reverse order.

## How to install
1) Clone or download Enigma-Chrome-Extension repo; 
2) Open Google Chrome
3) Go to **<chrome://extensions/>**
4) Turn on Developer mode;
5) Click the `Load unpacked extension` button and select the unzipped folder for your extension to install it.
6) Turn on Enigma Eye
7) Enjoy) 

## Interesting solution

The extension automatically scans the page for the presence of encrypted text. The search uses a regular expression.
For easy search and exclusion of false text, tag **[ENIGMA]** is used. To replace the text on the page used library **findAndReplaceDOMtext**.
(https://github.com/padolsey/findAndReplaceDOMText)

### Enigma

The project was named after the German information coding machine that  was invented by the German engineer Arthur Scherbius at the end of World War I.
Enigma machine of course has nothing to do with the encryption methods in this project. If you want to learn more about the encryption method in this machine, you can read about it here.
(https://en.wikipedia.org/wiki/Enigma_machine)
