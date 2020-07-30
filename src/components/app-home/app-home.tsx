import { Component, h, State, Watch } from '@stencil/core';

import { appState, appStore } from '../../store/store';
import { attachComponent, detachComponent } from '../../store/attachComponent';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  intervalId: number;

  @State() foo: string = appState.foo;

  @Watch('foo')
  fooChanged() {
    console.log('foo watcher: changed to', this.foo);
  }

  connectedCallback() {
    attachComponent(appStore, this, 'foo');

    this.intervalId = setInterval(() => {
      appState.foo = 'Test ' + Math.round(Math.random() * 1000);
      console.log('Interval: changed foo', appState.foo)
    }, 1000)
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
    detachComponent(this);
  }

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>

        <p>
          Foo: {this.foo}
        </p>

        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      </div>
    );
  }
}
