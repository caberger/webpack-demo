import { Builder, By, WebDriver, WebElement } from "selenium-webdriver"
import { expect } from "chai"

const URL = "http://localhost:4200/"
describe("User-Table Component Tests", function() {
    let driver: WebDriver
    beforeEach(async function() {
        this.timeout(10000)
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get(URL)
    })
    afterEach(async function() {
        await driver.quit()
    })
    it("should have 'User Table' as title given homepage", async function() {
        //const titleElement = await driver.findElement(By.css("title"))
        const title = await driver.getTitle()
        expect(title).to.equal("User Table")
    })
    it ("should contain Id and Name as table headers", async function() {
        const tableRoot = await findUserTableShadowRoot(driver)
        const ths = await tableRoot.findElements(By.css("table > thead > tr > th"))
        const promises: Array<Promise<string>> = ths.map((th: WebElement) => th.getText())
        const headers = await Promise.all(promises)
        console.log("found headers", headers)
        expect(headers[0]).to.equal("Id")
        expect(headers[1]).to.equal("Name")
    })
    /*
    it ("should contain Max Mustermann given table filled with Demo Data", async function() {
        const root = await findUserTableShadowRoot(driver)
        const rows = await root.findElements(By.css("table > tbody > tr"))
        //const names = new Array<String>()
        //const promises: Array<Promise<WebElement>> = rows.map((row: WebElement) => row.getText())
        //const 

    })
    */
})

async function findUserTableShadowRoot(driver: WebDriver) {
    const app = await driver.findElement(By.css("app-component"))
    const root = await app.getShadowRoot()
    const userTable = await root.findElement(By.css("user-table"))
    const tableRoot = await userTable.getShadowRoot()
    return tableRoot
}