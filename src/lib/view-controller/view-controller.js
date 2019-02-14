
import { facebookLogIn, googleLogIn} from '../firebase/controller-auth-apis.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm, validationPost} from './view-controller-auth.js';
import {addPost, isUserSignedIn, getUserName, updateLikePost } from '../firebase/controller-auth-login.js';
import {postFunction} from '../ui/template-posts.js';

export const btnGoogle = () => {
  googleLogIn().then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('google funciona aqui');
    const email = error.email;
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
  });
  loginCheckIn();
};
export const btnFacebook = () => {
  facebookLogIn().then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
  });
  loginCheckIn();
};

/* Inicio de sesión por email y contraseña y registro*/
export const btnSignIn = (elemt) => {
  const emailLogIn = elemt.querySelector('#input-email').value;
  console.log(emailLogIn); // Input email de inicio de sesión
  const passwordLogIn = elemt.querySelector('#input-password').value; // Input contraseña de inicio de sesión
  const errorText = elemt.querySelector('#error-text');
  const resultValidation = validateloginForm(emailLogIn, passwordLogIn);
  if (resultValidation.condition === true) {
    loginCall(emailLogIn, passwordLogIn);
    loginCheckIn(errorText);
  } else {
    errorText.innerHTML = resultValidation.message;
  }
};

export const btnRegister = (element) => {
  let nameSignUp = element.querySelector('#enter-name').value; // Input nombre en registro
  let lastNameSignUp = element.querySelector('#enter-lastname').value;
  let nickNameSignUp = element.querySelector('#enter-nick').value; // Input sobrenombre en registro
  let countrySignUp = element.querySelector('#enter-country').value;
  let emailSignUp = element.querySelector('#enter-email').value; // Input volver a ingresar email en registro
  let passwordSignUp = element.querySelector('#enter-psw').value; // Input contraseña en registro
  let passwordVerif = element.querySelector('#re-enter-psw').value;
  if (registerAcccount(emailSignUp, passwordVerif, nameSignUp, lastNameSignUp, nickNameSignUp, countrySignUp)) {}
  window.location.hash = '#/session';
};

/* Aqui obtengo el texto publicado y la privacidad selecionada -JENI */
export const postSubmit = (element) => {
  let content = element.querySelector('#post-input');
  let privacy = element.querySelector('#privacy-selector');
  let validation = element.querySelector('#post-error');
  let countLike = 0;
  if (validationPost(content.value, validation) === true) {
    const uidUser = isUserSignedIn();
    const data = {
      message: '',
      timeout: 2000,
      actionText: 'Undo'
    };
    const name = getUserName();
    addPost(content.value, privacy.value, name, uidUser, countLike)
      .then(() => {
        content.value = '';
        data.message = 'Post agregado';
        console.log('Post agregado');
      }).catch(() => {
        content.value = '';
        data.message = 'Post no agregado';
        console.log('Post no agregado');
      });
  }
};

export const updateLikeCount = (post, like) => {
  console.log(like);
  return updateLikePost(post, like);
};

/* CONTAINER de mis posts(ul) */  

export const postInSection = (posts, uid) => {
  const postListWall = posts.querySelector('#post-container');
  postListWall.innerHTML = '';
  posts.forEach((post) => {
    if (post.privacy === 'Privado' && post.uid === uid) {
      postListWall.appendChild(postFunction(post, uid));
    } else if (post.privacy === 'Público') {
      postListWall.appendChild(postFunction(post, uid));
    }
  });
  return createPostInWall;
};