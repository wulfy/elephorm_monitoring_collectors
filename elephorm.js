//casperjs --ignore-ssl-errors=yes --web-security=no collectors.js

var urlConnect = "https://www.elephorm.com/login";
var openWebSiteTTL = 5;
var endLoadingTTL = 5;
var durationTTL = 25;
var casper = require('casper').create({   
    verbose: false, 
    logLevel: "info",
    waitTimeout: 30000,
    stepTimeout: 30000,
    pageSettings: {
         loadImages:  true,         // The WebPage instance used by Casper will
         loadPlugins: true,        // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    },
     viewportSize: {
        width: 1400,
        height: 768
    },
    onWaitTimeout: function() {
        console.log('Wait TimeOut Occured');
        this.exit();
    },
    onStepTimeout: function() {
        console.log('Step TimeOut Occured');
        this.exit();
    }
});
var start = performance.now();
var step = 0;
var openWebsite = 0;
var loadingPage = 0;
var totalduration = 0;
var result = "";
casper.start(urlConnect, function openWebsite() {
    
    step = performance.now();
    openwebsite = (step - start)/1000;

    casper.waitForSelector('#edit-keys', function(){
     step = performance.now();
     totalduration = (step - start)/1000;
     result = (totalduration < durationTTL)?"OK":"FAILURE";
        console.log(result + "   open: "+openwebsite+" sec  and duration: " + totalduration +"sec while TTL is set to : " + durationTTL + "sec ");
    },function timeout() { // step to execute if check has failed
        //+++ code for on timeout.  This is different than onStepTimeOut.
        step = performance.now();
        console.log("FAILURE TIMEOUT loadingPage timeout " + (step - start)/1000 + " sec");
    },30000);
});


casper.run();
