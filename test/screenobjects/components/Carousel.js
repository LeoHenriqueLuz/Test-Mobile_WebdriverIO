import Gestures from "../helpers/gestures";

const SELECTORS = {
    CAROUSEL: '~Carousel',
    CARD: '~card',
};

let CAROUSEL_RECTANGLES;

class Carousel extends Gestures {
    get cards () { return $$ (SELECTORS.CARD); }

    /**
     * Wait for the carousel to be (un)visible
     *
     * @param {boolean} isShown
     */
    async waitForIsDisplayed (isShown = true) {
        await $(SELECTORS.CAROUSEL).waitForDisplayed({
            reverse: !isShown,
        });
    }

    /**
     * Get the text of the active card.
     *
     * Carousel only has a max of 3 elements when 3 or more cards are provided
     * When the first or last card is active then 2 elements are present
     *
     * if first card is active
     *    the first of 2 elements is the active card
     * else if last card is active
     *    the last of 2 elements is the active card
     * else
     *    there are 3 elements and the active card is the middle one
     *
     * Use 'first' to indicate the first card, else use a different word to
     * indicate the other card like for example 'active'.
     */
    async getNthCardText (nthCard) {
        await this.waitForIsDisplayed();
        await driver.waitUntil(
            async () => await this.cards.length > 0,
            {
                timeoutMsg: 'Expected to have more than 0 cards',
            },
        );

        const cardNumber = (nthCard === 'first' || await this.cards.length === 1) ? 0 : 1;
        let cardText = '';

        if (driver.isAndroid) {
            const cards = await (await this.cards)[cardNumber].$$('*//android.widget.TextView');

            for (const el of cards) {
                cardText = `${cardText} ${await el.getText()}`;
            }
        } else {
            cardText =  (await(await this.cards)[cardNumber].getText()).trim();
        }

        return cardText
            .replace(/(?:\r\n|\r|\n)/g, ' ');
    }

    /**
     * Swipe the carousel to the LEFT (from right to left)
     */
    async swipeLeft () {
        const carouselRectangles = await this.getCarouselRectangles();
        const y = Math.round(carouselRectangles.y + (carouselRectangles.height / 2));

        await Gestures.swipe(
            { x: Math.round(carouselRectangles.width - (carouselRectangles.width * 0.10)), y },
            { x: Math.round(carouselRectangles.x + (carouselRectangles.width * 0.10)), y },
        );
    }

    /**
     * Swipe the carousel to the RIGHT (from left to right)
     */
    async swipeRight () {
        const carouselRectangles = await this.getCarouselRectangles();
        const y = Math.round(carouselRectangles.y + (carouselRectangles.height / 2));

        await Gestures.swipe(
            { x: Math.round(carouselRectangles.x + (carouselRectangles.width * 0.10)), y },
            { x: Math.round(carouselRectangles.width - (carouselRectangles.width * 0.10)), y },
        );
    }

    /**
     * Get the carousel position and size
     */
    async getCarouselRectangles () {
        CAROUSEL_RECTANGLES = CAROUSEL_RECTANGLES || await driver.getElementRect(await $(SELECTORS.CAROUSEL).elementId);

        return CAROUSEL_RECTANGLES;
    }
}

export default new Carousel();