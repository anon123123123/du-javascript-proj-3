// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
async function writePassword(length, lowerCase, upperCase, numbers, specialChars) {
  var password = await generatePassword(length, lowerCase, upperCase, numbers, specialChars);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

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
    console.log(password)
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
  writePassword(length, lowerCase, upperCase, numbers, specialChars)
}