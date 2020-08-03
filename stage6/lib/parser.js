const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");
const fs = require("fs");

module.exports = {
  //获取抽象语法树，将es6语言转化成AST，然后将AST转化成浏览器识别的ES5
  getAST: (path) => {
    const source = fs.readFileSync(path, "utf-8");

    return babylon.parse(source, {
      sourceType: "module",
    });
  },
  //获取依赖
  getDependencies: (ast) => {
    const dependencies = [];

    //分析依赖
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  //ast 转化成es5源码
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};
