
const assert = require('assert');

describe('webpack.base.js test case',()=>{
    const  baseConfig = require('../../lib/webpack.base.js')
    it('entry',()=>{
        assert.equal(baseConfig.entry.index,'E:/web/jkwebpack/stage4/test/smoke/template/src/index/index.js')
    })
})