/*
 * Run this from the command line with the appropriate args and this script will login and pay your Target RedCard balance.
 */
var system = require('system');
var args = system.args;
var username = args[1];
var password = args[2];
var zip = args[3];
var phone = args[4];
var SSN = args[5];
var page = new WebPage(), testindex = 0, loadInProgress = false;
var url = "https://rcam.target.com";

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open(url);
  },
  function() {
    //Enter Credentials
    page.evaluate(function() {

          document.getElementById('Login_UserName').value = arguments[0];
          document.getElementById('Login_Password').value = arguments[1];
          return;
    },username,password);
  }, 
  function() {
    //Login
    page.evaluate(function() {
      var submitBtn = document.getElementById("Login_btnSignIn_btnSignIn");
          submitBtn.click();
          return;
    });
  }, 
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
		try {
			document.getElementById('inputZip').value = arguments[0];
		} catch(e){}
		try {
			document.getElementById('inputPhone').value = arguments[1];
		} catch(e){}
		try {
			document.getElementById('inputSSN').value = arguments[2];
		} catch(e){}
		return;
	},zip,phone,SSN)
  },
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
      var submitBtn = document.getElementById("btnModalSubmit_btnModalSubmit");
          submitBtn.click();
          return;
	});
  },
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
      window.location = 'OneTimePayment.aspx';
      return;
	});
  },
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
      var submitBtn = document.getElementById("btnContinue_btnContinue");
          submitBtn.click();
          return;
	});
  },
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
      var radioBtn = document.getElementById("BillPayOneTimePayment1_PmtAmt_rdo_CrntBalItem");
          radioBtn.checked = true;
		  document.getElementById('BillPayOneTimePayment1_paymentButtons_wizardSubmitButton1_wizardSubmitButton1').click();
          return;
	});
  },
  function() {
  	//Insert Zip Code
	page.evaluate(function(){
       var submitBtn = document.getElementById("BillPayOneTimePayment1_ctl04_btnSubmit_btnSubmit");
          submitBtn.click();
          return;
	});
  },  
  function() {
    // Output content of page to stdout after form has been submitted
    page.render('rcamEnd.png');
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
	page.render('rcam'+testindex+'.png');
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 1000);
