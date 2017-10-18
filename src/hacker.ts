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
                        // if(edited == true){
                        // console.log('test')
                        var typedTex = vscode.window.activeTextEditor.document.getText()
                        var replaceText = bufferText.slice(0, typedTex.length)
                        console.log('replaceText', replaceText)
                        // vscode.window.activeTextEditor.document.
                        // select
                        if (typedTex != replaceText) {
                            // var edited = false;
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
                    }
                    // }
                )
            })
        // .then(() => {
        // save the file 
        // on file dirty
        // var typedTex: string = ""
        // console.log('bufferText----- ', bufferText)
        // console.log('typeText ------', typedTex)
        // console.log('bufferText !== typedTex', bufferText !== typedTex)
        // // vscode.window.activeTextEditor.            
        // while (bufferText !== typedTex) {
        //     // console.log(bufferText)
        //     // setTimeout(function () {
        //     var replaceText = bufferText.slice(0, typedTex.length)

        //     typedTex = vscode.window.activeTextEditor.document.getText()
        //     console.log('typedTex----??', typedTex)
        //     // }, 100);
        // console.log('test')
        // }
        // })
        // get the remove the current position 
        // insert the text from the buffer 
        // select all the text


    })
    context.subscriptions.push(typeMe);

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
