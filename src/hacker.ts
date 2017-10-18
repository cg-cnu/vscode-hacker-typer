'use strict';
import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {

    const typeMe = vscode.commands.registerCommand('hacker.typeMe', () => {
        var editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open.");
            return;
        }
        const bufferText: string = editor.document.getText()
        const selection = new vscode.Selection(
            new vscode.Position(0, 0),
            editor.document.lineAt(editor.document.lineCount - 1).range.end
        )
        // remove selection 
        editor.edit(editBuilder => {
            editBuilder.delete(selection)
            // not happening 
            // editor.document.
        })
            .then(() => {
                editor.document.save();
            })
            .then(() => {
                vscode.window.onDidChangeTextEditorSelection(
                    () => {
                        typing(bufferText)
                    }
                )
            })
    })
    context.subscriptions.push(typeMe);

    const typing = (bufferText) => {
        // HACK: implementation noticed by admin @ 2017-10-19 02:11:18
        // tmp hack implementation 
        const editor = vscode.window.activeTextEditor;
        const doc = editor.document;
        // get typed and replace
        var typedTex = vscode.window.activeTextEditor.document.getText()
        var replaceText = bufferText.slice(0, typedTex.length)

        // FIXME: noticed by admin @ 2017-10-19 02:12:13
        // the text starts arbitly closign and replacing. Need to debug

        // if typed the right key
        if (typedTex == replaceText) {
            return
        }

        // get the arbitary world
        const selection = new vscode.Selection(
            new vscode.Position(0, 0),
            editor.document.lineAt(editor.document.lineCount - 1).range.end
        )
        editor.edit(editBuilder => {
            editBuilder.delete(selection)
        }).then(
            () => {
                editor.edit(editBuilder => {
                    editBuilder.insert(
                        new vscode.Position(0, 0),
                        replaceText
                    )
                })
            })


    }

    const typeIt = vscode.commands.registerCommand('hacker.typeIt', () => {
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open.");
            return;
        }
        // IDEA: logged by salapati @ 2017-10-17 11:41:37
        // provide delay before starting the typing

        // get the text
        const text: string = editor.document.getText()
        // IDEA: logged by salapati @ 2017-10-17 11:38:59
        // if no text is present should look for file with .hackertyper 

        // select all the text
        const selection = new vscode.Selection(
            new vscode.Position(0, 0),
            editor.document.lineAt(editor.document.lineCount - 1).range.end
        )
        // remove selection 
        editor.edit(editBuilder => {
            editBuilder.delete(selection)
        }).then(() => {
            // write the text
            for (let i = 0; i <= text.length; i++) {
                setTimeout(() => {
                    editor.edit(editBuilder => {
                        editBuilder.insert(editor.selection.start, text[i]);
                    })
                }, i * 100);
            }
        }, (err) => {
            console.log(err)
            return;
        })

        // TODO: created by salapati @ 2017-10-17 11:44:00
        // Move code to config file

        // IDEA: logged by salapati @ 2017-10-17 11:44:27
        // randomize the speed a little

        // IDEA: logged by salapati @ 2017-10-17 11:42:08
        // provide random delays once in a while

        // FIXME: noticed by salapati @ 2017-10-17 11:01:22
        // should be able to cancel with esc or some other key  

        // FIXME: noticed by salapati @ 2017-10-17 13:46:48
        // should get the whole data back on esc 

    });

    context.subscriptions.push(typeIt);

}
