const user = {
  username:"test",
  name:"testName",
  password:"test"
}

describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("login form is shown", () => {
    cy.contains("LogIn")
  })

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#loginForm-username").type("test")
      cy.get("#loginForm-password").type("test")
      cy.get("#loginForm-submitButton").click()
      cy.contains("test logged in")
    })
    it("fails with wrong credentials", () => {
      cy.get("#loginForm-username").type("test1")
      cy.get("#loginForm-password").type("test1")
      cy.get("#loginForm-submitButton").click()
      cy
        .contains("invalid username or password")
        .should("have.css", "color")
        .and("include", "rgb(255, 0, 0)")
    })
  })
  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username:user.username, password:user.password })
    })
    it("Can create new blog", () => {

    })
  })
})