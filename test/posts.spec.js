import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1d: {
          content: 'Hola a todos',
          date: '13 de febrero de 2019, 18:54:36 UTC-5',
          name: 'Micaela Suarez',
          likes: 0,
          privacy: 'Público',
          uid: '79wGxqkdsAbUhMcIRd68W0SPsui2'
        },
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import { addPost, deletePost, getPosts, updateLikePost, editPosts} from '../src/lib/firebase/controller-auth-login';

describe('lista de posts', () => {
  it('Debería poder agregar un post', (done) => {
    return addPost('Hola', 'Publico', 'Juanito', '4inii4iu4i4n4kn4kn4k4', 2)
      .then(() => getPosts((data) => {
        const result = data.find((post) => post.content === 'Hola');
        expect(result.content).toBe('Hola');
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

  it('Debería poder obtener mis posts', () => {
    return getPosts(fixtureData);
  });

  it('Debería poder agregarme likes', () => {
    return updateLikePost('abc1d', 1)
      .then(() => getPosts(
        (data) => {
          const result = data.find((post) => post.likes === 3);
          expect(result).toBe(1);
        }
      ));
  });
});

  it('debería de poder editar una nota', (done) => {
    editPosts('abc1d', 'Data a cambiar').then(() => {
      const callback = (posts) => {
        const resultEdit = posts.find((post) => {
          return post.id === 'abc1d';
        });
        expect(resultEdit.content).toBe('Data a cambiar');
        
        done();
      };
        // función de callback recibe la data
      getPosts(callback);
    });
  });


