// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Password Generator 
async function generatePassword() {
  
}

async function getNumChars() {

  document.querySelector('#password-wizard-prompt').classList.remove('hidden-prompt')
  
}
var slider = document.getElementById("pass-length-slider");
var output = document.getElementById("pass-length");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}