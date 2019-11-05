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

var invesmentRate = 30;
var taxRebaseOnInvasmentRate = 15;


var totalTax =0;

$('body').on('focusout', '#totMonthlySalary', function(event) {
	event.preventDefault();
	taxCalculation(+$(this).val())
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
	var isfemale = $("#isFemale").is(":checked")
	if (isfemale) {
		var first_slot = 300000;
		$("#first-limit-r2").text(first_slot)
	}else{
		var first_slot = 250000;
		$("#first-limit-r2").text(first_slot)
	}
	
	var second_slot = 400000;
	var third_slot = 500000;
	var forth_slot = 600000;
	var fifth_slot = 3000000;
	var last_slot = 3000000;
	var first_slot_amt = 0;
	var second_slot_amt = 0;
	var third_slot_amt = 0;
	var forth_slot_amt = 0;
	var fifth_slot_amt = 0;
	var last_slot_amt = 0;

	var remain_amount = 0
	var isFlag = true;

	if (taxAmt > first_slot) {
		remain_amount = taxAmt - first_slot
		$("#first-limit-amt").text(`(${taxAmt} - ${first_slot}) = ${remain_amount}`);
		$("#first-limit-tax").text(`(${first_slot} * 0%) = ${first_slot_amt}`);

	}else{
		$("#first-limit-amt").text(taxAmt);
		$("#first-limit-tax").text(`(${taxAmt} * 0%) = ${first_slot_amt}`);
		isFlag = false;
	}

	if (remain_amount > second_slot) {
		taxbale2nd = second_slot
		second_slot_amt = taxbale2nd * 0.1;
		$("#second-limit-amt").text(`(${remain_amount} - ${taxbale2nd}) = ${remain_amount - taxbale2nd}`);
		$("#second-limit-tax").text(`(${taxbale2nd} * 10%) = ${second_slot_amt}`);
		remain_amount = remain_amount - second_slot;
	}else if(isFlag){
		taxbale2nd = remain_amount;
		second_slot_amt = taxbale2nd * 0.1;
		$("#second-limit-amt").text(taxbale2nd);
		$("#second-limit-tax").text(`(${taxbale2nd} * 10%) = ${second_slot_amt}`);
		isFlag = false
	}else{
		$("#second-limit-amt, #second-limit-tax").text(0);
	}

	if (remain_amount > third_slot) {
		taxbale3rd = third_slot
		third_slot_amt = taxbale3rd * 0.15;
		$("#third-limit-amt").text(`(${remain_amount} - ${taxbale3rd}) = ${remain_amount - taxbale3rd}`);
		$("#third-limit-tax").text(`(${taxbale3rd} * 15%) = ${third_slot_amt}`);
		remain_amount = remain_amount - third_slot;
	}else if(isFlag){
		taxbale3rd = remain_amount;
		third_slot_amt = taxbale3rd * 0.15;
		$("#third-limit-amt").text(taxbale3rd);
		$("#third-limit-tax").text(`(${taxbale3rd} * 15%) = ${third_slot_amt}`);
		isFlag = false
	}else{
		$("#third-limit-amt, #third-limit-tax").text(0);
	}


	if (remain_amount > forth_slot) {
		taxbale4th = forth_slot
		forth_slot_amt = taxbale4th * 0.20;
		$("#forth-limit-amt").text(`(${remain_amount} - ${taxbale4th}) = ${remain_amount - taxbale4th}`);
		$("#forth-limit-tax").text(`(${taxbale4th} * 20%) = ${forth_slot_amt}`);
		remain_amount = remain_amount - forth_slot;
	}else if(isFlag){
		taxbale4th = remain_amount;
		forth_slot_amt = taxbale4th * 0.20;
		$("#forth-limit-amt").text(taxbale4th);
		$("#forth-limit-tax").text(`(${taxbale4th} * 20%) = ${forth_slot_amt}`);
		isFlag = false
	}else{
		$("#forth-limit-amt, #forth-limit-tax").text(0);
	}

	if (remain_amount > fifth_slot) {
		taxbale5th = fifth_slot
		fifth_slot_amt = taxbale5th * 0.25;
		$("#fifth-limit-amt").text(`(${remain_amount} - ${taxbale5th}) = ${remain_amount - taxbale5th}`);
		$("#fifth-limit-tax").text(`(${taxbale5th} * 25%) = ${fifth_slot_amt}`);
		remain_amount = remain_amount - fifth_slot;
	}else if(isFlag){
		taxbale5th = remain_amount;
		fifth_slot_amt = taxbale5th * 0.25;
		$("#fifth-limit-amt").text(taxbale5th);
		$("#fifth-limit-tax").text(`(${taxbale5th} * 25%) = ${fifth_slot_amt}`);
		isFlag = false
	}else{
		$("#fifth-limit-amt, #fifth-limit-tax").text(0);
	}

	if(isFlag){
		taxbaleLast = remain_amount;
		last_slot_amt = taxbaleLast * 0.30;
		$("#last-limit-amt").text(taxbaleLast);
		$("#last-limit-tax").text(`(${taxbaleLast} * 25%) = ${last_slot_amt}`);
		isFlag = false
	}else{
		$("#last-limit-amt, #last-limit-tax").text(0);
	}

	totalTax = second_slot_amt + third_slot_amt+ forth_slot_amt + fifth_slot_amt+ last_slot_amt
	$("#total-tax").text( totalTax + ' BDT')
	// console.log('amt: ',second_slot_amt,third_slot_amt,forth_slot_amt,fifth_slot_amt,last_slot_amt)



	var totalInvastAbleAmt = total_taxable_ammount * (invesmentRate/100)
	var totalRebateOnInvesment = totalInvastAbleAmt * (taxRebaseOnInvasmentRate/100)
	
	$(".txInvRate").text(invesmentRate)
	$("#invAmtCal").text(`(${total_taxable_ammount} * ${invesmentRate}%) = ${totalInvastAbleAmt}`)

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