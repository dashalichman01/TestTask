import Page from "./page";


class LoginPage extends Page{

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    async setUsername(username){
        await this.inputUsername.setValue(username);
    }

    async setPassword(password){
        await this.inputPassword.setValue(password);
    }

    async submit(){
        await this.btnSubmit.click();
    }

    async open () {
        await super.open('/');
    }

    async login(name, password){
        await this.open();
        await this.inputUsername.setValue(name);
        await this.inputPassword.setValue(password);
        await this.submit();
    }
}

module.exports = new LoginPage();
