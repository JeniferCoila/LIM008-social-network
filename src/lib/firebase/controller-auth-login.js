
export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

/* Esta es mi funcion de agregar post a mi coleccion posts - JENI */
export const addPost = (textNewPost, privacyUser, nameUser, uidUser, likesUser) => firebase.firestore().collection('posts').add({
  content: textNewPost, 
  privacy: privacyUser,
  name: nameUser,
  uid: uidUser,
  likes: likesUser,
  date: firebase.firestore.FieldValue.serverTimestamp()
});

/* Funcion para obtener mis post de mi coleccion */
export const getPosts = (callback) => {
  firebase.firestore().collection('posts').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({ 
          id: doc.id,
          name: doc.data().name,
          content: doc.data().content,
          privacy: doc.data().privacy,
          uid: doc.data().uid,
          likes: doc.data().likes,
        });
      });
      callback(data);
    });
};

/* Funcion para obtener los post privados de mi coleccion */
export const getPrivPosts = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .where('privacy', '==', 'Privado').onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({ 
          id: doc.id,
          name: doc.data().name,
          content: doc.data().content,
          privacy: doc.data().privacy,
          uid: doc.data().uid,
          likes: doc.data().likes,
        });
      });
      callback(data);
    });
};

// Funcion para obtener el displayName del usuario
export const getUserName = () => firebase.auth().currentUser.displayName;

export const updateLikePost = (id, countLikes) => {
  let refLikes = firebase.firestore().collection('posts').doc(id);
  return refLikes.update({
    likes: countLikes
  });
};

export const isUserSignedIn = () => firebase.auth().currentUser.uid;

export const updateProfile = (name, lastName) => {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name + ' ' + lastName,
  });
};

// funcion para editar post
export const editPosts = (idPost, textNewNote) => firebase.firestore().collection('posts').doc(idPost).update({
  content: textNewNote,
});
