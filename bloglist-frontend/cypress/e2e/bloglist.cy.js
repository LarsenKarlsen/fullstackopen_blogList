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
      cy.contains("Add new blog").click()
      cy.get("#blogform-title").type("Blog added by Cypress testing library")
      cy.get("#blogform-author").type("Cypress")
      cy.get("#blogform-url").type("Cypress add this URL")
      cy.get("#blogform-submit").click()

      cy.contains("Blog added by Cypress testing library by Cypress")
    })
    it("User can like blog", () => {
      cy.addBlog({ title:"testBlog", author:"Cypress", url:"testUrl.com" })
      cy.contains("show").click()
      cy.contains("Likes: 0")
      cy.get(".blog button").contains("Like").click()
      cy.contains("Likes: 1")
    })
    it("User who create blog can delete blog", () => {
      cy.addBlog({ title:"testBlog", author:"Cypress", url:"testUrl.com" })
      cy.contains("show").click()
      cy.get(".blog button").contains("Remove").click()
      cy.get("blog").should("not.exist")
    })
    it("Only the creator can see the delete button of a blog", () => {
      const newUser = {
        username:"New test USER",
        name:"New testName",
        password:"test"
      }
      cy.request("POST", "http://localhost:3003/api/users/", newUser)
      cy.addBlog({ title:"testBlog", author:"Cypress", url:"testUrl.com" })
      cy.login({ username:newUser.username, password:newUser.password })

      cy.contains("show").click()
      cy.get(".blog button").contains("Remove").should("not.exist")
    })
    it.only("Blogs are ordered according to likes with the blog with the most likes being first", () => {

      cy.addBlog({ title:"Second Most likes", author:"second Best Author", url:"testUrl2.com" })
      cy.addBlog({ title:"Less likes", author:"Less liked Author", url:"testUrl3.com" })
      cy.addBlog({ title:"Most likes", author:"Best Author", url:"url1.com" })

      cy.get(".blog").eq(1).contains("show").click()
      cy.get(".blog button").contains("Like").click()

      cy.get(".blog").eq(1).contains("show").click()
      cy.get(".blog button").eq(4).click()
      cy.get(".blog button").eq(1).click()

      cy.get(".blog").eq(2).contains("show").click()
      cy.get(".blog button").eq(7).click()
      cy.get(".blog button").eq(7).click()
      cy.get(".blog button").eq(4).click()

      cy.get(".blog").eq(0).contains("Most likes by Best Author")
      cy.get(".blog").eq(1).contains("Second Most likes by second Best Author")
      cy.get(".blog").eq(2).contains("Less likes by Less liked Author")
    })
  })
})