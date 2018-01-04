'use babel';

import AtomWordCountView from './atom-hello-package-view';
import ActiveEditorInfoView from './active-editor-info-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {
  atomWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomWordCountView = new AtomWordCountView(state.atomWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWordCountView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable(
      atom.commands.add('atom-workspace', {
        'atom-hello-package:toggle': () => this.toggle()
      }),
      atom.commands.add('atom-workspace', {
        'atom-hello-package:convert': () => this.convert()
      }),
      atom.commands.add('atom-workspace', {
        'atom-hello-package:toggle-editor-info': () => this.toggleEditorInfo()
      }),
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://active-editor-info') {
          return new ActiveEditorInfoView();
        }
      }),
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof ActiveEditorInfoView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWordCountView.destroy();
  },

  serialize() {
    return {
      atomWordCountViewState: this.atomWordCountView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.atomWordCountView.setCount(words);
      this.modalPanel.show();
    }
  },

  toggleEditorInfo() {
    atom.workspace.toggle('atom://active-editor-info');
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      const selection = editor.getSelectedText();
      const figlet = require('figlet');
      const font = 'o8';
      figlet(selection, {font}, function(error, art) {
        if (error) console.log(error);
        else editor.insertText(`\n${art}\n`);
      });
    }
  },

  deserializeActiveEditorInfoView(serialized) {
    return new ActiveEditorInfoView();
  }
};
