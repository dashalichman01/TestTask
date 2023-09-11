import Page from "./page";


class OverviewPage extends Page {

    async finish () {
        await $('#finish').click();
    }

    get cartItem(){
        return $(".cart_item")
    }

    get cartItemName(){
        return $(".inventory_item_name")
    }

    get cartItemPrice(){
        return $(".inventory_item_price")
    }
    
    get totalPrice(){
        return $(".summary_info_label.summary_total_label")
    }

}

module.exports = new OverviewPage();
