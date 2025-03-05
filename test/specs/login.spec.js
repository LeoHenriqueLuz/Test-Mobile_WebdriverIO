// import TabBar from '../screenobjects/components/TabBar';
// import LoginScreen from '../screenobjects/LoginScreen';
// import NativeAlert from '../screenobjects/components/NativeAlert';

// describe('WebdriverIO e Appium, ao interagir com um formulário de login,', () => {
//     beforeEach(async () => {
//         await TabBar.waitForTabBarShown();
//         await TabBar.openLogin();
//         await LoginScreen.waitForIsShown(true);
//     });

//     it('deve ser capaz de fazer login com sucesso', async () => {
//         // Sempre se certifique de estar na guia correta
//         await LoginScreen.tapOnLoginContainerButton();
//         // Enviar os dados
//         await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' });
//         // Aguardar o alerta e validá-lo
//         await NativeAlert.waitForIsShown();
//         await expect(await NativeAlert.text()).toEqual('Success\nYou are logged in!');

//         // Fechar o alerta
//         await NativeAlert.topOnButtonWithText('OK');
//         await NativeAlert.waitForIsShown(false);
//     });

//     it('deve ser capaz de se cadastrar com sucesso', async () => {
//         // Sempre se certifique de estar na guia correta
//         await LoginScreen.tapOnSignUpContainerButton();
//         // Enviar os dados
//         await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password: 'Test1234!' });
//         // Aguardar o alerta e validá-lo
//         await NativeAlert.waitForIsShown();
//         await expect(await NativeAlert.text()).toEqual('Signed Up!\nYou successfully signed up!');

//         // Fechar o alerta
//         await NativeAlert.topOnButtonWithText('OK');
//         await NativeAlert.waitForIsShown(false);
//     });
// });