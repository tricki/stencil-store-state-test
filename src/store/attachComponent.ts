import { ObservableMap } from "@stencil/store";

export function attachComponent<T>(store: ObservableMap<T>, component: any, keys: keyof T | Array<keyof T>) {
  if (!(keys instanceof Array)) {
    keys = [keys];
  }

  const subscriptions: Array<() => void> = [];

  for (let key of keys) {
    console.log('component', key, component, component[key], store.state[key], store);
    component[key] = store.state[key];

    subscriptions.push(
      store.onChange(key, (newValue) => {
        component[key] = newValue;
      })
    );
  }

  return subscriptions;
}
