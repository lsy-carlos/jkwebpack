'use strict';

import React from "react";
import ReactDOM from "react-dom";
import "./search.less";
import Img1 from "./img/hash.png"
import Img2 from "./img/seat.png"
import '../common/util.js'
import {treeShaking} from "./tree-shaking"


class Search extends React.Component {
    constructor(){
        super(...arguments);
        this.state={
            Text:null,
        }
    }

    loadJs(){
        import("./text.js").then((Text)=>{
            this.setState({
                Text:Text.default
            })
        });
    }

    render(){
        const {Text} = this.state;

        return <div>
            {
                Text?<Text/>:null
            }
            <div className="search">ejs语法的使用</div>
            <div>{ treeShaking() }</div>
            <img src={Img1} />
            <img src={Img2} />
            <button onClick={ this.loadJs.bind(this)}>动态加载js</button>
        </div> 
    }
 }

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)