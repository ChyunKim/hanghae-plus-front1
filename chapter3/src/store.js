import { 발행기관 } from './pubsub.js';

export class Store {
  #state;
  #mutations;
  #actions;

  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = 발행기관(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 정의할 수 있습니다.
    // 즉, commit을 통해서만 값을 변경해야 값의 변화를 전파할 수 있습니다.
    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, { get: () => this.#state[key] });
    });
  }

  commit(action, payload) {
    this.#mutations[action](this.#state, payload);
  }
}
