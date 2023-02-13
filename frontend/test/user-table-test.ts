import { Builder, By, WebDriver, WebElement } from "selenium-webdriver"
import { expect } from "chai"

const URL = "http://localhost:4200/"
describe("App Component Tests", function() {
    let driver: WebDriver
    beforeEach(async function() {
        this.timeout(10000)
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get(URL)
    })
    this.afterEach(async function() {
        await driver.quit()
    })
    it("should have 'User Table' as title given homepage", async function() {
        //const titleElement = await driver.findElement(By.css("title"))
        const title = await driver.getTitle()
        expect(title).to.equal("User Table")
    })
    it ("should contain Id and Name as table headers", async function() {
        const app = await driver.findElement(By.css("app-component"))
        const root = await app.getShadowRoot()
        const userTable = await root.findElement(By.css("user-table"))
        const tableRoot = await userTable.getShadowRoot()
        const ths = await tableRoot.findElements(By.css("table > thead > tr > th"))
        const promises = ths.map((th: WebElement) => th.getText())
        const headers = await Promise.all(promises)
        console.log("found headers", headers)
        expect(headers[0]).to.equal("Id")
        expect(headers[1]).to.equal("Name")
    })
})