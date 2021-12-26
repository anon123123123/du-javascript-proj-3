// Assignment Code
var generateBtn = document.querySelector("#generate");

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
  document.getElementById('copy-pass').classList.remove('hidden')
  document.getElementById('show-pass').classList.remove('hidden')
}

// Add event listener to generate button
generateBtn.addEventListener("click", displayPrompt);

// Password Generator 
async function generatePassword(length, lowerCase, upperCase, numbers, specialChars) {
  return new Promise(resolve => {
    // Blank vars to be filled 
    var chars = "";
    var password = "";
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
function displayPrompt() {
  document.querySelector('#password-wizard-prompt').classList.toggle('hidden')
}

// Character Length Slider Controller 
const slider = document.getElementById("pass-length-slider");
let output = document.getElementById("pass-length");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
}

// Password Options   
let pass_form = document.getElementById('password-conf')
pass_form.onclick = function () {
  let length = document.getElementById('pass-length-slider').value
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
let showBtn = document.getElementById('show-pass')
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
let copyBtn = document.getElementById('copy-pass')
copyBtn.addEventListener("click", copyPass);

async function copyPass() {
  let copyText = document.getElementById("password_hidden").value;
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