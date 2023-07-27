//para imprimir el resultado en un input
/*
function calculateBMI() {
  var heightInput = document.getElementById("height");
  var weightInput = document.getElementById("weight");
  var resultDiv = document.getElementById("result");

  var height = parseFloat(heightInput.value);
  var weight = parseFloat(weightInput.value);

  if (isNaN(height) || isNaN(weight)) {
    document.getElementById('result').value = "Ingrese una altura y un peso válidos.";
    return;
  }

  var bmi = weight / ((height / 100) ** 2);
  var category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  document.getElementById('result').value = "Tu  Indice de Masa Corporal(BMI) es " + bmi.toFixed(2) + " (" + category + ")";
}*/

//para mostrar el resultado en un div
function calculateBMI() {
  var heightInput = document.getElementById("height");
  var weightInput = document.getElementById("weight");
  var resultDiv = document.getElementById("result");

  var height = parseFloat(heightInput.value);
  var weight = parseFloat(weightInput.value);

  if (isNaN(height) || isNaN(weight)) {
    resultDiv.innerHTML = "Please enter valid height and weight.";
    return;
  }

  var bmi = weight / ((height / 100) ** 2);
  var category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  resultDiv.innerHTML = "Your BMI is " + bmi.toFixed(2) + " (" + category + ")";
}