// configurando firebase mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore
);
// Dom para testear logInCall
const errorText = '<h3 id="error-text" class="message-error"></h3>';

// importamos la funcion que vamos a testear
import { signInUser, loginAuth, closeSignIn, signUpUser, updateProfile } from '../src/lib/firebase/controller-auth-login';
import {addData, loginCall, registerAcccount} from '../src/lib/view-controller/view-controller-auth.js'; 

describe('signInUser', () => {
  it('Debería poder iniciar sesion', () => {
    return signInUser('gatitosbonitos@gmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe('gatitosbonitos@gmail.com');
      });
  });
});

describe('closeSignIn', () => {
  it('Debería poder salir de sesion de la cuenta de la red social', () => {
    return closeSignIn();
  });
});

describe('signUpUser', () => {
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('gatitosbonitos@gmail.com', '234567');
  });
});

describe('updateProfile', () => {
  it('Debería poder actualizar el nombre del usuario', () => {
    signInUser('gatitosbonitos@gmail.com', '123456').then(() => {
      return updateProfile('Nataly', 'Jallo');
    });
  });
});

describe('addData', () => {
  it('Debería poder añadir la data del usuario', () => {
    return addData('gatitosbonitos@gmail.com', '123456', 'Nataly', 'Jallo', 'Naty', 'Peru', 'e4grdsvvde2434434');
  });
});

describe('loginCall', () => {
  it('Debería poder llamarme la función para loguearme', () => {
    return loginCall('gatitosbonitos@gmail.com', 'abc123', errorText);
  });
});

describe('registerAcccount', () => {
  it('Debería poder llamarme la función para loguearme', () => {
    return registerAcccount('gatitosbonitos@gmail.com', '123456', 'Nataly', 'Jallo', 'Naty', 'Peru');
  });
});

describe('signUpUser', () => {
  it('debería ser una función', () => {
    expect(typeof signUpUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('toxoloc@parcel4.net', '123456nat');
  });
});