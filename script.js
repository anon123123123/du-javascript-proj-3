// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", displayPrompt);

// Password Generator 
async function generatePassword(length, lowerCase, upperCase, numbers, specialChars) {
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
    password += chars.substring(randomNumber, randomNumber +1);
   }
   console.log(password)
}

// Display Custom Form
function displayPrompt(){
  document.querySelector('#password-wizard-prompt').classList.remove('hidden')
}

// Character Length Slider Controller 
const slider = document.getElementById("pass-length-slider");
let output = document.getElementById("pass-length");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// Password Options   
var pass_form = document.getElementById('password-wiz-form')
pass_form.onsubmit = function() {
  let length = pass_form['pass-length-slider'].value
  let lowerCase = pass_form['lower-case'].checked
  let upperCase = pass_form['upper-case'].checked
  let numbers = pass_form['numbers'].checked
  let specialChars = pass_form['special-chars'].checked
  generatePassword(length, lowerCase, upperCase, numbers, specialChars)
}