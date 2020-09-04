var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter-2');
var fs = require('fs-extra');

exports.config = {
  onPrepare: function () {
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        filePrefix: 'xmltestoutput',
        savePath: './reports',
      })
    );

    fs.emptyDir('reports/screenshots/', function (err) {
      console.log(err);
    });
    jasmine.getEnv().addReporter({
      specDone: function (result) {
        browser.getCapabilities().then(function (caps) {
          var browserName = caps.get('browserName');
          browser.takeScreenshot().then(function (png) {
            var stream = fs.createWriteStream(
              'reports/screenshots/' + browserName + '-' + result.fullName + '.png'
            );
            stream.write(new Buffer.from(png, 'base64'));
            stream.end();
          });
        });
      },
    });
  },

  onComplete: function () {
    //Getting HTML report
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './reports/',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './reports/screenshots',
        testBrowser: browserName,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: false,
        testPlatform: 'Linux',
      };
      new HTMLReport().from('xmltestoutput.xml', testConfig);
    });
  },

  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'chrome',

    chromeOptions: {
      args: ['--headless', '--disable-gpu','--no-sandbox', '--window-size=800,600'],
    },
  },
  specs: ['todo-spec.js'],
};
