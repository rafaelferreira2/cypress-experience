/// <reference types="cypress" />

describe('Tarefas', () => {

  let testData;

  before(() => {
    cy.fixture('tasks').then(t => {
      testData = t
    })
  })

  context('Cadastro', () => {
    it('Deve cadastrar uma nova tarefa', () => {

      const taskName = testData.criacao.name

      cy.deleteTaskByName(taskName)
      cy.createTask(taskName)
      cy.contains("main[class^='_listItensContainer'] div p", taskName)
        .should('be.visible')
    })

    it('Não deve permitir tarefa duplicada', () => {

      const task = testData.duplicada

      cy.deleteTaskByName(task.name)
      cy.createTaskByAPI(task)
      cy.createTask(task.name)

      cy.get('#swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')

      cy.contains('button', 'Ok')
        .should('be.visible')
        .click()
    })

    it('Campo obrigatório', () => {
      cy.createTask()
      cy.taskNameRequired('This is a required field')
    })
  })

  context('Atualização', () => {
    it('Deve concluir uma tarefa', () => {
      const task = testData.concluir

      cy.deleteTaskByName(task.name)
      cy.createTaskByAPI(task)

      cy.visit('/')

      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

      cy.contains('p', task.name)
        .should('have.css', 'text-decoration-line', 'line-through')
    })
  })

  context('Exclusão', () => {
    it('Deve Remover uma tarefa', () => {
      const task = testData.remove

      cy.deleteTaskByName(task.name)
      cy.createTaskByAPI(task)

      cy.visit('/')

      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemDeleteButton]')
        .click()

      cy.contains('p', task.name)
        .should('not.exist')
    })
  })
})