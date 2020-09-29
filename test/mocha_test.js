/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const By = webdriver.By;

let browser;

test.describe("Me App", function() {
    test.beforeEach(function(done) {
        this.timeout(0);
        browser = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(new chrome.Options().headless())
            .forBrowser("chrome")
            .build();

        browser.get("http://localhost:8082");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    test.it("Testing Homepage", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "React App");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "React App");
        });

        assertH1("OM MIG");
        matchUrl("/");

        done();
    });

    test.it("Testing Login", function(done) {
        goToNavLink("LOGIN");
        assertH1("LOGIN");
        matchUrl("/account/login");

        done();
    });

    test.it("Testing Reports", function(done) {
        goToNavLink("REPORT");
        matchUrl("/reports");

        done();
    });
});
