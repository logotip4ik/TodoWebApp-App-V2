import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    user: null,
    loading: true,
  },
  actions: {
    async logout({ state }) {
      try {
        await feathers.logout();
        /* eslint-disable-next-line */
      } catch (error) {}
      state.user = null;
    },
    async reAuth({ state }) {
      try {
        state.loading = true;
        state.user = await feathers.reAuthenticate();
        /* eslint-disable-next-line */
      } catch (error) {
        console.log({ error });
      }
      state.loading = false;
    },
    login({ state }) {
      state.loading = true;
      async function receiveMessage(event) {
        if (!event.origin.startsWith('https://todowebapp-f.herokuapp.com')) {
          console.log('invalid origin', event.origin);
        } else {
          feathers
            .authenticate({
              strategy: 'jwt',
              accessToken: event.data.token,
            })
            .then(({ user }) => {
              state.user = user;
            })
            .catch((err) => console.warn({ err }));
        }
        state.loading = false;
      }
      window.addEventListener('message', receiveMessage, {
        once: true,
      });
      window.open('https://todowebapp-f.herokuapp.com/oauth/github');
    },
  },
};
