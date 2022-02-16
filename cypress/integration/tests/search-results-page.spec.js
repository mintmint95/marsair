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
    const promoCode = 'AF3-FJK-418'
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('December (two years from now)', { force: true })
    cy.get('#promotional_code').type(promoCode)
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('.promo_code').should('contain', `Promotional code ${promoCode} used: 30% discount!`)
  })

  it.skip('[TC_Story#2_1] Be able to show the search result properly when - The users enter valid promotion codes. *Option: 2', () => {
    // let x 
    // cy.wrap(null).then(async () => {
    //   x = await randomPromotionCode(true)
    //   console.log(x)
    // })

    console.log('qewqeqweqweqwqwqewq')

    console.log('wtf : ', promoCodexx.then(console.log))
    // let promotionalCode = randomPromotionCode(true)
    // console.log(promotionalCode)
    // let promotionalCode = cy.randomPromotionCode()
    // console.log(promotionalCode)
  })

  it('[TC_Story#2_4] Be able to show an error message when the users enter invalid promotion codes when - Promo Code is invalid format (Case: Condition of Promo Code digit is not match)', () => {
    const promoCode = 'MM7-INT-118'
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('December (two years from now)', { force: true })
    cy.get('#promotional_code').type(promoCode)
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('.promo_code').should('contain', `Sorry, code ${promoCode} is not valid`)
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
    const promoCode = 'MM7#INT#119'
    cy.visit(Cypress.env('host'))
    cy.get('#departing').select('July', { force: true })
    cy.get('#returning').select('December (two years from now)', { force: true })
    cy.get('#promotional_code').type(promoCode)
    cy.contains('Search').click()

    // Search results page from AC
    cy.get('.promo_code').should('contain', `Sorry, code ${promoCode} is not valid`)
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
//   return new Promise((resolve) => {
//     let checksum = Math.floor(0 + Math.random() * 999) + '' // 123, 456, '1', '12'
//   console.log(checksum)
//   let sum = 0
//   for (let i = 0; i < 3; i++) {
//     // 1+ 2 + 3 = 6
//     // 4 + 5 + 6 = 15
//     sum += +(checksum.charAt(i))
//   }

//   if (isNotSum2digit) {
//     if (sum >= 10) {
//       // 4 + 5 + 6 = 15
//       // Random again
//       randomPromotionCode(isNotSum2digit)
//       return
//     }
//   }

//   let resp = []
//   for (let i = 0; i < 3; i++) {
//     if (checksum.charAt(i) === '') {
//       resp.push(0)
//     } else {
//       resp.push(+checksum.charAt(i))
//     }
//   }
//   // [1, 0, 0, 1]
//   // [1, 2, 0, 3]

//   resp.push(sum)
//   //console.log('success :: ', resp) // [1, 0, 0, 1]

//   // set 1
//   let set1 = ''
//   for (let i = 0; i < 3; i++) {
//     if (i === 2) {
//       set1 += resp[0]
//     } else {
//       set1 += String.fromCharCode(Math.floor(Math.random() * (90 - 65)) + 65)
//     }
//   }

//   // set 2
//   let set2 = ''
//   for (let i = 0; i < 3; i++) {
//     set2 += String.fromCharCode(Math.floor(Math.random() * (90 - 65)) + 65)
//   }

//   // set 3
//   let set3 = ''
//   for (let i = 1; i <= 3; i++) {
//     set3 += resp[i]
//   }

//   //console.log(`${set1}-${set2}-${set3}`)
//     // return `${set1}-${set2}-${set3}`
//     resolve(`${set1}-${set2}-${set3}`)
//   })
// }