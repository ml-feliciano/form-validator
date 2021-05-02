const form = document.querySelector(".signup-form");
const usernameUI = document.querySelector("#username");
const emailUI = document.querySelector("#email");
const passwordUI = document.querySelector("#password");
const confirmPasswordUI = document.querySelector("#confirm-password");
const signUpBtn = document.querySelector("button");


const inputMap = new Map();
inputMap.set("usernameMin", 3);
inputMap.set("usernameMax", 12);
inputMap.set("passwordMin", 8);
inputMap.set("passwordMax", 20);
inputMap.set("usernameValid", false);
inputMap.set("emailValid", false);
inputMap.set("passwordValid", false);
inputMap.set("confirm-passwordValid", false);



function showError(element, errorMsg){
    element.classList.remove("success");
    element.classList.add("error");
    element.parentElement.querySelector(".message").innerText = errorMsg;
    element.parentElement.querySelector(".message").classList.remove("invisible");
    element.parentElement.querySelector(".message").classList.add("visible");
}

function showSuccess(element){
    element.classList.remove("error");
    element.classList.add("success");
    element.parentElement.querySelector(".message").classList.remove("visible");
    element.parentElement.querySelector(".message").classList.add("invisible");
}


function validateLength(){
    const min = inputMap.get(`${this.id}Min`);
    const max = inputMap.get(`${this.id}Max`);
    if(this.value.length < min || this.value.length > max){
        showError(this, `Please enter ${min} to ${max} characters for the ${this.id}.`);
        inputMap.set(`${this.id}Valid`, false);
    }else{
        showSuccess(this);
        inputMap.set(`${this.id}Valid`, true);
    }
}

function confirmPassword(){
    if(passwordUI.value !== confirmPasswordUI.value || confirmPasswordUI.value === ""){
        showError(confirmPasswordUI, "Password not matching.");
        inputMap.set("confirm-passwordValid", false);
    }else{
        showSuccess(confirmPasswordUI);
        inputMap.set("confirm-passwordValid", true);
    }
}

function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateEmail(){
    if(!checkEmail(emailUI.value)){
        showError(emailUI, "Please enter a valid email address.");
        inputMap.set("emailValid", false);
    }else{
        showSuccess(emailUI);
        inputMap.set("emailValid", true);
    }
}

function validateForm(){
    if(inputMap.get("usernameValid") === true && 
    inputMap.get("emailValid") === true && 
    inputMap.get("passwordValid") === true && 
    inputMap.get("confirm-passwordValid") === true){
        signUpBtn.style.backgroundColor = "#29bb89";
        signUpBtn.disabled = false;
    }else{
        signUpBtn.style.backgroundColor = "#546861";
        signUpBtn.disabled = true;
    }
}

form.addEventListener("keyup", validateForm);
usernameUI.addEventListener("keyup", validateLength);
passwordUI.addEventListener("keyup", validateLength);
confirmPasswordUI.addEventListener("keyup", confirmPassword);
emailUI.addEventListener("keyup", validateEmail);
