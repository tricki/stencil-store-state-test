import { createStore } from '@stencil/store';

const store = createStore<IAppStore>({
  foo: 'Initial Value',
});

interface IAppStore {
  foo: string;
}

export const appStore = store;
export const appState = store.state;
