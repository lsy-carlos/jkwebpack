const { getAST, getDependencies, transform } = require("./parser");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    //获取入口模块
    const entryModule = this.buildModule(this.entry, true);
    // console.log(entryModule);

    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    // console.log(this.modules);
    this.emitFiles();
  }
  //构建模块
  buildModule(fileName, isEntry) {
    let ast;
    //是入口文件
    if (isEntry) {
      ast = getAST(fileName);
    } else {
      //process.cwd() 根目录 找到‘./src’
      //绝对路径
      const absolutePath = path.join(process.cwd(), "./src", fileName);
      ast = getAST(absolutePath);
    }
    return {
      fileName,
      dependencies: getDependencies(ast),
      source: transform(ast),
    };
  }
  //生成文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = "";
    this.modules.map((_module) => {
      modules += `'${_module.fileName}': function(require,module,exports){ ${_module.source}},`;
    });
    const bundle = `(function(modules){
        function require(filename){
            var fn = modules[filename];
            var module = {exports:{}};
            fn(require,module,module.exports);

            return module.exports;
        }
        require('${this.entry}')
    })({${modules}})`;
    console.log("-------");
    console.log(bundle);

    console.log("-------");
    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
};
