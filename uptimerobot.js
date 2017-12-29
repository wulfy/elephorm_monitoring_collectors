//casperjs --ignore-ssl-errors=yes --web-security=no collectors.js

var urlConnect = "https://stats.uptimerobot.com/api/status-page/BrpqBCv7W/1";
var openWebSiteTTL = 5;
var endLoadingTTL = 5;
var durationTTL = 10;
var casper = require('casper').create({   
    verbose: false, 
    logLevel: "info",
    waitTimeout: 15000,
    stepTimeout: 15000,
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
casper.start(urlConnect);

casper.then(function openWebsite() {
    
    step = performance.now();
    var jsonObj = JSON.parse(this.getPageContent());
    var result = "";
    var success = true;

    jsonObj.psp.monitors.forEach(function(monitor)
    {
        result += " "+monitor.friendly_name+" : "+monitor.statusLabel ;
        if(monitor.status > 2)
            success = false;
    }); 

    console.log(result + "------------------result  " + (success ? "OK":"FAILED"));
    
}, function then() {    // step to execute when function check() is ok
    //+++ executes ONLY after the 'casper.thenOpen' returns true.
    this.echo("THEN!", "GREEN_BAR");
}, function timeout() { // step to execute if check has failed
    //+++ code for on timeout.  This is different than onStepTimeOut.
    console.log("error timeout");
},5000);

casper.run();
