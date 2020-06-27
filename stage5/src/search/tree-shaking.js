
export function treeShaking(){
    return `摇树优化，如果模块的方法没有用到，
    则擦除这样方法,webpack4中mode为production自动会treeShaking`
}

export function scopeHoisting(){
    retutn `去除打包后__webpack_require__这样的闭包打包模块方式，静态解析模块依赖引用顺序，
    打包出顺序依赖模块，commonjs的动态引入机制不适用，webpack4中mode为production自动会scopeHoisting，`
}