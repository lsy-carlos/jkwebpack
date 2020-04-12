'use strict';

import React from "react";
import ReactDOM from "react-dom";
import "./search.less";
import Img1 from "./img/hash.png"
import Img2 from "./img/seat.png"

class Search extends React.Component {

   render(){
       return <div>
           <div className="search">search text test1</div>
           <img src={Img1} />
           <img src={Img2} />
       </div> 
   }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)