import { Builder, By, until, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";
import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

let driver;

describe("Houses tests", function () {
  this.timeout(60000);

  before(async () => {
    const service = new chrome.ServiceBuilder(chromedriver.path);
    const options = new chrome.Options();
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .setChromeOptions(options)
      .build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("should open the houses & flats page", async () => {
    await driver.get(process.env.BASE_URL);

    const usedCarsEl = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(4) .b-main-navigation__link"
        )
      ),
      5000
    );
    await driver.wait(until.elementIsVisible(usedCarsEl), 5000);

    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: usedCarsEl }).click().perform();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("r.onliner.by");

    const searchInput = await driver.wait(
      until.elementLocated(By.css("input.fast-search__input")),
      5000
    );
    const isSearchVisible = await searchInput.isDisplayed();
    expect(isSearchVisible).to.be.true;
  });

  it("should navigate to rent tab", async () => {
    await driver.get(process.env.BASE_URL);

    const rent_flat = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(4) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: rent_flat }).click().perform();

    const rent = await driver.findElement(
      By.css(".project-navigation__item:nth-of-type(2)")
    );
    await rent.click();
    await driver.wait(until.urlContains("/ak"), 5000);

    const pageTitle = await driver.getTitle();

    expect(pageTitle).to.equal("Снять квартиру, аренда жилья в Минске");
  });
});
