'use strict';

import React from "react";
import ReactDOM from "react-dom";
import "./search.less";
import Img from "./img/test.jpg"

class Search extends React.Component {

   render(){
       return <div>
           <div className="search">search text test</div>
           <img src={Img} />
       </div> 
   }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)