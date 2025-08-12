import { Builder, By, until, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";
import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

let driver;

describe("Car page tests", function () {
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

  it("should open the Cars page", async () => {
    await driver.get(process.env.BASE_URL);

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    await driver.wait(until.elementIsVisible(cars), 5000);
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("ab.onliner.by");

    const searchInput = await driver.wait(
      until.elementLocated(By.css("input.fast-search__input")),
      5000
    );

    const isSearchVisible = await searchInput.isDisplayed();
    expect(isSearchVisible).to.be.true;
  });

  it("should open moto page", async () => {
    await driver.get(process.env.BASE_URL);

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    const motoEl = await driver.findElement(
      By.css(".project-navigation__item:nth-of-type(2)")
    );
    await motoEl.click();
    await driver.wait(until.urlContains("/mb"), 5000);
    const pageTitle = await driver.getTitle();

    expect(pageTitle).to.equal(
      "Мотобарахолка - Продажа или покупка мотоциклов. Купить, продать мотоцикл в Минске, Беларуси"
    );
  });
  it("should open rewievs page", async () => {
    await driver.get(process.env.BASE_URL);

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    const motoEl = await driver.findElement(
      By.css(".project-navigation__item:nth-of-type(3)")
    );
    await motoEl.click();
    await driver.wait(until.urlContains("/reviews"), 5000);
    const pageTitle = await driver.getTitle();

    expect(pageTitle).to.equal("Отзывы автовладельцев об автомобилях");
  });

  it("should display filters", async () => {
    await driver.get(process.env.BASE_URL);

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    await driver.wait(
      until.elementLocated(By.css(".vehicle-form__filter")),
      5000
    );

    const filters = await driver.wait(
      until.elementLocated(By.css(".vehicle-form__filter-overflow")),
      5000
    );
    const isFiltersDisplayed = await filters.isDisplayed();
    expect(isFiltersDisplayed).to.be.true;
  });

  it("should open countries list after clicking on 'Models'", async () => {
    await driver.get(process.env.BASE_URL);

    const cookieBtn = await driver.findElements(By.id("submit-button"));
    if (cookieBtn.length > 0) {
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        cookieBtn[0]
      );
      await driver.sleep(500);
      await cookieBtn[0].click();
      await driver.sleep(1000);
    }

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    await driver.wait(
      until.elementLocated(By.css(".vehicle-form__filter")),
      5000
    );

    const countryFilter = await driver.wait(
      until.elementLocated(
        By.xpath("(//div[contains(@class,'input-style__real')])[4]")
      ),
      5000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      countryFilter
    );
    await driver.sleep(500);
    await countryFilter.click();
    await driver.sleep(1000);

    const countryInput = await driver.wait(
      until.elementLocated(
        By.xpath("//input[contains(@placeholder,'Найти марку')]")
      ),
      5000
    );
    await driver.wait(until.elementIsVisible(countryInput), 5000);
    expect(await countryInput.isDisplayed()).to.be.true;
  });

  it("should open models list after clicking on 'All countries'", async () => {
    await driver.get(process.env.BASE_URL);

    const cookieBtn = await driver.findElements(By.id("submit-button"));
    if (cookieBtn.length > 0) {
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        cookieBtn[0]
      );
      await driver.sleep(500);
      await cookieBtn[0].click();
      await driver.sleep(1000);
    }

    const cars = await driver.wait(
      until.elementLocated(
        By.css(
          ".b-main-navigation > .b-main-navigation__item:nth-of-type(3) .b-main-navigation__link"
        )
      ),
      5000
    );
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: cars }).click().perform();

    await driver.wait(
      until.elementLocated(By.css(".vehicle-form__filter")),
      5000
    );

    const countryFilter = await driver.wait(
      until.elementLocated(
        By.xpath("(//div[contains(@class,'input-style__real')])[1]")
      ),
      5000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      countryFilter
    );
    await driver.sleep(500);
    await countryFilter.click();
    await driver.sleep(1000);

    const countryInput = await driver.wait(
      until.elementLocated(
        By.xpath("//input[contains(@placeholder,'Найти страну')]")
      ),
      5000
    );
    await driver.wait(until.elementIsVisible(countryInput), 5000);
    expect(await countryInput.isDisplayed()).to.be.true;
  });
});
