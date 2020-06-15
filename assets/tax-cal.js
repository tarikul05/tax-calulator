var total_taxable_ammount
var total_salary
var basic_salary;
var basic_salary_yearly;
var house_rent;
var house_rent_yearly;
var house_rent_tax;
var medical_alow;
var medical_alow_yearly;
var medical_alow_tax;
var convence;
var convence_yearly;
var convence_tax;
var total_bonus=0;

var invesmentRate = 25;
var taxRebaseOnInvasmentRate = 15;
var minimumTaxAmount = 5000;


var totalTax =0;

$('body').on('focusout', '#totMonthlySalary', function(event) {
	event.preventDefault();
	if (+$(this).val() < 25000 ) {
		$('#modal-id').modal()
	}else{
		taxCalculation(+$(this).val())
	}
});
$("form").submit(function (e) {
    e.preventDefault();
    $("#totMonthlySalary").trigger('focusout')
});
function taxCalculation(salary){
	total_salary = salary;
	basic_salary = salary*0.6;

	checkIsBonus(); 

	BaseSalaryCal(salary)
	HouseRentCal(basic_salary)
	MedicalAllCal(basic_salary)
	ConvenceCal(basic_salary)
	gtotal();

	// check();
}

function BaseSalaryCal(tot_sal){
	basic_salary = tot_sal*0.6;
	basic_salary_yearly = (tot_sal*0.6)*12;
	$("#basicSalm").text(basic_salary);
	$("#basicSaly").text(basic_salary_yearly);
	$("#basicSalTax").text(basic_salary_yearly);
}

function HouseRentCal(tot_sal){
	house_rent = tot_sal*0.5;
	house_rent_yearly = house_rent*12;
	house_rent_tax = 0;
	if (house_rent_yearly > 1800000) {
		house_rent_tax = (house_rent_yearly-1800000)
		$("#houseRent .taxable").text("Your taxable amount is "+house_rent_yearly+" - 1800000 = "+house_rent_tax+" BDT")
	}
	$("#houseRentm").text(house_rent);
	$("#houseRenty").text(house_rent_yearly);
	$("#houseRentTax").text(house_rent_tax);
	$(".house_sal").text(house_rent);
}

function MedicalAllCal(tot_sal){
	medical_alow = tot_sal*0.1;
	medical_alow_yearly = medical_alow*12;
	medical_alow_tax = 0;
	if (medical_alow_yearly > 120000) {
		medical_alow_tax = (medical_alow_yearly-120000)
		$("#medicalAllow .taxable").text("Your taxable amount is "+medical_alow_yearly+" - 120000 = "+medical_alow_tax+" BDT")
	}
	$("#medicalAllowm").text(medical_alow);
	$("#medicalAllowy").text(medical_alow_yearly);
	$("#medicalAllowTax").text(medical_alow_tax);
	$(".medical_sal").text(medical_alow);
}

function ConvenceCal(tot_sal){
	convence = total_salary-(basic_salary+house_rent+medical_alow);
	convence_yearly = convence*12;
	convence_tax = 0;
	if (convence_yearly > 30000) {
		convence_tax = (convence_yearly-30000)
		$("#convence .taxable").text("Your taxable amount is "+convence_yearly+" - 30000 = "+convence_tax+" BDT")
	}
	$("#convencem").text(convence);
	$("#convencey").text(convence_yearly);
	$("#convenceTax").text(convence_tax);
	$(".convence_sal").text(convence);
}


$("#isBonus, #isFemale").click(function(event) {
	$("#totMonthlySalary").trigger('focusout')
});

function checkIsBonus(){
	if ($("#isBonus").is(":checked")) {
		total_bonus = total_salary
		$("#bonusy").text(total_bonus);
		$("#bonusTax").text(total_bonus);
	}else{
		total_bonus = 0
		$("#bonusy").text(total_bonus);
		$("#bonusTax").text(total_bonus);
	}
}

function gtotal(){
	total_taxable_ammount = basic_salary_yearly+house_rent_tax+medical_alow_tax+convence_tax+total_bonus;
	$("#gtotalm").text(basic_salary+house_rent+medical_alow+convence);
	$("#gtotaly").text(basic_salary_yearly+house_rent_yearly+medical_alow_yearly+convence_yearly+total_bonus);
	$("#gtotalTax, .taxableMnt").text(total_taxable_ammount);

	taxRangeCalculations(total_taxable_ammount)
	// console.log('tt=',totalTax)

	// For descriptions instractions
	$(".gross_sal").text(total_salary);
	$(".basic_sal").text(basic_salary);
}

function check(){
	console.log('total salay:',total_salary)
	console.log('basic_salary:',basic_salary)
	console.log('basic_salary_yearly:',basic_salary_yearly)
	console.log('house_rent:',house_rent)
	console.log('house_rent_yearly:',house_rent_yearly)
	console.log('convence:',convence)
	console.log('convence_yearly:',convence_yearly)
}


