let billAmountInput = document.querySelector("#billAmountInput");
let numberOfPeopleInput = document.querySelector("#numberOfPeopleInput");
let alltipSelectors = Array.from(
  document.querySelectorAll(".tipSelector > button")
);
let selectedPercentage = null;

let customTipAmount = document.querySelector(".customTipAmount");
let resetBtn = document.querySelector(".resetBtn");

window.onload = function () {
  resetBtn.disabled = true;
};

function checkAllInputExistence(billAmount, numberOfPeopleInput) {
  if (numberOfPeopleInput == 0) {
    showTipAmountOnDOM(0.0, 0.0);
  }
  let tipPercentage;
  if (selectedPercentage == null) {
    tipPercentage = 0;
  } else {
    tipPercentage = selectedPercentage.value;
  }
  if (
    Number(billAmount) &&
    Number(numberOfPeopleInput) &&
    Number(tipPercentage)
  ) {
    let tipAmount = calculateTipPerPerson(
      billAmount,
      numberOfPeopleInput,
      tipPercentage
    );
    let total = calculateTotalPerPerson(
      billAmount,
      numberOfPeopleInput,
      tipAmount
    );

    showTipAmountOnDOM(tipAmount, total);
    resetBtn.disabled = false;
  }
}

function calculatePricePerPersonNOTAXES(billAmount, numberOfPeopleInput) {
  let price_per_person = billAmount / numberOfPeopleInput;
  price_per_person = price_per_person;
  return price_per_person;
}

function calculateTipPerPerson(billAmount, numberOfPeopleInput, tipPercentage) {
  let tipAmount = (Number(tipPercentage) * Number(billAmount)) / 100;
  tipAmount /= Number(numberOfPeopleInput);
  tipAmount = tipAmount.toFixed(2);

  return +tipAmount;
}

function calculateTotalPerPerson(billAmount, numberOfPeopleInput, tipAmount) {
  let price_per_person = calculatePricePerPersonNOTAXES(
    billAmount,
    numberOfPeopleInput
  );
  let total = (Number(tipAmount) + Number(price_per_person)).toFixed(2);

  return +total;
}

function selectTipAmountOnDOM(target) {
  if (selectedPercentage == null) {
    selectedPercentage = target;
    target.classList.add("selected");
  } else {
    selectedPercentage.classList.remove("selected");
    target.classList.add("selected");
    selectedPercentage = target;
  }
}

function showTipAmountOnDOM(tipAmount, total) {
  document.querySelector(
    "#TipAmountValue .Amount"
  ).textContent = `$${tipAmount.toFixed(2)}`;

  document.querySelector(
    "#perPersonValue .Amount"
  ).textContent = `$${total.toFixed(2)}`;
}

alltipSelectors.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    selectTipAmountOnDOM(e.target);
    checkAllInputExistence(billAmountInput.value, numberOfPeopleInput.value);
    customTipAmount.value = "";
  });
});

customTipAmount.addEventListener("keydown", (e) => {
  if (
    e.keyCode == 190 ||
    e.keyCode == 8 ||
    (e.keyCode >= 48 && e.keyCode <= 57)
  ) {
    selectTipAmountOnDOM(e.target);
    checkAllInputExistence(billAmountInput.value, numberOfPeopleInput.value);
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
    checkAllInputExistence(billAmountInput.value, numberOfPeopleInput.value);
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
    toggleInvalidClass();
    checkAllInputExistence(billAmountInput.value, numberOfPeopleInput.value);
  } else {
    e.preventDefault();
  }
});

function toggleInvalidClass() {
  let numberOfPeopleInputBefore = document.querySelector(
    ".numberOfPeople > .InputName >span"
  );

  if (numberOfPeopleInput.value == "") {
    numberOfPeopleInput.classList.remove("invalid");
    numberOfPeopleInputBefore.classList.remove("invalid");
  } else if (Number(numberOfPeopleInput.value) == 0) {
    numberOfPeopleInput.classList.add("invalid");
    numberOfPeopleInputBefore.classList.add("invalid");
  } else {
    numberOfPeopleInput.classList.remove("invalid");
    numberOfPeopleInputBefore.classList.remove("invalid");
  }
}

resetBtn.addEventListener("click", () => {
  let calculations = document.querySelector(".calculations");
  calculations.reset();
  resetBtn.disabled = true;
});
