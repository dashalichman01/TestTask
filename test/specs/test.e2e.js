
import LoginPage from '../pageobjects/login.page'
import CartPage from '../pageobjects/cart.page'
import InventoryPage from '../pageobjects/inventory.page'
import OverviewPage from '../pageobjects/overwview.page'
import CompletePage from '../pageobjects/complete.page'

describe('Test Task', () => {
    it('Should login to the system', async () => {
        await LoginPage.open()
        
        await LoginPage.setUsername('standard_user');

        const inputName = await LoginPage.inputUsername.getValue()
        await expect (inputName).toEqual('standard_user')

        await LoginPage.setPassword('secret_sauce');
        const inputPassword = LoginPage.inputPassword;
        const passwordType = await inputPassword.getAttribute('type')
        await expect (passwordType).toEqual('password')
        
        await LoginPage.submit();

        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html")

        const cart = await InventoryPage.cart;
        const products = await InventoryPage.productsTitle;
        await expect (cart).isDisplayed
        await expect (products).isDisplayed

    })
    it("Should login with invalid password", async()=>{
        await LoginPage.open();

        await LoginPage.setUsername('standard_user');

        await LoginPage.setPassword('password');

        const inputName = await LoginPage.inputUsername.getValue()
        await expect (inputName).toEqual('standard_user')

        const inputPassword = LoginPage.inputPassword;
        const passwordType = await inputPassword.getAttribute('type')
        await expect (passwordType).toEqual('password')


        await LoginPage.submit();

        const errMessage = await $(".error-message-container.error")
        await expect (errMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");

        const xlist = await $$('svg[role="img"]')
        for (const x of xlist){
            await expect(x).isDisplayed;
        }
        
        let userInput = await LoginPage.inputUsername.getCSSProperty("border-bottom-color");
        const borderBottomColor = userInput.value
        await expect (borderBottomColor).toEqual("rgba(226,35,26,1)")
    })
    it("Should login with invalid login", async() =>{
        await LoginPage.open();
        await LoginPage.setUsername('standarD_user');

        await LoginPage.setPassword('secret_sauce');

        const inputName = await LoginPage.inputUsername.getValue()
        await expect (inputName).toEqual('standarD_user')

        const inputPassword = LoginPage.inputPassword;
        const passwordType = await inputPassword.getAttribute('type')
        await expect (passwordType).toEqual('password')

        await LoginPage.submit();

        const errMessage = await $(".error-message-container.error")
        await expect (errMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");

        const xlist = await $$('.form_group svg[role="img"]')
        for (const x of xlist){
            await expect(x).isDisplayed;
        }
        
        const userInput = await LoginPage.inputUsername.getCSSProperty("border-bottom-color");
        const userBorderBottomColor = userInput.value
        await expect (userBorderBottomColor).toEqual("rgba(226,35,26,1)")

        const userPassword = await LoginPage.inputPassword.getCSSProperty("border-bottom-color");
        const passwordBorderBottomColor = userInput.value
        await expect (passwordBorderBottomColor).toEqual("rgba(226,35,26,1)")
    })
    it("Should logout", async ()=>{

        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html")

        await InventoryPage.openMenu();

        await expect(InventoryPage.burgerMenu).isDisplayed;

        const items = await InventoryPage.burgerItems;
        await expect(items.length).toEqual(4);

        await InventoryPage.logout();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/");

        const nameValue = await LoginPage.inputUsername.getValue()
        const passwordValue = await LoginPage.inputPassword.getValue()

        await expect(nameValue).toEqual("")
        await expect(passwordValue).toEqual("")
    })
    it("Should save the cart after logout", async()=>{

        await LoginPage.login('standard_user', 'secret_sauce')

        await InventoryPage.addToCart();

        const cartBadge = await InventoryPage.cartBadge.getText();
        await expect(cartBadge).toEqual("1");

        await InventoryPage.openCart();

        const cartItem = await CartPage.cartItem
        await expect(cartItem).isDisplayed
        const cartItemName = await CartPage.cartItemName.getText();

        await InventoryPage.openMenu();

        await expect(InventoryPage.burgerMenu).isDisplayed;

        const items = await InventoryPage.burgerItems;
        await expect(items.length).toEqual(4);
        for(const item of items){
            await expect(item).isDisplayed;
        }

        await InventoryPage.logout();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/");

        const nameValue = await LoginPage.inputUsername.getValue()
        const passwordValue = await LoginPage.inputPassword.getValue()

        await expect(nameValue).toEqual("");
        await expect(passwordValue).toEqual("");

        await LoginPage.login('standard_user', 'secret_sauce');

        const cart = await InventoryPage.cart;
        const products = await InventoryPage.productsTitle;
        await expect (cart).isDisplayed;
        await expect (products).isDisplayed;

        await InventoryPage.openCart();

        await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");

        const cartItemNameAfterLogout = await CartPage.cartItemName.getText()
        await expect(cartItemNameAfterLogout).toEqual(cartItemName)
    })
    it("Should sort", async() => {
        await LoginPage.login('standard_user', 'secret_sauce');

        //A to Z
        await InventoryPage.sortingOptions();
        await InventoryPage.sortAZ();
        await browser.pause(2000)
        const actualSequenceAZ = await InventoryPage.actualItemsNamesSequence()
        const sortedItemsAZ = [...actualSequenceAZ].sort();

        await expect(actualSequenceAZ).toEqual(sortedItemsAZ);

        //Z to A
        await InventoryPage.sortingOptions();
        await InventoryPage.sortZA();
        await browser.pause(2000)
        const actualSequenceZA = await InventoryPage.actualItemsNamesSequence()
        const sortedItemsZA = [...actualSequenceZA].sort((a, b) => b - a);

        await expect(actualSequenceZA).toEqual(sortedItemsZA);

        //Low to high
        await InventoryPage.sortingOptions();
        await InventoryPage.sortLoHi();
        await browser.pause(2000)
        const actualSequenceLoHi = await InventoryPage.actualItemsPriceSequence()
        const sortedItemsLoHi = [...actualSequenceLoHi].sort((a, b) => a - b);

        await expect(actualSequenceLoHi).toEqual(sortedItemsLoHi);

        //High to low
        await InventoryPage.sortingOptions();
        await InventoryPage.sortHiLo();
        await browser.pause(2000)
        const actualSequenceHiLo = await InventoryPage.actualItemsPriceSequence()
        const sortedItemsHiLo = [...actualSequenceHiLo].sort((a, b) => b - a);

        await expect(actualSequenceHiLo).toEqual(sortedItemsHiLo);
    })

    it("Should check footer links", async()=>{
        await LoginPage.login('standard_user', 'secret_sauce');
        //Check twitter
        const currentWindowHandle = await browser.getWindowHandle();

        await InventoryPage.twitter.click();

        let windowHandles = await browser.getWindowHandles();

        let newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);

        await browser.switchToWindow(newWindowHandle);

        await expect(browser).toHaveUrl("https://twitter.com/saucelabs")

        await browser.closeWindow();

        await browser.switchToWindow(currentWindowHandle);

        //Check facebook
        await InventoryPage.facebook.click();

        windowHandles = await browser.getWindowHandles();

        newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);

        await browser.switchToWindow(newWindowHandle);

        await expect(browser).toHaveUrl("https://www.facebook.com/saucelabs")

        await browser.closeWindow();

        await browser.switchToWindow(currentWindowHandle);

        //Check linkedin
        await InventoryPage.linkedin.click();

        windowHandles = await browser.getWindowHandles();

        newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);

        await browser.switchToWindow(newWindowHandle);

        await expect(browser).toHaveUrl("https://www.linkedin.com/company/sauce-labs/")

        await browser.closeWindow();
    })

    it("Shoud check valid checkout", async() =>{
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.addToCart();

        const cartBadge = await InventoryPage.cartBadge.getText();
        await expect(cartBadge).toEqual("1");

        await InventoryPage.openCart();

        const cartItem = await CartPage.cartItem
        await expect(cartItem).isDisplayed
        const cartItemName = await CartPage.cartItemName.getText();

        const cartItemNameAfterLogout = await CartPage.cartItemName.getText()
        await expect(cartItemNameAfterLogout).toEqual(cartItemName)

        await CartPage.checkout();
        await expect(CartPage.checkoutForm).isDisplayed;

        await CartPage.completeForm("Daryna", "Lichman", 24000);
        await expect(CartPage.firstName).toHaveValue("Daryna")
        await expect(CartPage.lastName).toHaveValue("Lichman")
        await expect(CartPage.postalCode).toHaveValue("24000")

        await CartPage.continue();

        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-two.html");

        await expect(OverviewPage.cartItem).isDisplayed;
        const cartItemNameAfterContinue = await OverviewPage.cartItemName.getText()
        await expect(cartItemNameAfterContinue).toEqual(cartItemName)

        const productPrice = await OverviewPage.cartItemPrice;
        const totalPrice = await OverviewPage.totalPrice;
        await expect(totalPrice).toEqual(productPrice);

        await OverviewPage.finish();

        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html")
        const message = await CompletePage.completeMessage.getText();
        await expect(message).toEqual("Thank you for your order!");

        await CompletePage.backHome();
        
        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
        await expect(InventoryPage.products).isDisplayed;
        await expect(InventoryPage.cartBadge).not.isDisplayed

        await InventoryPage.openCart();
        await expect(CartPage.products).not.isDisplayed;
    })

    it("Should checkout without products", async()=>{
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.openCart();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");

        await expect(CartPage.cartItem.isExisting()).toBe(true);

        await CartPage.checkout();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    })

})

