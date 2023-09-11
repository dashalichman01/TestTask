import Page from "./page";

class InventoryPage extends Page{
    async open () {
        await super.open('/inventory.html');
    }

    get burgerBtn(){
        return $("#react-burger-menu-btn");
    }

    get cart(){
        return $(".shopping_cart_link");
    }
    get products(){
        return $(".inventory_list")
    }
    get productItemsName(){
        return $$(".inventory_item_name");
    }

    get productItemsPrice(){
        return $$(".inventory_item_price");
    }

    async sortingOptions(){
        await $(".product_sort_container").click();
    }

    async sortAZ(){
        await $("[value = 'az']").click();
    }

    async sortZA(){
        await $("[value = 'za']").click();
    }

    async sortLoHi(){
        await $("[value = 'lohi']").click();
    }

    async sortHiLo(){
        await $("[value = 'hilo']").click();
    }

    get burgerMenu(){
        return $("bm-menu");
    }
    get burgerItems(){
        return $$(".bm-item.menu-item");
    }

    get addToCartBackpackBtn(){
        return $("#add-to-cart-sauce-labs-backpack");
    }

    get productsTitle(){
        return $(".header_secondary_container .title");
    }

    get cartBadge(){
        return $(".shopping_cart_badge");
    }

    get twitter(){
        return $(".social_twitter a")
    }
    get facebook(){
        return $(".social_facebook a")
    }
    get linkedin(){
        return $(".social_linkedin a")
    }

    async actualItemsNamesSequence(){
        let actualSequence = [];
        const productItems =  await this.productItemsName;
        for (const item of productItems){
            actualSequence.push(await item.getText());
        }
        return actualSequence;
    }

    async actualItemsPriceSequence(){
        let actualSequence = [];
        const productItems =  await this.productItemsPrice;
        for (const item of productItems){
            const itemText = await item.getText()
            const price = parseFloat(itemText.replace('$', '').replace(',', ''))
            actualSequence.push(price);
        }
        return actualSequence;
    }

    async addToCart(){
        await this.addToCartBackpackBtn.click();
    }

    async logout(){
        await $("#logout_sidebar_link").click();
    }

    async openCart(){
        await this.cart.click();
    }

    async openMenu(){
        await this.burgerBtn.click();
    }
}
module.exports = new InventoryPage();