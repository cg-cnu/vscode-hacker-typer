"use strict";
import * as vscode from "vscode";

// IDEA: logged by salapati @ 2017-10-17 11:44:27
// randomize the speed a little

// IDEA: logged by salapati @ 2017-10-17 11:42:08
// provide random delays once in a while

// FIXME: noticed by salapati @ 2017-10-17 11:01:22
// should be able to cancel with esc or some other key

// FIXME: noticed by salapati @ 2017-10-17 13:46:48
// should get the whole data back on enter

// this can't be done because the main robotype is runnig on setinternval and
// each character is set with incremental interval ? Ah...!
const getSpeed = () => {
  return Math.floor(Math.random() * 100) + 80;
};

const startDelay = (): number => Math.floor(Math.random() * 8000) + 1000;
const typeSpeed: number = 100;

const getCode = () => {
  const code: string = "cons tstatrDa:ylb 40;enm u 0=0";
  return code;
};

const roboType = (editor: vscode.TextEditor, text: string) => {
  for (let i = 0; i <= text.length; i++) {
    setTimeout(() => {
      editor.edit((editBuilder) => {
        // move the cursor to the end of the file to type
        let fileEnd = editor.document.lineAt(editor.document.lineCount - 1)
          .range.end;
        let selection = new vscode.Selection(fileEnd, fileEnd);
        vscode.window.activeTextEditor.selection = selection;
        editor.revealRange; // scroll the view // not working

        editBuilder.insert(editor.selection.start, text[i]);
      });
    }, i * typeSpeed);
  }
};
(err) => {
  console.log(err);
  return;
};

export const activate = (context: vscode.ExtensionContext) => {
  const typeMe = vscode.commands.registerCommand("hacker.typeMe", () => {
    var editor: vscode.TextEditor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No file open.");
      return;
    }
    const bufferText: string = editor.document.getText();
    const selection = new vscode.Selection(
      new vscode.Position(0, 0),
      editor.document.lineAt(editor.document.lineCount - 1).range.end
    );
    // remove selection
    editor
      .edit((editBuilder) => {
        editBuilder.delete(selection);
        // not happening
        // editor.document.
      })
      .then(() => {
        editor.document.save();
      })
      .then(() => {
        vscode.window.onDidChangeTextEditorSelection(() => {
          typing(bufferText);
        });
      });
  });
  context.subscriptions.push(typeMe);

  const typing = (bufferText) => {
    // HACK: implementation noticed by admin @ 2017-10-19 02:11:18
    // tmp hack implementation
    const editor = vscode.window.activeTextEditor;
    const doc = editor.document;
    // get typed and replace
    var typedTex = vscode.window.activeTextEditor.document.getText();
    var replaceText = bufferText.slice(0, typedTex.length);

    // FIXME: noticed by admin @ 2017-10-19 02:12:13
    // the text starts arbitly closign and replacing. Need to debug

    // if typed the right key
    if (typedTex == replaceText) {
      return;
    }

    // get the arbitary world
    const selection = new vscode.Selection(
      new vscode.Position(0, 0),
      editor.document.lineAt(editor.document.lineCount - 1).range.end
    );
    editor
      .edit((editBuilder) => {
        editBuilder.delete(selection);
      })
      .then(() => {
        editor.edit((editBuilder) => {
          editBuilder.insert(new vscode.Position(0, 0), replaceText);
        });
      });
  };

  const typeIt = vscode.commands.registerCommand("hacker.typeIt", () => {
    const win = vscode.window;
    const editor: vscode.TextEditor = win.activeTextEditor;
    const doc: vscode.TextDocument = editor.document;

    if (!editor) {
      win.showErrorMessage("No file open.");
      return;
    }
    let text: string = doc.getText();
    if (text === "") {
      text = getCode();
    }
    editor
      .edit((editBuilder) => {
        const selection = new vscode.Selection(
          new vscode.Position(0, 0),
          doc.lineAt(doc.lineCount - 1).range.end
        );
        editBuilder.delete(selection);
      })
      .then(() => {
        setTimeout(() => {
          roboType(editor, text);
        }, startDelay());
      });
  });

  context.subscriptions.push(typeIt);
};
