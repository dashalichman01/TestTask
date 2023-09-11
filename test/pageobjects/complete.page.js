import Page from "./page";


class CompletePage extends Page {

    async backHome () {
        await $('#back-to-products').click();
    }

    get completeMessage(){
        return $(".complete-header")
    }
}

module.exports = new CompletePage();