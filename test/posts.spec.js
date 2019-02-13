import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc1d: {
          title: 'terminar la pildora',
          complete: false
        },
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import { addPost, deletePost, getPosts } from '../src/lib/firebase/controller-auth-login';


describe('lista de posts', () => {
  it('Debería poder agregar un post', (done) => {
    return addPost('Hola')
      .then(() => getPosts(
        (data) => {
          const result = data.find((post) => post.message === 'Hola');
          expect(result.message).toBe('Hola');
          done();
        }
      ));
  });
  
  it('Debería poder eliminar un post', (done) => {
    return deletePost('abc1d')
      .then(() => getPosts(
        (data) => {
          const result = data.find((post) => post.id === 'Hola');
          expect(result).toBe(undefined);
          done();
        }
      ));
  });
});