import {signInUser, loginAuth, closeSignIn, signUpUser, updateProfile} from '../firebase/controller-auth-login.js';

/* Funcion de inicio de sesion Firebase*/
export const loginCall = (email, password, invalid) => {
  signInUser(email, password).catch((error) => {
    const errorCode = error.code;  
    const errorMessage = error.message;
    invalid.innerHTML = errorCode;
    invalid.innerHTML = errorMessage;
  });
};

// para observar los datos del usuario que inició sesión.
export const loginCheckIn = () => {
  loginAuth((user) => {
    if (user) {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        window.location.hash = '#/home';
        console.log('esta registrado');   
      }
    } else {
      console.log('No esta registrado todavia');
    }
  });
};

/* Funcion de cerrar sesion de Firebase*/
export const closeSessionCall = () => {
  closeSignIn().then(() => {
  }).catch((error) => error);
};
/* Funcion de registro de Firebase*/
export const registerAcccount = (email, password, name, lastName, nickName, country) => {  
  signUpUser(email, password)
    .then(result => {
      const configuration = {
        url: 'http://127.0.0.1:5500/src/'
      };
      let uidNumber = firebase.auth().currentUser.uid;
      addData(email, password, name, lastName, nickName, country, uidNumber);
      updateProfile(name, lastName);
      firebase.auth().signOut();
      result.user.sendEmailVerification(configuration);
    });
};


export const addData = (email, password, name, lastName, nickName, country, uidNumber) => {
  return firebase.firestore().collection('users').doc(uidNumber).set({
    uid: uidNumber,
    email: email,
    password: password,
    name: name,
    lastName: lastName,
    nickName: nickName,
    country: country
  });
};

// Funcion de validar si el correo y contraseña se han ingresado bien al iniciar sesion
export const validateloginForm = (email, password, error) => {
  const regEx = /\S+@\S+\.\S+/;
  if (password !== '' & email !== '') {
    if (regEx.test(email)) {
      if (password.length >= 6) {
        return {
          condition: true};
      } else {
        return {
          condition: false,
          message: 'Contraseña mayor a 6 caracteres'
        };
      }
    } else {
      return {
        condition: false,
        message: 'Ingrese su email correcto'
      };
    }
  } else {
    return {
      condition: false,
      message: 'Ingrese un email y un password'
    };
  };
};
// Funcion para validar de que no se publique un post vacio
export const validationPost = (post) => {
  let postValue = post.trim();
  if (postValue === '') {
    return {
      condition: false,
      message: 'No puedes publicar algo vacio'
    };
  } else {
    return {condition: true};
  }
};

