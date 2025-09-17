/// <reference types="cypress"/>

// Get the date in YYYY-MM-DD format. Offset is the parameter to get the future date.
function getDate(offset = 0) {
    const today = new Date()
    const future = new Date(today)
    future.setDate(future.getDate() + offset)
    return future.toISOString().split('T')[0]
}

// example: Thur, 5 Jan
function getFormattedDateFromIsoStringShort(isoString, locale = 'en-US') {
    const date = new Date(isoString);
    const options = { weekday: 'short', day: 'numeric',  month: 'short' };
    const formattedDate = date.toLocaleDateString(locale, options);
    return formattedDate;   
  }
// example: Thursday 5 January 
  function getFormattedDateFromIsoStringLong(isoString, locale = 'en-US') {
    const date = new Date(isoString);
    const options = { weekday: 'long', day: 'numeric',  month: 'long' };
    const formattedDate =  date.toLocaleDateString(locale, options);
    return formattedDate.replace(/,/g, '');
  }

describe('Main test suite for Booking.com', () => {   
    
    const COOKIES_BANNER_YES_BUTTON_ID = '#onetrust-accept-btn-handler'
    const DESIRED_LOCATION = 'Porto'
    const DESTINATION_SEARCH_FIELD = '[name="ss"]'
    const CHECK_IN_DATE_BUTTON = '[data-mode="checkin"]'
    const CHECK_OUT_DATE_BUTTON = '[data-mode="checkout"]'
    const CHECK_IN_DATE = `[data-date=${getDate()}]`
    const CHECK_OUT_DATE = `[data-date=${getDate(7)}]`

    const formattedCheckIn_Short = getFormattedDateFromIsoStringShort(CHECK_IN_DATE);
    const formattedCheckOut_Short = getFormattedDateFromIsoStringShort(CHECK_OUT_DATE);

    const formattedCheckIn_Long= getFormattedDateFromIsoStringLong(CHECK_IN_DATE);
    const formattedCheckOut_Long = getFormattedDateFromIsoStringLong(CHECK_OUT_DATE);
    

    it('navigate to url, write destination and pick dates', function(){  
        cy.clearCookies();
        cy.visit('/');
            
        // Accept page cookies, use of Brute because cookies pop up sometimes doesnt pop-up
        cy.get(COOKIES_BANNER_YES_BUTTON_ID).wait(500).contains('Accept').click({force: true});
       
       // Destination
       cy.get(DESTINATION_SEARCH_FIELD).type(DESIRED_LOCATION, {force:true});        
        
       // Dates 
       // Check-in        
       cy.get(CHECK_IN_DATE_BUTTON).click();
       cy.get(CHECK_IN_DATE).click({force: true});
       
       //Check-out 
       cy.get(CHECK_OUT_DATE_BUTTON).click();
       cy.get(CHECK_OUT_DATE).click({force: true});
        
       //Search
       cy.contains('Search').click({force: true});

       //Console Print
       console.log('log', 'Output to the terminal', DESIRED_LOCATION, CHECK_IN_DATE, CHECK_OUT_DATE);
       
       //Verify Location
       cy.get(DESTINATION_SEARCH_FIELD, {timeout: 10000}).should('have.value', DESIRED_LOCATION);   
       
       // Verify dates
       //const checkinandoutBar = '.c3b96a31ef';
      // var checkinandoutBar = cy.get('.c3b96a31ef').should('exist');
      //var checkinandoutBar = cy.get('.c3b96a31ef').exsists();
     cy.get('.c3b96a31ef').then(($el) => {
      if ($el.length > 0 ) {
        cy.get('[data-testid="date-display-field-start"]').contains(formattedCheckIn_Short);
        cy.get('[data-testid="date-display-field-start"]').contains(formattedCheckOut_Short);
        //TODO: Timed out retrying after 4000ms: Expected to find content: 'Invalid Date' within the element: <button.d47738b911.e246f833f7.fb1847d86a.d1b7b9fc55> but never did.
      } else {
        cy.get('[data-testid="date-display-field-start"]').contains(formattedCheckIn_Long);
        cy.get('[data-testid="date-display-field-start"]').contains(formattedCheckOut_Long);
      }
    });   
        
           
    })

})