function taxRangeCalculations(taxAmt, isfemale = false){
	

	var taxSlot = {
		first_slot: {'limit' : 300000, 'percent' : 0, display: 0},
		second_slot: {'limit' : 100000, 'percent' : 0.05, display: 5},
		third_slot: {'limit' : 300000, 'percent' : 0.10, display: 10},
		forth_slot: {'limit' : 400000, 'percent' : 0.15, display: 15},
		fifth_slot: {'limit' : 500000, 'percent' : 0.20, display: 20},
		last_slot: {'limit' : 0, 'percent' : 0.25, display: 25},
	}

	var isfemale = $("#isFemale").is(":checked")
	if (isfemale) {
		taxSlot['first_slot']['limit'] = 350000;
		$("#first-limit-r2").text(taxSlot.first_slot.limit)
	}else{
		taxSlot['first_slot']['limit'] = 300000;
		$("#first-limit-r2").text(taxSlot.first_slot.limit)
	}
		

	var first_slot_amt = 0;
	var second_slot_amt = 0;
	var third_slot_amt = 0;
	var forth_slot_amt = 0;
	var fifth_slot_amt = 0;
	var last_slot_amt = 0;

	var remain_amount = 0
	var isFlag = true;

	if (taxAmt > taxSlot['first_slot']['limit']) {
		remain_amount = taxAmt - taxSlot['first_slot']['limit']
		$("#first-limit-amt").text(`(${taxAmt} - ${taxSlot['first_slot']['limit']}) = ${remain_amount}`);
		$("#first-limit-tax").text(`(${taxSlot['first_slot']['limit']} * ${taxSlot['first_slot']['display']}%) = ${first_slot_amt}`);

	}else{
		$("#first-limit-amt").text(taxAmt);
		$("#first-limit-tax").text(`(${taxAmt} * ${taxSlot['first_slot']['display']}%) = ${first_slot_amt}`);
		isFlag = false;
	}

	if (remain_amount > taxSlot['second_slot']['limit']) {
		taxbale2nd = taxSlot['second_slot']['limit']
		second_slot_amt = taxbale2nd * taxSlot['second_slot']['percent'];
		$("#second-limit-amt").text(`(${remain_amount} - ${taxbale2nd}) = ${remain_amount - taxbale2nd}`);
		$("#second-limit-tax").text(`(${taxbale2nd} * ${taxSlot['second_slot']['display']}%) = ${second_slot_amt}`);
		remain_amount = remain_amount - taxSlot['second_slot']['limit'];
	}else if(isFlag){
		taxbale2nd = remain_amount;
		second_slot_amt = taxbale2nd * taxSlot['second_slot']['percent'];
		$("#second-limit-amt").text(taxbale2nd);
		$("#second-limit-tax").text(`(${taxbale2nd} * ${taxSlot['second_slot']['display']}%) = ${second_slot_amt}`);
		isFlag = false
	}else{
		$("#second-limit-amt, #second-limit-tax").text(0);
	}

	if (remain_amount > taxSlot['third_slot']['limit']) {
		taxbale3rd = taxSlot['third_slot']['limit']
		third_slot_amt = taxbale3rd * taxSlot['third_slot']['percent'];
		$("#third-limit-amt").text(`(${remain_amount} - ${taxbale3rd}) = ${remain_amount - taxbale3rd}`);
		$("#third-limit-tax").text(`(${taxbale3rd} * ${taxSlot['third_slot']['display']}%) = ${third_slot_amt}`);
		remain_amount = remain_amount - taxSlot['third_slot']['limit'];
	}else if(isFlag){
		taxbale3rd = remain_amount;
		third_slot_amt = taxbale3rd * taxSlot['third_slot']['percent'];
		$("#third-limit-amt").text(taxbale3rd);
		$("#third-limit-tax").text(`(${taxbale3rd} * ${taxSlot['third_slot']['display']}%) = ${third_slot_amt}`);
		isFlag = false
	}else{
		$("#third-limit-amt, #third-limit-tax").text(0);
	}


	if (remain_amount > taxSlot['forth_slot']['limit']) {
		taxbale4th = taxSlot['forth_slot']['limit']
		forth_slot_amt = taxbale4th * taxSlot['forth_slot']['percent'];
		$("#forth-limit-amt").text(`(${remain_amount} - ${taxbale4th}) = ${remain_amount - taxbale4th}`);
		$("#forth-limit-tax").text(`(${taxbale4th} * ${taxSlot['forth_slot']['display']}%) = ${forth_slot_amt}`);
		remain_amount = remain_amount - taxSlot['forth_slot']['limit'];
	}else if(isFlag){
		taxbale4th = remain_amount;
		forth_slot_amt = taxbale4th * taxSlot['forth_slot']['percent'];
		$("#forth-limit-amt").text(taxbale4th);
		$("#forth-limit-tax").text(`(${taxbale4th} * ${taxSlot['forth_slot']['display']}%) = ${forth_slot_amt}`);
		isFlag = false
	}else{
		$("#forth-limit-amt, #forth-limit-tax").text(0);
	}

	if (remain_amount > taxSlot['fifth_slot']['limit']) {
		taxbale5th = taxSlot['fifth_slot']['limit']
		fifth_slot_amt = taxbale5th * taxSlot['fifth_slot']['percent'];
		$("#fifth-limit-amt").text(`(${remain_amount} - ${taxbale5th}) = ${remain_amount - taxbale5th}`);
		$("#fifth-limit-tax").text(`(${taxbale5th} * ${taxSlot['fifth_slot']['display']}%) = ${fifth_slot_amt}`);
		remain_amount = remain_amount - taxSlot['fifth_slot']['limit'];
	}else if(isFlag){
		taxbale5th = remain_amount;
		fifth_slot_amt = taxbale5th * taxSlot['fifth_slot']['percent'];
		$("#fifth-limit-amt").text(taxbale5th);
		$("#fifth-limit-tax").text(`(${taxbale5th} * ${taxSlot['fifth_slot']['display']}%) = ${fifth_slot_amt}`);
		isFlag = false
	}else{
		$("#fifth-limit-amt, #fifth-limit-tax").text(0);
	}

	if(isFlag){
		taxbaleLast = remain_amount;
		last_slot_amt = taxbaleLast * taxSlot['last_slot']['percent'];
		$("#last-limit-amt").text(taxbaleLast);
		$("#last-limit-tax").text(`(${taxbaleLast} * ${taxSlot['last_slot']['display']}%) = ${last_slot_amt}`);
		isFlag = false
	}else{
		$("#last-limit-amt, #last-limit-tax").text(0);
	}


	$("#first-limit-r2").text(taxSlot['first_slot']['limit']); $("#first-percent-r2").text(taxSlot['first_slot']['display'])
	$("#second-limit-r2").text(taxSlot['second_slot']['limit']); $("#second-percent-r2").text(taxSlot['second_slot']['display'])
	$("#third-limit-r2").text(taxSlot['third_slot']['limit']); $("#third-percent-r2").text(taxSlot['third_slot']['display'])
	$("#forth-limit-r2").text(taxSlot['forth_slot']['limit']); $("#forth-percent-r2").text(taxSlot['forth_slot']['display'])
	$("#fifth-limit-r2").text(taxSlot['fifth_slot']['limit']); $("#fifth-percent-r2").text(taxSlot['fifth_slot']['display'])
	$("#last-limit-r2").text(taxSlot['last_slot']['limit']); $("#last-percent-r2").text(taxSlot['last_slot']['display'])

	totalTax = second_slot_amt + third_slot_amt+ forth_slot_amt + fifth_slot_amt+ last_slot_amt
	$("#total-tax").text( totalTax + ' BDT')
	// console.log('amt: ',second_slot_amt,third_slot_amt,forth_slot_amt,fifth_slot_amt,last_slot_amt)



	var totalInvastAbleAmt = getInvestmentAmount()
	var totalRebateOnInvesment = Math.round(totalInvastAbleAmt * (taxRebaseOnInvasmentRate/100))

	// console.log("aftere minimum tax", getInvestmentAmount())
	
	$(".txInvRate").text(invesmentRate)
	// $("#invAmtCal").text(`(${total_taxable_ammount} * ${invesmentRate}%) = ${totalInvastAbleAmt}`)
	$("#invAmtCal").text(` ${totalInvastAbleAmt}`)

	$(".investAmnt").text(`${totalInvastAbleAmt}`)
	$("#rebateCal").text(`(${totalInvastAbleAmt} * ${taxRebaseOnInvasmentRate}%) = ${totalRebateOnInvesment}`)
	

	var taxAftrInvCalTemp = totalTax - totalRebateOnInvesment;
	if(taxAftrInvCalTemp < 5000){
		taxAftrInvCal = 5000;
	}else{
		taxAftrInvCal = taxAftrInvCalTemp;
		$("#rebateTax").text(`( - ) ${totalRebateOnInvesment}`)
	}
	$("#taxAftrInvCal").text(`(${totalTax} - ${totalRebateOnInvesment}) = ${taxAftrInvCalTemp}`)
	$("#taxAftrInvAmtYearly").text(`${taxAftrInvCal}`)

	var afterInvMontlyPayableTax = (taxAftrInvCal/12).toFixed(2)
	$("#taxAftrInvAmtMonthlyCal").text(`(${taxAftrInvCal} / 12) = ${afterInvMontlyPayableTax}`)
	$("#taxAftrInvAmtMonthly").text(` ${afterInvMontlyPayableTax}`)
}

function getInvestmentAmount() {

	var tax90 = total_taxable_ammount*(invesmentRate/100)*(taxRebaseOnInvasmentRate/100)
	if ((totalTax - minimumTaxAmount) > tax90) {
		return Math.ceil(total_taxable_ammount*(invesmentRate/100))
	}else{
		return Math.ceil(((totalTax - minimumTaxAmount) * 100/taxRebaseOnInvasmentRate))
	}

}

