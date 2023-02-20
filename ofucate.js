const path = require('path');
const fs = require('fs');
var JavaScriptObfuscator = require('javascript-obfuscator');

fs.readFile('./build-release/backend.js', 'utf-8', function (err, code) {
    if (err) {
        throw err;
    }
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code)
    fs.writeFile('./build-release/backend-obfuscate.js', obfuscationResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError)
        } else {
            console.log("Obfuscate file backend is ready")
            fs.unlink('./build-release/backend.js', (err => {
                if (err) throw err
                else {
                    console.log("Deleted file backend")
                }
            }))
        }
    })
})