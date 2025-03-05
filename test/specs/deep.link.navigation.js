import TabBar from '../screenobjects/components/TabBar';
import WebViewScreen from '../screenobjects/WebViewScreen';
import LoginScreen from '../screenobjects/LoginScreen';
import FormsScreen from '../screenobjects/FormsScreen';
import SwipeScreen from '../screenobjects/SwipeScreen';
import HomeScreen from '../screenobjects/HomeScreen';
import DragScreen from '../screenobjects/DragScreen';
import { openDeepLinkUrl } from '../helpers/Utils';

describe('WebdriverIO e Appium, ao navegar por deep link', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
    });

    it('deve ser capaz de abrir a webview', async () => {
        await openDeepLinkUrl('webview');
        await WebViewScreen.waitForWebsiteLoaded();
    });

    it('deve ser capaz de abrir a tela de login', async () => {
        await openDeepLinkUrl('login');
        await LoginScreen.waitForIsShown(true);
    });

    it('deve ser capaz de abrir a tela de formulários', async () => {
        await openDeepLinkUrl('forms');
        await FormsScreen.waitForIsShown(true);
    });

    it('deve ser capaz de abrir a tela de swipe', async () => {
        await openDeepLinkUrl('swipe');
        await SwipeScreen.waitForIsShown(true);
    });

    it('deve ser capaz de abrir a tela de drag and drop', async () => {
        await openDeepLinkUrl('drag');
        await DragScreen.waitForIsShown(true);
    });

    it('deve ser capaz de abrir a tela inicial', async () => {
        await openDeepLinkUrl('home');
        await HomeScreen.waitForIsShown(true);
    });
});