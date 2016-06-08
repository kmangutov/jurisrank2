var caseText = "Peter works as a delivery driver for a company called, FLOAT. FLOAT deals almost entirely in the business of delivering packages to its customers. Prior to working for FLOAT, Peter had to undergo an application process. That application process consisted of a background check, personal interview, vehicle inspection, and strength test. The application does not require Peter to have a special commercial license to transport items."
	+ " \n The vehicle inspection mandates that Peter provide his own truck to work for FLOAT. Furthermore, the truck must adhere to FLOAT's specifications (i.e. size, paint color, logo). This is rarely an issue for any new FLOAT drivers because new drivers will often lease a pre-approved truck through one of FLOAT's vendors. The lease payments for the truck will be deducted from the drivers' paychecks. He must also pay for all costs associated with operating and maintaining his truck."
	+ " \n Peter passed the application process and signed a contract to drive for FLOAT. That contract explicitly states that the relationship between him and FLOAT is that of \"independent contracting parties\" and \"not an employment agreement.\" Provisions within the FLOAT contract mandate that Peter wear/use certain items that bear the FLOAT mark; these include uniforms, package scanners, and delivery forms. He also agrees to maintain professional grooming standards regarding his haircut and body odor."
	+ " \n To ensure compliance with FLOAT standards, the contract also provides that FLOAT managers can go on ride-a-longs with a FLOAT driver, up to 4 times per year. Other compliance checks are conducted for missed deliveries, missed pickups, and FLOAT customer complaints. These all culminate in yearly \"performance reviews.\" FLOAT also distributes a \"handbook\" to each of its drivers, detailing its policies and procedures."
	+ " \n Every morning, Peter's truck is loaded with packages to deliver to FLOAT customers in accordance with his route. It is a route designated by FLOAT and can be subject to unilateral change by FLOAT management. He is also paid on a weekly schedule at a fixed, non-negotiable rate. His paycheck can be negatively impacted for lack of compliance with FLOAT policies. For example, if Peter's truck or personal appearance does not meet the approval of FLOAT management, his truck will be pulled from working deliveries for that day. This has happened to him on two occasions."
	+ " \n Peter has been working full-time for FLOAT exclusively for 2 years now; each FLOAT driver is required to work full-time hours and only for FLOAT. Most of the other FLOAT drivers have been working on average of 8 years."
	+ " \n His contract with FLOAT automatically renews every year. However, his contract can be unilaterally placed in \"non-renewal\" status by FLOAT without any cause at all. Non-renewal status effectively means that the FLOAT driver can no longer work for FLOAT. Peter has actually spoken with former FLOAT drivers who were placed on non-renewal status for no reason at all; there was no breach of the contract. Non-renewal status is distinct from FLOAT's termination procedures. The FLOAT contract mandates that drivers can only be terminated for breaching provisions within its pages."
	+ " \n Overall, Peter enjoys working for FLOAT. But while he was driving for FLOAT last week, he sustained some serious injuries in a car accident. He was not the party at fault in the car accident. His injuries required a hospital stay and his insurance couldn't cover the full costs of his medical bills."
	+ " \n He is now wondering if he can get some coverage via workers' compensation. But prior to that, he must demonstrate that he is eligible to workers' compensation benefits by showing that he is incorrectly classified as an independent contractor. He seeks to reclassify himself as an employee of FLOAT. What is the likely classification of Peter's status? Independent contractor or employee?";

$("body").ready(function() {
	var formatted = caseText.split("\n").join("<br><br>");
	var words = caseText.split(" ");

	var root = $("#text-case");
	

	for(var i in words) {
		var word = words[i];

		if(word === "\n") {
			root.append($("<br>"));
			root.append($("<br>"))
			continue;
		}

		var newNode = $("<span>");
		var spacer = $("<span>").html(" ").data("spacer-index", i);

		newNode.html(word);
		newNode.addClass("word-node");
		newNode.data("word-index", i);

		root.append(newNode);
		root.append(spacer);
	}
});

