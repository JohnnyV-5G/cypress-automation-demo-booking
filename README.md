# QA_CodingChallenge_v1.0

************************************************************************************************************
************************************************************************************************************
_Documentation written by Juan Vazquez_

## Pre-requisits:
[Visual Studio Code](https://code.visualstudio.com/)

[Node.js Version 14.18.10](https://nodejs.org/en/download/releases/)
- **Install Node.js from webpage and accept default values** 
    - We use this version because it was the recommended version after reading several articles from StackOverflow and other blogs and tutorials. I had difficulties running cypresss with the latests version of Node.js and had to delete and install the same recommended version.   

[NPM Package Manager](https://www.npmjs.com/)

- **npm init -y**

- **npm install**

[Cypress](https://www.cypress.io/)

- **npm install cypress --save-dev -force**

- **npx cypress verify**

## How to and how it works:

1. Open Visual Studio Code and open project. From project, open terminal either with VSC or standard CMD and start cypress: npx cypress open
2. Open the main test suite QA_CodingChallenge_v1.1/cypress/e2e/bookingTestSuite.cy.js
    - The test suite follows the standard tests structure recommended for Cypresss tests with keywords: describe, it, references  
3. Browsers: Chrome and Electron. 
   
## Test Logic and implementation:
1. Declared a getDate function to work as a date manager,\.
2. Declaration of const values. 
3. Clear the cookies for a clean run every execution.
4. Visit the web page (booking.com) that we are going to test. The page was indicated in the cypress.config.js
5. Accept the cookies from the pop-up.
6. Declare a variable called "Porto" and use it to type our destination.
7. Check in and date picker.    
7. Click "Search"
8. Convert d1 and d2 into Date values
9. Print propertise into the console. The log event was set up at the file cypress.config.js
10. Verify data 

   


