describe('Search results page', () => {
  it('[TC_Story#1_4] Be able to show the search result properly when found available seats.', () => {
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('December (two years from now)', { force: true })
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('div[id="content"] h2').should('contain', 'Search Results')
    cy.get('div[id="content"] > p:nth-child(2)').should('contain', 'Seats available!')
    cy.get('div[id="content"] > p:nth-child(3)').should('contain', 'Call now on 0800 MARSAIR to book!')
    cy.get('div[id="content"] p a').should('contain', 'Back')

    // Search results page from Design
    // -> Text: "Search Results"
    // -> Text: "Seats available!"
    // -> Text: "Call now on 0800 MARSAIR to book!"
    // -> Text: "Back"
  })

  it('[TC_Story#1_5] Be able to show an error message when not found the available seats.', () => {
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('July (next year)', { force: true })
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('div[id="content"] h2').should('contain', 'Search Results')
    cy.get('div[id="content"] > p:nth-child(2)').should('contain', 'Sorry, there are no more seats available.')
    cy.get('div[id="content"] p a').should('contain', 'Back')
  })

  it('[TC_Story#2_1] Be able to show the search result properly when - The users enter valid promotion codes. *Option: 1', () => {
    let promoCode = ['AF3-FJK-418', 'MM7-INT-119', 'OO0-OOO-000']
    for (let data of promoCode) {
      cy.visit(Cypress.env('host'))
      cy.get('#departing').select('July', { force: true })
      cy.get('#returning').select('December (two years from now)', { force: true })
      cy.get('#promotional_code').type(data)
      cy.contains('Search').click()

      // Search results page from AC
      cy.get('.promo_code').should('contain', `Promotional code ${data} used: ${data.charAt(2)}0% discount!`)
    }
  })

  it.skip('[TC_Story#2_1] Be able to show the search result properly when - The users enter valid promotion codes. *Option: 2', () => {
    // let x 
    // cy.wrap(null).then(async () => {
    //   x = await randomPromotionCode(true)
    //   console.log(x)
    // })

    console.log('test')

    console.log('Randome Promo : ', promoCodexx.then(console.log))
    // let promotionalCode = randomPromotionCode(true)
    // console.log(promotionalCode)
    // let promotionalCode = cy.randomPromotionCode()
    // console.log(promotionalCode)
  })

  it('[TC_Story#2_4] Be able to show an error message when the users enter invalid promotion codes when - Promo Code is invalid format (Case: Condition of Promo Code digit is not match)', () => {
    let promoCode = ['MM7-INT-118', 'JJ5-OPQ-320', 'JJ5-OPQ-3210', 'JJ5-OPQ-3211']
    for (let data of promoCode) {
      cy.visit(Cypress.env('host'))
      cy.get('#departing').select('July', { force: true })
      cy.get('#returning').select('December (two years from now)', { force: true })
      cy.get('#promotional_code').type(data)
      cy.contains('Search').click()

      // Search results page from AC
      cy.get('.promo_code').should('contain', `Sorry, code ${data} is not valid`)
    }
  })

  it('[TC_Story#2_5] Be able to show an error message when the users enter invalid promotion codes when - Promo Code is invalid format (Case: More max length 255)', () => {
    // 256 Characters
    const promoCode = 'AF3-FJK-418-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('December (two years from now)', { force: true })
    cy.get('#promotional_code').type(promoCode)
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('.promo_code').should('contain', `Sorry, code ${promoCode} is not valid`)
  })

  it('[TC_Story#2_6] Be able to show an error message when the users enter invalid promotion codes when - Promo Code is invalid format (Case: Enter special characters)', () => {
    let promoCode = ['MM7#INT#119', 'AF3-----418', 'AF3-FJK-418------8', 'MM7/INT/119', 'MM7|INT|119', 'MM7 INT 119']
    for (let data of promoCode) {
      cy.visit(Cypress.env('host'))
      cy.get('#departing').select('July', { force: true })
      cy.get('#returning').select('December (two years from now)', { force: true })
      cy.get('#promotional_code').type(data)
      cy.contains('Search').click()

      // Search results page from AC
      cy.get('.promo_code').should('contain', `Sorry, code ${data} is not valid`)
    }
  })

  it('[TC_Story#4_2] Be able to show an error message when selecting the return date is less than 1 year from the departure.', () => {
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('July', { force: true })
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('div[id="content"] > p:nth-child(2)').should('contain', 'Unfortunately, this schedule is not possible. Please try again.')
  })

})

// function randomPromotionCode(isNotSum2digit) {
//   return new Promise((resolve, reject) => {
//     let checksum = Math.floor(0 + Math.random() * 999) + ''
//     console.log(checksum)
//     let sum = 0
//     for (let i = 0; i < 3; i++) {
//       sum += +(checksum.charAt(i))
//     }

//     // if (isNotSum2digit) {
//     //   if (sum >= 10) {
//     //     randomPromotionCode(isNotSum2digit)
//     //     reject()
//     //     return
//     //   }
//     // }

//     if (sum < 10) {
//       let resp = []
//       for (let i = 0; i < 3; i++) {
//         if (checksum.charAt(i) === '') {
//           resp.push(0)
//         } else {
//           resp.push(+checksum.charAt(i))
//         }
//       }

//       resp.push(sum)
//       console.log('success :: ', resp)

//       // set 1

//       let set1 = ''
//       for (let i = 0; i < 3; i++) {
//         if (i === 2) {
//           set1 += resp[0]
//         } else {
//           set1 += String.fromCharCode(Math.floor(Math.random() * (90 - 65)) + 65)
//         }
//       }

//       // set 2
//       let set2 = ''
//       for (let i = 0; i < 3; i++) {
//         set2 += String.fromCharCode(Math.floor(Math.random() * (90 - 65)) + 65)
//       }

//       let set3 = ''
//       for (let i = 1; i <= 3; i++) {
//         set3 += resp[i]
//       }

//       console.log(`${set1}-${set2}-${set3}`)
//       resolve({ code: `${set1}-${set2}-${set3}` })
//     } else {
//       resolve({ code: `XX1-XXX-001` })
//     }

//   })

// }

// describe('Async functions', () => {
//   it('should wait for promises to resolve', async () => {
//     let x = await randomPromotionCode()
//     console.log(x.code)
//   })
// })