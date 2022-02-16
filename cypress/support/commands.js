// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const cypress = require("cypress")

// Cypress.Commands.add('randomPromotionCode', (isNotSum2digit) => {
//   let checksum = Math.floor(0 + Math.random() * 999) + ''
//   // 123, 456
//   //console.log(checksum)
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

//   // [1,2,3,6]

//   resp.push(sum)
//   //console.log('success :: ', resp)
//   console.log(resp)
//   // return resp
//   cy.wrap(resp)
// })