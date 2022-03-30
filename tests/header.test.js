const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("Header has the Correct Text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
  expect(text).toEqual("Blogster");
});

test("Clicking Login Starts OAuth Flow", async () => {
  await page.click(".right a");

  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/); //escape the full Stops
});

test("When signed in, shows logout button", async () => {
  const id = "6242f2d55597deed971c17e2";

  const Buffer = require("safe-buffer").Buffer;

  const sessionObject = {
    passport: {
      user: id,
    },
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const Keygrip = require("keygrip");
  const keys = require("../config/keys");
  const keygrip = new Keygrip([keys.cookieKey]);

  const sig = keygrip.sign("session=" + sessionString);

  console.log(sessionString, sig)
});
