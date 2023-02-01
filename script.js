let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");
let form = document.getElementById("form");
let dice = document.getElementById("dice");

let userData = [];

//form appears when the user clicks on the image1

let img1Clicked = false;
img1.addEventListener("click", () => {
  if (!img1Clicked) {
    img1Clicked = true;
    img1.setAttribute("disabled", true);
    form.style.display = "block";
  }
});

let formFilled = false;

// And disappears when the user fills and submits the form

let submit = document.getElementById("submitBtn");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  if (
    !formFilled &&
    name.length > 0 &&
    email.length > 0 &&
    username.length > 0
  ) {
    userData.push({ name: name, email: email, username: username });
    formFilled = true;
    form.style.display = "none";
  } else {
    alert("Please fill out all fields");
  }
});

// When the user clicks on the image2 , Name and Username is displayed

let img2Clicked = false;
img2.addEventListener("click", () => {
  if (userData == "") {
    alert("Please fill out all fields first on click IMAGE ONE");
  } else {
    let showUser = document.getElementById("showUser");
    let displayName = document.getElementById("displayName");
    let displayUsername = document.getElementById("displayUsername");

    showUser.style.display = "block";

    displayName.innerHTML = userData[0].name;
    displayUsername.innerHTML = userData[0].username;
    img2Clicked = true;
  }
});

// When the user clicks on the image3 , A dice pic is show and the user can click on the image to roll the dice
// if the user gets points below 10 then the user is allowed one more chance to roll the dice

let img3Clicked = false;
let img4Clicked = false;
let diceRolls = [];
let diceRollsSum = 0;
let tries = 0;

function shake() {
  let element = document.getElementById("dice");
  element.style.animationName = "shake";
  setTimeout(function () {
    element.style.animationName = "";
  }, 500);
  let roll = Math.floor(Math.random() * 6) + 1;
  diceRolls.push(roll);
  diceRollsSum += roll;

  if (diceRolls.length >= 3) {
    if (diceRollsSum > 10) {
      img3Clicked = true;
      img4Clicked = true;
      img3.style.display = "inline";
      dice.style.display = "none";
    } else if (tries < 1) {
      diceRolls = [];
      diceRollsSum = 0;
      tries++;
      alert("Try again, you need to score more than 10!");
    } else {
      document.getElementById("coupon-code").innerHTML = "BAD LUCK";
      img3Clicked = true;
      img4Clicked = false;
      document.getElementById("dice").style.display = "none";
      img3.style.display = "inline";
    }
  }
}

document.getElementById("dice").addEventListener("click", shake);

img3.addEventListener("click", () => {
  if (img2Clicked) {
    if (!img3Clicked) {
      document.getElementById("dice").style.display = "inline";
      img3.style.display = "none";
    } else {
      document.getElementById("dice").style.display = "none";
      img3.style.display = "inline";
    }
  }
});

// When the user clicks on the image4 , Coupon code is generated and displayed on the page and an congratulations image is shown

function generateCoupon() {
  if (img4Clicked) {
    let coupon = "";
    const possibleCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 12; i++) {
      coupon += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }
    let couponDisplay = document.getElementById("coupon-code");
    couponDisplay.innerHTML = "Coupon : " + coupon;
    let couponImage = document.getElementById("coupon-image");
    couponImage.style.display = "inline";

    img4Clicked = false;
  }
}

img4.addEventListener("click", generateCoupon);
