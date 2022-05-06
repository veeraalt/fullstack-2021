describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test-user',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test-user')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test-user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test-user', password: 'secret' })
    })

    describe('and blog list is empty', function () {
      it('a new blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('a test blog')
        cy.get('#author-input').type('cypress')
        cy.get('#url-input').type('https://www.cypress.io/')
        cy.get('#create-blog-button').click()
        cy.contains('a test blog cypress')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'test.com/first',
          likes: 4
        })
        cy.createBlog({
          title: 'second blog',
          author: 'cypress',
          url: 'test.com/second',
          likes: 0
        })
        cy.createBlog({
          title: 'third blog',
          author: 'test-user',
          url: 'test.com/third',
          likes: 5
        })
      })

      it('like button works', function () {
        cy.contains('second blog')
          .contains('view')
          .click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be deleted', function () {
        cy.contains('third blog')
          .contains('view')
          .click()
        cy.contains('remove').click()
        cy.contains('third blog').should('not.exist')
        cy.contains('first blog')
        cy.contains('second blog')
      })

      it('blogs are automatically ordered by likes in descending order', function () {
        cy.get('.blog').eq(0).should('contain', 'third blog')
        cy.get('.blog').eq(1).should('contain', 'first blog')
        cy.get('.blog').eq(2).should('contain', 'second blog')

        cy.contains('first blog')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('likes 5')
        cy.contains('like').click()
        cy.contains('first blog')
          .contains('hide')
          .click()

        cy.contains('second blog')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('likes 1')

        cy.get('.blog').eq(0).should('contain', 'first blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
        cy.get('.blog').eq(2).should('contain', 'second blog')
      })
    })
  })
})
