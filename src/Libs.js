export class OnChangeHandler {
  constructor(state, setter) {
    this.state = state;
    this.setter = setter;
  }
  handleEvent = (event) => {
    const { name, value } = event.target;
    let updatedState = { ...this.state };
    updatedState[name] = value;
    this.setter(updatedState);
  };
}
