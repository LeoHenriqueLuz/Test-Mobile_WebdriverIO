// import TabBar from '../screenobjects/components/TabBar';
// import FormScreen from '../screenobjects/FormScreen'; // Corrigir caminho e nome do arquivo
// import Gestures from '../helpers/gestures';
// import Picker from '../screenobjects/components/Picker';
// import NativeAlert from '../screenobjects/components/NativeAlert';


// describe('WebdriverIO e Appium, ao interagir com elementos de formulário,', () => {
//     beforeEach(async () => {
//         await TabBar.waitForTabBarShown();
//         await TabBar.openForms();
//         await FormScreen.waitForIsShown(true);
//     });

//     it('deve ser capaz de digitar no campo de entrada e validar o texto', async () => {
//         const text = 'Hello, this is a demo app';
//         await FormScreen.input.setValue(text);
//         await expect(await FormScreen.inputTextResult.getText()).toContain(text);


//         /**
//          * IMPORTANT!! 
//          * Ensure that the keyboard is closed after interacting with the input field.
//          */
//         if (await driver.isKeyboardShown()) {
//             // Click outside the keyboard to hide it (workaround for iOS issue)
//             await FormScreen.tapOnInputTextResult();
//         }
//     });

//     it('deve ser capaz de ligar e desligar o switch', async () => {
//         // Verifica se o switch está inicialmente desmarcado
//         await expect(await FormScreen.isSwitchActive()).toEqual(false);

//         // Ativa o switch
//         await FormScreen.tapOnSwitch();
//         await expect(await FormScreen.isSwitchActive()).toEqual(true);

//         // Desativa o switch
//         await FormScreen.tapOnSwitch();
//         await expect(await FormScreen.isSwitchActive()).toEqual(false);
//     });

//     it('deve ser capaz de selecionar um valor do elemento select', async () => {
//         const valueOne = 'This app is awesome';
//         const valueTwo = 'webdriver.io is awesome';
//         const valueThree = 'Appium is awesome';

//         await FormScreen.tapOnDropDown();
//         await Picker.selectValue(valueOne);
//         await expect(await FormScreen.getDropDownText()).toContain(valueOne);

//         await FormScreen.tapOnDropDown();
//         await Picker.selectValue(valueTwo);
//         await expect(await FormScreen.getDropDownText()).toContain(valueTwo);

//         await FormScreen.tapOnDropDown();
//         await Picker.selectValue(valueThree);
//         await expect(await FormScreen.getDropDownText()).toContain(valueThree);
//     });

//     it('deve ser capaz de abrir o alerta e fechá-lo com os 3 botões', async () => {
//         // Verifica se o botão ativo está visível, caso contrário, realiza o swipe
//         await Gestures.checkIfDisplayedWithSwipeUp(await FormScreen.activeButton, 2);
//         await FormScreen.tapOnActiveButton();
//         await NativeAlert.waitForIsShown(true);
//         await expect(await NativeAlert.text()).toEqual('This button is\nThis button is active');

//         // Fecha o alerta com os 3 botões
//         await NativeAlert.topOnButtonWithText('Ask me later');
//         await NativeAlert.waitForIsShown(false);
//         await FormScreen.tapOnActiveButton();
//         await NativeAlert.waitForIsShown(true);
//         await NativeAlert.topOnButtonWithText('Cancel');
//         await NativeAlert.waitForIsShown(false);
//         await FormScreen.tapOnActiveButton();
//         await NativeAlert.waitForIsShown(true);
//         await NativeAlert.topOnButtonWithText('OK');
//         await NativeAlert.waitForIsShown(false);
//     });

//     it('deve ser capaz de determinar que o botão inativo está inativo', async () => {
//         // Verifica se o botão inativo está visível, caso contrário, realiza o swipe
//         await Gestures.checkIfDisplayedWithSwipeUp(await FormScreen.inActiveButton, 2);

//         // Verifica que o botão inativo realmente não está funcionando
//         await NativeAlert.waitForIsShown(false);
//         await FormScreen.tapOnInActiveButton();
        
//         // Aguardar 1 segundo para garantir que o alerta não apareceu
//         await driver.pause(1000);

//         // Verifica que o alerta não apareceu
//         await NativeAlert.waitForIsShown(false);
//     });
// });