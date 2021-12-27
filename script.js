// Assignment Code
// Constants 
const generateBtn = document.querySelector("#generate");
const showBtn = document.getElementById('show-pass')
const copyBtn = document.getElementById('copy-pass')
const slider = document.getElementById("pass-length-slider");
const output = document.getElementById("pass-length");

// Write password to the #password input
async function writePassword(length, lowerCase, upperCase, numbers, specialChars) {
  let password = await generatePassword(length, lowerCase, upperCase, numbers, specialChars);
  let stars = "*"
  let passHideStars = stars.repeat(length)
  let passwordText = document.querySelector("#password");
  let passwordStars = document.querySelector("#password_hidden");
  passwordText.value = passHideStars;
  passwordStars.value = password;
  // Unhide password copy /show buttons and hide real pass
  copyBtn.classList.remove('hidden')
  showBtn.classList.remove('hidden')
}

// Add event listener to generate button
generateBtn.addEventListener("click", displayPrompt);

// Password Generator 
async function generatePassword(length, lowerCase, upperCase, numbers, specialChars) {
  return new Promise(resolve => {
    // Blank vars to be filled 
    let chars = "";
    let password = "";
    let base_char = "abcdefghijklmnopqrstuvwxyz"
    // IFs check options and create char set 
    if (lowerCase === true) {
      chars += base_char
    }
    if (upperCase === true) {
      let upCase = base_char.toUpperCase()
      chars += upCase
    }
    if (numbers === true) {
      chars += '0123456789'
    }
    if (specialChars === true) {
      chars += '!@#$%^&*()'
    }
    for (let i = 0; i <= length; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.querySelector('#password-wizard-prompt').classList.toggle('hidden')
    resolve(password)
  });
}

// Display Custom Form
async function displayPrompt() {
  document.querySelector('#password-wizard-prompt').classList.toggle('hidden')
}

// Character Length Slider Controller add values to txt
output.innerText= slider.value;

// Leaving Synchronous for proper display of value  
slider.oninput = async function ()  {
  let x = await slider.value
  output.innerText= x;
}

// Password Options   
let pass_form = document.getElementById('password-conf')
pass_form.onclick = function () {
  showBtn.innerText = "Show"
  let length = slider.value
  let lowerCase = document.getElementById('lower-case').checked
  let upperCase = document.getElementById('upper-case').checked
  let numbers = document.getElementById('numbers').checked
  let specialChars = document.getElementById('special-chars').checked
  //Perform validate 
  let boxCheck = validatePassSelect()
  if (boxCheck === true) {
    writePassword(length, lowerCase, upperCase, numbers, specialChars)
  } else {
    return
  }
}

// Show Button Functions 
showBtn.addEventListener("click", showPass);

async function showPass() {
  let realPass = document.getElementById('password_hidden').value
  if (showBtn.innerText === "Show") {
    document.getElementById('password').value = realPass
    showBtn.innerText = "Hide"
  } else {
    let star = "*"
    let length = realPass.length
    let hidePass = star.repeat(length)
    document.getElementById('password').value = hidePass
    showBtn.innerText = "Show"
  }
}

// Copy Button Functions 
copyBtn.addEventListener("click", copyPass);

async function copyPass() {
  let copyText = await document.getElementById("password_hidden").value;
  navigator.clipboard.writeText(copyText)
}

// Validation Function Ensure One Selection
function validatePassSelect() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
  if (checkedOne === false) {
    alert('You Must Select at Least One Character Set')
    return false
  } else {
    return true
  }
}