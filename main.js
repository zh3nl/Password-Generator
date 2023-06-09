const charList = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890~!@#$%^&*?";
const hackingSpeed = 5000;
const passlength = document.getElementById('length');
const generateButton = document.getElementById('generate');
const finalResult = document.getElementById('result'); 
const copyClipboard = document.getElementById('clipboard');
const wordEntropy = document.getElementById('entropy');

function randInt (max) {
  let randomNumber = new Uint8Array(1);
  window.crypto.getRandomValues(randomNumber);
  return Math.floor(randomNumber[0] * max / 256);
}

generate.addEventListener('click', () => {
    const finalLength = +passlength.value; 
    finalResult.innerText = createPassword(finalLength);
    let bits = Math.log2(charList.length) * finalLength; 
    let time = 2**(bits - 42.74535);
    wordEntropy.innerText = "This passphrase has " + Math.floor(bits) + " bits of entropy and would take a hacker " + Math.floor(time) + " hours to crack.";
    console.log(randomizeList(charList));
});

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const finalPass = finalResult.innerText
	
	if(!finalPass) { return; }
	
	textarea.value = finalPass;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard!');
});


function chooseItems (list, num) {
  var subString = "";
  for (var i = 0; i < num; i++) {
    subString += list[randInt(list.length)];
  }
  return subString;
}

function randomizeList (list) { 
  var randomizedList = list.split("");
  var lastUnshuffledIndex = randomizedList.length - 1;
  while (lastUnshuffledIndex > 0) {
    var movedIndex = randInt(lastUnshuffledIndex);
    var movedValue = randomizedList[movedIndex];
    randomizedList[movedIndex] = randomizedList[lastUnshuffledIndex];
    randomizedList[lastUnshuffledIndex] = movedValue;
    lastUnshuffledIndex--;
  }
  return randomizedList.join("");
}

function createPassword (len) {
  return randomizeList(chooseItems(charList.substring(0, 26), 1) + chooseItems(charList.substring(26, 52), 1) + chooseItems(charList.substring(52, 62), 1) +chooseItems(charList.substring(62), 1) + chooseItems(charList, len - 4));
}

function calculateEntropy (list, len) {
  let bits = Math.log2(list.length) * len;
  return Math.floor(2**bits / (hackingSpeed * 3600));
}

