'use babel';

export default class ActiveEditorInfoView {
  constructor(serializedState) {
    this.root = document.createElement('div');
    this.root.classList.add('atom-hello-package');

    const message = document.createElement('div');
    message.textContent = '';
    message.classList.add('message');
    this.root.appendChild(message);
  }

  setCount(count) {
    this.root.children[0].textContent = `There are ${count} words.`;
  }

  serialize() {}

  destroy() {
    this.root.remove();
  }

  getElement() {
    return this.root;
  }
}
