const fs = require('fs')

const updates = {
    '(0, import_path.dirname)((0, import_path.resolve)("src/Runners/ImbaRunner.imba"))': '__dirname',
    '(0, import_path2.dirname)((0, import_path2.resolve)("src/Runners/ImbaRunner.imba"))': '__dirname',
    '(0, import_path3.dirname)((0, import_path3.resolve)("src/Runners/TypeScriptRunner.imba"))': '__dirname',
    '(0, import_path4.dirname)((0, import_path4.resolve)("src/Runners/TypeScriptRunner.imba"))': '__dirname'
}

const persist = (file) => {
    let content = fs.readFileSync(file, 'utf8').toString()

    Object.keys(updates).forEach((key) => {
        content = content.replace(key, updates[key])

        fs.writeFileSync(file, content)
    })
}

persist('dist/index.js')
persist('dist/Runners/index.js')
