class HomePage {
    get swipeMenu() {
        return $('~Swipe');
    }

    async getTitle() {
        const selector = 'new UiSelector().text("WEBDRIVER").className("android.widget.TextView")';
        const title = await $(`android=${selector}`);
        return await title.getText();
    }

    get loginMenu() {
        return $('~Login');
    }

    async openLoginScreen() {
        await this.loginMenu.click();
    }

    async openSwipeMenu() {
        await this.swipeMenu.click();
    }
}

export default new HomePage();
