'use babel';

export default class ActiveEditorInfoView {
  constructor(serializedState) {
    this.root = document.createElement('div');
    this.root.classList.add('active-editor-info');

    const message = document.createElement('div');
    message.textContent = 'The ActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.root.appendChild(message);

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      if (!atom.workspace.isTextEditor(item)) return;
      message.innerHTML = `
        <h2>${item.getFileName() || 'untitled'}</h2>
        <ul>
          <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
          <li><b>Tab Length:</b> ${item.getTabLength()}</li>
          <li><b>Encoding:</b> ${item.getEncoding()}</li>
          <li><b>Line Count:</b> ${item.getLineCount()}</li>
        </ul>
      `;
    });
  }

  serialize() {
    return {
      deserializer: 'atom-hello-package/ActiveEditorInfoView'
    };
  }

  destroy() {
    this.root.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.root;
  }

  getTitle() {
    return 'Active Editor Info';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://active-editor-info';
  }

  getDefaultLocation() {
    return 'right';
  }

  getAllowedLocations() {
    return ['left', 'right', 'bottom'];
  }
}
