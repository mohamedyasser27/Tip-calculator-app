/*
 * 1) if BillAmount,TipAmount,Number of people --> not empty
 * calculate results
 * 2) price_per_person=total/number of people
 * 3) tip=(percentage * total)/number_of_people
 * 4) total(with tip)=price_per_person+tip
 *
 *input:total,number_of_people
 * output:tip_Amount,total_per_person
 *
 *
 */

let billAmountInput = document.querySelector("#billAmountInput");
let numberOfPeopleInput = document.querySelector("#numberOfPeopleInput");
let alltipSelectors = Array.from(
  document.querySelectorAll(".tipSelector > button")
);
let selectedPercentage = null;

let customTipAmount = document.querySelector(".customTipAmount");
let resetBtn = document.querySelector(".resetBtn");

window.onload = function () {
    resetBtn.disabled=true
}

function checkAll(billAmount, numberOfPeopleInput) {
  let tipPercentage;
  if (selectedPercentage == null) {
    tipPercentage = 1;
  } else {
    tipPercentage = selectedPercentage.value;
  }
  if (
    Number(billAmount) &&
    Number(numberOfPeopleInput) &&
    Number(tipPercentage)
  ) {
    let price_per_person = billAmount / numberOfPeopleInput;
    price_per_person = price_per_person.toFixed(2);

    let tipAmount = (Number(tipPercentage) * Number(billAmount)) / 100;

    tipAmount /= Number(numberOfPeopleInput);
    tipAmount = tipAmount.toFixed(2);
    let total = (Number(tipAmount) + Number(price_per_person)).toFixed(2);

    document.querySelector(
      "#TipAmountValue .Amount"
    ).textContent = `${tipAmount}`;
    document.querySelector("#perPersonValue .Amount").textContent = `${total}`;
    console.log(resetBtn);
    resetBtn.disabled = false;
  }
}

alltipSelectors.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedPercentage == null) {
      selectedPercentage = e.target;
      e.target.classList.add("selected");
    } else {
      selectedPercentage.classList.remove("selected");
      e.target.classList.add("selected");
      selectedPercentage = e.target;
    }
    checkAll(billAmountInput.value, numberOfPeopleInput.value);
    customTipAmount.value = "";
  });
});

customTipAmount.addEventListener("keyup", (e) => {
  if (
    e.keyCode == 190 ||
    e.keyCode == 8 ||
    (e.keyCode >= 48 && e.keyCode <= 57)
  ) {
    if (selectedPercentage == null) {
      selectedPercentage = e.target;
      e.target.classList.add("selected");
    } else {
      selectedPercentage.classList.remove("selected");
      e.target.classList.add("selected");
      selectedPercentage = e.target;
    }
    checkAll(billAmountInput.value, numberOfPeopleInput.value);
  } else {
    e.preventDefault();
  }
});

billAmountInput.addEventListener("keydown", (e) => {
  if (
    e.keyCode == 190 ||
    e.keyCode == 8 ||
    (e.keyCode >= 48 && e.keyCode <= 57)
  ) {
    checkAll(billAmountInput.value, numberOfPeopleInput.value);
  } else {
    e.preventDefault();
  }
});

numberOfPeopleInput.addEventListener("keyup", (e) => {
  if (
    e.keyCode == 190 ||
    e.keyCode == 8 ||
    (e.keyCode >= 48 && e.keyCode <= 57)
  ) {
    if (numberOfPeopleInput.value == "") {
      numberOfPeopleInput.classList.remove("invalid");
      document
        .querySelector(".numberOfPeople > .InputName >span")
        .classList.remove("invalid");
    } else if (Number(numberOfPeopleInput.value) == 0) {
      numberOfPeopleInput.classList.add("invalid");
      document
        .querySelector(".numberOfPeople > .InputName >span")
        .classList.add("invalid");
    } else {
      numberOfPeopleInput.classList.remove("invalid");
      document
        .querySelector(".numberOfPeople > .InputName >span")
        .classList.remove("invalid");
    }
    checkAll(billAmountInput.value, numberOfPeopleInput.value);
  } else {
    e.preventDefault();
  }
});

resetBtn.addEventListener("click", () => {
  let calculations = document.querySelector(".calculations");
  calculations.reset();
  resetBtn.disabled = true;
});
