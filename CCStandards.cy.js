context('CCStandards', () => {

  beforeEach(() => {
    cy.visit('https://standards.myworksheetmaker.com/');
  })


  describe('Verify Common Core Standards Page', () => {

    it('Verify Page Title', () => {
      cy.title().should('eq', 'Find Common Core Standards - Laravel')
    })


    it('Verify Subject is Clickable', () => {
      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().should('have.length', 12);
    })


    it('Verify Grades are Clickable', () => {
      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().should('have.length', 12);
      cy.get('dl[class="space-y-4 mx-6"').children().each(($elem) => {
        cy.wrap($elem).click();
        cy.wrap($elem).find('dd').should("be.visible");
      })
    })


    it('Verify Domains are Clickable', () => {
      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().should('have.length', 12);
      cy.get('dl[class="space-y-4 mx-6"').children().each(($elem) => {
        cy.wrap($elem).click();
        cy.wrap($elem).find('dd').find('dl').children().each(($domain) => {
          cy.wrap($domain).click();
          cy.wrap($domain).children().should('be.visible');
        })

      })
    })


    it('Verify SubDomains are Clickable', () => {
      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().should('have.length', 12);
      cy.get('dl[class="space-y-4 mx-6"').children().first().then(($elem) => {
        cy.wrap($elem).click();
        cy.wrap($elem).find('dd').find('dl').children().first().then(($domain) => {
          cy.wrap($domain).click();
          cy.wrap($domain).children().should('be.visible');
          cy.wrap($domain).find('dd').then(($sub) => {
            cy.wrap($sub).click();
            cy.wrap($sub).find('dl').find('div').find('dd').should('be.visible');
          })
        })
      })
    })


    it('Verify Standards Checklist', () => {

      const lessons = new Array();

      //check if text exists
      cy.get('div[class="rounded-md bg-blue-50 p-4"]').within(() => {
        cy.get('p').then(($p) => {
          cy.log($p.text());
          cy.wrap($p).should('be.visible');
        })
      })

      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().first().then(($elem) => {
        cy.wrap($elem).click();
        cy.wrap($elem).find('dd').find('dl').children().first().then(($domain) => {
          cy.wrap($domain).click();
          cy.wrap($domain).find('dd').then(($sub) => {
            cy.wrap($sub).click();
            cy.wrap($sub).find('dl').find('div').find('dd').find('div').find('input').each(($standard) => {
              cy.wrap($standard).click();
              cy.wrap($standard).parent().next().find('label').then(($label) => {
                lessons.push($label.text());
              })

            })
          })
        })
      })

      cy.get('div[class="rounded-md bg-blue-50 p-4"]').should('not.exist');

      cy.get('div[class="flow-root"] ul').find('li').each(($selection) => {
        cy.wrap($selection).find('div div p[class="font-bold text-gray-900"]').then(($selp) => {
          expect($selp.text()).to.be.oneOf(lessons);
        })
      })

    })


    it('Verify Standards Removal', () => {

      //check if text exists
      cy.get('div[class="rounded-md bg-blue-50 p-4"]').within(() => {
        cy.get('p').then(($p) => {
          cy.log($p.text());
          cy.wrap($p).should('be.visible');
        })
      })

      cy.get('#headlessui-disclosure-button-1').click();
      cy.get('dl[class="space-y-4 mx-6"').children().first().then(($elem) => {
        cy.wrap($elem).click();
        cy.wrap($elem).find('dd').find('dl').children().first().then(($domain) => {
          cy.wrap($domain).click();
          cy.wrap($domain).find('dd').then(($sub) => {
            cy.wrap($sub).click();
            cy.wrap($sub).find('dl').find('div').find('dd').find('div').find('input').each(($standard) => {
              cy.wrap($standard).click();
            })
          })
        })
      })

      cy.get('div[class="rounded-md bg-blue-50 p-4"]').should('not.exist');

      //uncheck all previously selected standards
      cy.get('dl[class="space-y-4 mx-6"').children().first().then(($elem) => {
        cy.wrap($elem).find('dd').find('dl').children().first().then(($domain) => {
          cy.wrap($domain).find('dd').then(($sub) => {
            cy.wrap($sub).find('dl').find('div').find('dd').find('div').find('input').each(($standard) => {
              cy.wrap($standard).click();
            })
          })
        })
      })

      cy.get('div[class="rounded-md bg-blue-50 p-4"]').should('exist');

    })



  })
})