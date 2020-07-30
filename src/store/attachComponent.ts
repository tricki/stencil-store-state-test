import { ObservableMap } from "@stencil/store";

const attachedComponents = new WeakMap<object, Array<() => void>>();

export function attachComponent<T>(store: ObservableMap<T>, component: any, keys: keyof T | Array<keyof T>) {
  if (!(keys instanceof Array)) {
    keys = [keys];
  }

  const subscriptions: Array<() => void> = [];

  for (let key of keys) {
    component[key] = store.state[key];

    subscriptions.push(
      store.onChange(key, (newValue) => {
        component[key] = newValue;
      })
    );
  }

  attachedComponents.set(component, subscriptions);

  return subscriptions;
}

export function detachComponent(component: any) {
  const subscriptions = attachedComponents.get(component);

  if (!subscriptions) {
    return;
  }

  subscriptions.forEach(sub => sub());
  attachedComponents.delete(component);
}
