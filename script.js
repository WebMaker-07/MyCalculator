class MyCalculator {
  constructor(prevcalculation, presentcalculation) {
    this.prevcalculation = prevcalculation;
    this.presentcalculation = presentcalculation;
    this.clear();
  }

clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

joinNumber(number) {//code to collect the number
    if (number === '.' && this.currentOperand.includes('.')) return;//to stop the period insert
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  solution(operation) {//code in every solution click
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
      default:
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayDigit(digit) {
    const stringDigit= digit.toString();// code to convert the digit to string
    const integerDigits = parseFloat(stringDigit.split('.')[0]);//code to convert into parse the string
    const decimalDigits = stringDigit.split('.')[1];
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })//to have comma the digits
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.presentcalculation.innerText =
      this.getDisplayDigit(this.currentOperand)
    if (this.operation != null) {
      this.prevcalculation.innerText =
        `${this.getDisplayDigit(this.previousOperand)} ${this.operation}`
    } else {
      this.prevcalculation.innerText = ''
    }
  }
}

//declare the value
const btnDigits = document.querySelectorAll('.digit');
const btnOperation = document.querySelectorAll('[operation]');
const btnEqual = document.querySelector('[equals]');
const btnDelete = document.querySelector('[delete]');
const btnClearAll = document.querySelector('[all-clear]');
const prevcalculation = document.querySelector('.second-screen');
const presentcalculation = document.querySelector('.first-screen');

const calculator = new MyCalculator(prevcalculation, presentcalculation);//passes the class in a variable 

//code when clicking the digits
btnDigits.forEach(button => {
  button.addEventListener('click', () => {
    calculator.joinNumber(button.innerText);
    calculator.updateDisplay();
  })
})

btnOperation.forEach(button => {//code to in clicking the operation buttons
  button.addEventListener('click', () => {
    calculator.solution(button.innerText);
    calculator.updateDisplay();
  })
})

//code to see the final result through clicking the equalfunction
btnEqual.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

//code for clear all function
btnClearAll.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

//for delete button function
btnDelete.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})