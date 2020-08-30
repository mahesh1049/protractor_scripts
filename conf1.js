exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--no-sandbox", "--window-size=800,600" ]
        }
    },
  specs: ['todo-spec.js']
};
