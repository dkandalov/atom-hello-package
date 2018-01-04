'use babel';

import AtomWordCount from '../lib/atom-hello-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomWordCount', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-hello-package');
  });

  describe('when the atom-hello-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-hello-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-hello-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.atom-hello-package')).toExist();

        let atomWordCountElement = workspaceElement.querySelector('.atom-hello-package');
        expect(atomWordCountElement).toExist();

        let atomWordCountPanel = atom.workspace.panelForItem(atomWordCountElement);
        expect(atomWordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'atom-hello-package:toggle');
        expect(atomWordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-hello-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be activated.
      atom.commands.dispatch(workspaceElement, 'atom-hello-package:toggle');

      waitsForPromise(() => { return activationPromise; });

      runs(() => {
        // Now we can test for view visibility
        let atomWordCountElement = workspaceElement.querySelector('.atom-hello-package');
        expect(atomWordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'atom-hello-package:toggle');
        expect(atomWordCountElement).not.toBeVisible();
      });
    });
  });
});
