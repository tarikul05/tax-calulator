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
$('body').on('focusout', '#totMonthlySalary', function(event) {
	event.preventDefault();
	taxCalculation(+$(this).val())
});
function taxCalculation(salary){
	total_salary = salary;
	basic_salary = salary*0.6;

	BaseSalaryCal(salary)
	HouseRentCal(basic_salary)
	MedicalAllCal(basic_salary)
	ConvenceCal(basic_salary)
	gtotal();
	check();
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
		$("#medicalAllow .taxable").text("Your taxable amount is "+convence_yearly+" - 30000 = "+convence_tax+" BDT")
	}
	$("#convencem").text(convence);
	$("#convencey").text(convence_yearly);
	$("#convenceTax").text(convence_tax);
	$(".convence_sal").text(convence);
}

function gtotal(){
	total_taxable_ammount = basic_salary_yearly+house_rent_tax+medical_alow_tax+convence_tax;
	$("#gtotalm").text(basic_salary+house_rent+medical_alow+convence);
	$("#gtotaly").text(basic_salary_yearly+house_rent_yearly+medical_alow_yearly+convence_yearly);
	$("#gtotalTax").text(total_taxable_ammount);
}

function check(){
	$(".gross_sal").text(total_salary);
	$(".basic_sal").text(basic_salary);
	console.log('total salay:',total_salary)
	console.log('basic_salary:',basic_salary)
	console.log('basic_salary_yearly:',basic_salary_yearly)
	console.log('house_rent:',house_rent)
	console.log('house_rent_yearly:',house_rent_yearly)
	console.log('convence:',convence)
	console.log('convence_yearly:',convence_yearly)
}