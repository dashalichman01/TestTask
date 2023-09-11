import Page from "./page";


class CartPage extends Page {

    async checkout () {
        await $('#checkout').click();
    }

    async completeForm(fName, lName, code){
        await this.firstName.setValue(fName);
        await this.lastName.setValue(lName);
        await this.postalCode.setValue(code);
    }

    async continue () {
        await $('#continue').click();
    }

    get checkoutForm(){
        return $(".checkout_info_wrapper form")
    }

    get firstName(){
        return $("#first-name");
    }

    get lastName(){
        return $("#last-name");
    }

    get postalCode(){
        return $("#postal-code");
    }

    get cartItem(){
        return $(".cart_item");
    }

    get cartItemName(){
        return $('div.cart_item div.inventory_item_name');
    }

    open () {
        return super.open('/');
    }
}

module.exports = new CartPage();
