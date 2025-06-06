var empname = document.querySelector("#empname");
var BasicSalaryInput = document.querySelector("#basicsalary");
var workdayInput = document.querySelector("#workday");
var workhourInput = document.querySelector("#workhour");
var absenceInput = document.querySelector("#absence");
var OTInput = document.querySelector("#OT");
var BonusInput = document.querySelector("#Bonus");
var OthDedInput = document.querySelector("#OthDed");
var lateInput = document.querySelector("#late");
var btnCalculate = document.querySelector("#calculate");
var tabledeta = document.querySelector("#result");

btnCalculate.onclick = function calculateSalary() {
    // Use new variables for values
    var BasicSalary = parseFloat(BasicSalaryInput.value) || 0;
    var workday = parseFloat(workdayInput.value) || 0;
    var workhour = parseFloat(workhourInput.value) || 0;
    var absence = parseFloat(absenceInput.value) || 0;
    var OT = parseFloat(OTInput.value) || 0;
    var Bonus = parseFloat(BonusInput.value) || 0;
    var OthDed = parseFloat(OthDedInput.value) || 0;
    var late = parseFloat(lateInput.value) || 0;

    // Prevent division by zero
    if (workday === 0 || workhour === 0) {
        alert("Workday and workhour must not be zero.");
        return;
    }

    var totalSalary = BasicSalary / workday * (workday - absence);
    var totalOT = calculateOverTime(BasicSalary, workday, workhour, OT);
    var totalDeduction = calculateDeduction(BasicSalary, workday, workhour, late);
    var GrossSalary = totalSalary + totalOT + Bonus - totalDeduction - OthDed;
    var TaxAmountKHR = TaxCalculation(GrossSalary, 4000); // Tax in KHR
    var TaxAmount = TaxAmountKHR / 4000; // Convert tax back to USD
    var NetSalary = GrossSalary - TaxAmount;

    // Append new row instead of replacing
    tabledeta.innerHTML += `
        <tr>
            <td>${empname.value}</td>
            <td>${BasicSalary.toFixed(2)}</td>
            <td>${workday}</td>
            <td>${workhour}</td>
            <td>${absence}</td>
            <td>${OT}</td>
            <td>${Bonus}</td>
            <td>${OthDed}</td>
            <td>${late}</td>
            <td>$${roundToTwoDecimal(GrossSalary)}</td>
            <td>$${roundToTwoDecimal(TaxAmount)}</td>
            <td>$${roundToTwoDecimal(NetSalary)}</td>
        </tr>`;
};

function calculateOverTime(BasicSalary, workday, workhour, OT) {
    var SalaryPerHour = BasicSalary / workday / workhour;
    return (OT * SalaryPerHour) * 2;
}
function calculateDeduction(BasicSalary, workday, workhour, late) {
    var SalaryPerHour = BasicSalary / workday / workhour;
    var lateHours = late / 60;
    return (SalaryPerHour * lateHours) * 2;
}
function TaxCalculation(AmountToTax, ExchangeRate) {
    var totalSalaryKHR = AmountToTax * ExchangeRate;
    var TaxRate = 0;
    if (totalSalaryKHR <= 1500000) {
        TaxRate = 0;
    } else if (totalSalaryKHR > 1500000 && totalSalaryKHR <= 3000000) {
        TaxRate = 0.05;
    } else if (totalSalaryKHR > 3000000 && totalSalaryKHR <= 5000000) {
        TaxRate = 0.1;
    } else {
        TaxRate = 0.15;
    }
    return totalSalaryKHR * TaxRate;
}
function roundToTwoDecimal(number) {
    return Math.round(number * 100) / 100;
}
// var empname = document.querySelector("#empname");
// var BasicSalary = document.querySelector("#basicsalary");
// var workday = document.querySelector("#workday");
// var workhour = document.querySelector("#workhour");
// var absence = document.querySelector("#absence");
// var OT = document.querySelector("#OT");
// var Bonus = document.querySelector("#Bonus");
// var OthDed = document.querySelector("#OthDed");
// var late = document.querySelector("#late");
// var btnCalculate = document.querySelector("#calculate");
// var tabledeta = document.querySelector("#result");
// btnCalculate.onclick = function calculateSalary() {
//     BasicSalary = parseFloat(BasicSalary.value);
//     workday = parseFloat(workday.value);
//     workhour = parseFloat(workhour.value);
//     absence = parseFloat(absence.value);
//     OT = parseFloat(OT.value);
//     Bonus = parseFloat(Bonus.value);
//     OthDed = parseFloat(OthDed.value);
//     late = parseFloat(late.value);
//     var totalSalary = 0;
//     var totalDeduction = 0;
//     var GrossSalary = 0;
//     var totalOT = 0;
//     var TaxAmount = 0;
//     var NetSalary = 0;
//     // A
//     totalSalary = BasicSalary / workday * (workday - absence);
//     // B
//     totalOT = calculateOverTime(BasicSalary, workday, workhour, OT);
//     // C
//     totalDeduction = calculateDeduction(BasicSalary, workday, workhour, late);
//     // D
//     GrossSalary = totalSalary + totalOT + Bonus - totalDeduction - OthDed;
//     // E
//     TaxAmount = TaxCalculation(GrossSalary, 4000); // Assuming ExchangeRate is 4000 KHR/USD
//     // F
//     NetSalary = GrossSalary - TaxAmount;
//     // Display the result in the table
//     tabledeta.innerHTML = `
//         <tr>
//             <td>${empname.value}</td>
//             <td>${BasicSalary.toFixed(2)}</td>
//             <td>${workday}</td>
//             <td>${workhour}</td>
//             <td>${absence}</td>
//             <td>${OT}</td>
//             <td>${Bonus}</td>
//             <td>${OthDed}</td>
//             <td>${late}</td>
//             <td>$${roundToTwoDecimal(GrossSalary)}</td>
//             <td>$${roundToTwoDecimal(TaxAmount)}</td>
//             <td>$${roundToTwoDecimal(NetSalary)}</td>
//         </tr>`;
// }
// function calculateOverTime(BasicSalary,workday,workhour,OT){
//     var overtime = 0;
//     var SalaryPerHour = BasicSalary / workday / workhour;
//     overtime = (OT * SalaryPerHour ) * 2;
//     return overtime;
// }
// function calculateDeduction(BasicSalary,workday,workhour,late){
//     var DeductionAmount = 0;
//     var SalaryPerHour = BasicSalary / workday / workhour;
//     var lateHours = late / 60; // Convert minutes to hours
//     DeductionAmount = (SalaryPerHour * lateHours)*2;
//     return DeductionAmount;
// }
// function TaxCalculation(AmountToTax, ExchangeRate) {
//     var totalSalaryKHR = AmountToTax * ExchangeRate;
//     var TaxAmount = 0;
//     var TaxRate = 0;
//     if (totalSalaryKHR <= 1500000) {
//         TaxRate = 0;
//     } else if (totalSalaryKHR > 1500000 && totalSalaryKHR <= 3000000) {
//         TaxRate = 0.05;
//     } else if (totalSalaryKHR > 3000000 && totalSalaryKHR <= 5000000) {
//         TaxRate = 0.1;
//     } else {
//         TaxRate = 0.15;
//     }
//     TaxAmount = totalSalaryKHR * TaxRate;
//     return TaxAmount;
// }
// function roundToTwoDecimal(number) {
//     return Math.round(number * 100) / 100;
// }
