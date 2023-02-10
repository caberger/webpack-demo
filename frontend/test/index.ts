import { Builder, By, WebDriver } from "selenium-webdriver"
import { strict as assert } from "node:assert"
import { expect } from "chai"

const URL = "https://www.htl-leonding.at/"
describe("always succeed test", function() {
    let driver: WebDriver
    before(async function() {
        this.timeout(10000)
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get(URL)
    })
    it("should have hauptmenue", async function() {
        const menu = await driver.findElement(By.id("hauptmenue"))
        expect(menu).to.be.not.null
        await driver.quit()
    })
})