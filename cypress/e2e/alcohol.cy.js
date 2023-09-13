describe('Alcohol project', () => {
  const url = 'http://localhost:3000';

  // General Page Load
  beforeEach(() => {
    cy.visit(url);
  });

  // Navbar Tests
  it('should display the navbar', () => {
    
    cy.get('.navbar').should('be.visible');
  });

  it('should have a logo in the navbar', () => {
    cy.get('.logo').should('be.visible');
  });

  // About Section Tests
  it('should navigate to the about section from navbar', () => {
    cy.get('.nav-links a').contains('about').click();
    cy.url().should('include', '/about');
    cy.get('.about-section').should('be.visible');
  });

  it('should display appropriate text in the about section', () => {
    cy.visit(`${url}/about`);
    cy.get('.about-section p').should('be.visible');
    cy.contains(/Lorem ipsum dolor/i)
  });

  // Buttons Tests
  it('should display primary button', () => {
    cy.get('.btn-primary').should('be.visible');
  });
  it('should have functioning hover effect on primary button', () => {
    cy.get('.btn-primary').first().then((element) => {
        cy.wrap(element).realHover();
       
        cy.wrap(element).should('have.css', 'background-color', 'rgb(212, 230, 165)');
    });
});

  
  // Search Form Tests
  it('should display the search form', () => {
    cy.get('.search-form').should('be.visible');
  });

  it('should allow text entry in search input', () => {
    cy.get('.form-control input').type('Test input');
  });

  it('should clear text on some defined event', () => {
    // You need to adjust this according to your event handling method
    cy.get('.form-control input').type('Test input').clear();
  });

  // Cocktails List Tests
  it('should display the cocktails section', () => {
    cy.get('.section').should('be.visible');
  });

  it('should display a list of cocktails', () => {
    cy.get('.cocktails-center').children().should('have.length.greaterThan', 0);
  });


  it('should navigate to individual cocktail details page', () => {
    // Step 1: Perform a search for the cocktail named "Ace"
    cy.get('.search-form').should('exist');
    cy.get('.form-control input').type('A1').should('have.value', 'A1');
   
     cy.wait(3000)
  
    // Step 2: Click on the details button for the first cocktail in the search results
    cy.get('.cocktail .btn-details').first().click();
  
    // Step 3: Verify that we have navigated to the correct details page
    cy.url().should('include', '/cocktail/17222');
    cy.contains('A1').should('exist');
  });
  it('should display loading state correctly', () => {
    cy.visit('http://localhost:3000/cocktail/17222', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').withArgs(
          'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222'
        ).returns(
          new Promise(resolve => {
            setTimeout(() => resolve({ json: () => ({ drinks: [] }) }), 5000);
          })
        );
      }
    });
    cy.get('.loader').should('exist');
  });

  it('should display the cocktail details correctly', () => {
    // Check that all the necessary elements are visible
    cy.visit('http://localhost:3000/cocktail/17222')
    cy.wait(3000)
    cy.get('.section-title').should('be.visible').and('have.text', 'A1'); // replace with actual text
    cy.get('.drink').should('be.visible');
    cy.get('.drink img').should('have.attr', 'src').and('equal', 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg'); // replace with actual URL
    // Add similar assertions for other elements like category, info, glass, etc.
  });

  it('should handle non-existent cocktail correctly', () => {
    cy.visit('http://localhost:3000/cocktail/17258587'); // replace with a path with invalid ID
    cy.get('.section-title').should('be.visible').and('have.text', 'no cocktail to display');
  });

  it('should navigate back home correctly', () => {
    cy.visit('http://localhost:3000/cocktail/17222')
    cy.wait(3000)
    cy.get('.btn.btn-primary').contains(/back home/i).click();
    cy.url().should('eq', 'http://localhost:3000/'); // replace with your home URL
  });







  it('should display cocktail image on details page', () => {
    cy.get('.search-form').should('exist');
    cy.get('.form-control input').type('A1').should('have.value', 'A1');
   
     cy.wait(3000)
  
    // Step 2: Click on the details button for the first cocktail in the search results
    cy.get('.cocktail .btn-details').first().click();
  
    cy.get('.drink img').should('be.visible');
  });

  it('should display cocktail information on details page', () => {
    cy.get('.search-form').should('exist');
    cy.get('.form-control input').type('A1').should('have.value', 'A1');
   
     cy.wait(3000)
  
    // Step 2: Click on the details button for the first cocktail in the search results
    cy.get('.cocktail .btn-details').first().click();
  
    cy.get('.drink-info').should('be.visible');
  });

  // Error Page Tests
  it('should display error page on incorrect URL', () => {
    cy.visit(`${url}/non-existent-url`);
    cy.get('.error-page').should('be.visible');
  });

 

 
});






describe('Alcohol project', () => {
  const url = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(url);
  });

  it('should load the home page', () => {
    cy.url().should('eq', `${url}/`);
  });

  it('should have a navigable navbar', () => {
    cy.get('.navbar').should('exist');
    cy.get('.nav-links a').should('have.length.greaterThan', 0);
  });

  it('should have a working search form', () => {
    cy.get('.search-form').should('exist');
    cy.get('.form-control input').type('Margarita').should('have.value', 'Margarita');
  });

  // Define more it blocks here for other tests like checking the presence of about-section, error-page, section-title, etc.

  describe('Cocktail List', () => {
    it('should display a list of cocktails', () => {
      cy.get('.cocktails-center').should('exist');
    });
  });

  describe('Cocktail Details', () => {
    it('should display details of a cocktail', () => {
      cy.get('.cocktail').should('exist');
     
    });

    it('should have working buttons', () => {
      cy.get('.btn').should('exist');
      // Test the buttons here by triggering click events and checking outcomes
    });
  });
  

});


describe('Responsive Grid Layout', () => {
  const url = 'http://localhost:3000'; // replace with your actual URL
  it('should display 3 items in a row on large screens (greater than 1270px)', () => {
    cy.viewport(1280, 800); // Large screen view (width greater than 1270px)
    cy.visit(url);
    
    cy.get('.cocktails-center')
      .should('have.css', 'grid-template-columns', '341.325px 341.337px 341.337px'); 
  });
  
  it('should display 2 items in a row on medium screens (576px to 1270px)', () => {
    cy.viewport(1024, 768); // Medium screen view (width between 576px and 1270px)
    cy.visit(url);
    
    cy.get('.cocktails-center')
      .should('have.css', 'grid-template-columns', '419.2px 419.2px');
  });
  
  it('should display 1 item in a row on small screens (less than 576px)', () => {
    cy.viewport(375, 812); // Small screen view (width less than 576px)
    cy.visit(url);
    
    cy.get('.cocktails-center')
      .should('have.css', 'grid-template-columns', '318.913px');
  });
  
});

