const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.booking.com/',    
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return message;
        },
      })
    }   
  
  },
});
