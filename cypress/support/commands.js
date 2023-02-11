// https://on.cypress.io/custom-commands

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask', (taskName = '') => {
  cy.visit('/')

  cy.get('#newTask').as('inputTask')

  if(taskName != '') {
    cy.get('@inputTask').type(taskName)
  }

  cy.contains('button', 'Create').click()
})

Cypress.Commands.add('taskNameRequired', (targetMessage) => {
  cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
      expect(targetMessage).to.eql(text)
    })
})

Cypress.Commands.add('deleteTaskByName', (taskName) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/helper/tasks',
    method: 'DELETE',
    body: {name: taskName}
  }).then(response => {
    expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('createTaskByAPI', (task) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/tasks',
    method: 'POST',
    body: task
  }).then(response => {
    expect(response.status).to.eq(201)
  })
})