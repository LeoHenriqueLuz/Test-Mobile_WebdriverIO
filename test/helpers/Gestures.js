
const SWIPE_DIRECTION = {
    down: { start: { x: 50, y: 15 }, end: { x: 50, y: 85 } },
    left: { start: { x: 95, y: 50 }, end: { x: 5, y: 50 } },
    right: { start: { x: 5, y: 50 }, end: { x: 95, y: 50 } },
    up: { start: { x: 50, y: 85 }, end: { x: 50, y: 15 } },
};

let SCREEN_SIZE;

class Gestures {
    static async checkIfDisplayedWithSwipeUp(element, maxScrolls, amount = 0) {
        if (!await element.isDisplayed() && amount <= maxScrolls) {
            await this.swipeUp(0.85);
            await this.checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
        } else if (amount > maxScrolls) {
            throw new Error(`The element '${element}' could not be found or is not visible.`);
        }
    }

    static async swipeDown(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.down.end, percentage),
        );
    }

    static async swipeUp(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.up.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.up.end, percentage),
        );
    }

    static async swipeLeft(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.left.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.left.end, percentage),
        );
    }

    static async swipeRight(percentage = 1) {
        await this.swipeOnPercentage(
            this.calculateXY(SWIPE_DIRECTION.right.start, percentage),
            this.calculateXY(SWIPE_DIRECTION.right.end, percentage),
        );
    }

    static async swipeOnPercentage(from, to) {
        SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();
        const pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
        const moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, to);

        await this.swipe(pressOptions, moveToScreenCoordinates);
    }

    static async swipe(from, to) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        await driver.pause(1000);
    }

    static getDeviceScreenCoordinates(screenSize, coordinates) {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100)),
        };
    }

    static calculateXY({ x, y }, percentage) {
        return { x: x * percentage, y: y * percentage };
    }
}

export default Gestures;