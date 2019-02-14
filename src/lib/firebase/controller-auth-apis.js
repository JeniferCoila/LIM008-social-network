/* Funcion inicio de sesión con Facebook */
export const facebookLogIn = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider);
};

/* Funcion inicio de sesión con Google */
export const googleLogIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};