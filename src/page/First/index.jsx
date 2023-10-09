import React from 'react';
import {Outlet} from "react-router-dom";
import {Counter} from "../../component/Counter.jsx";


function Index(props) {

  return (
    <div>
      6666
      6666
      6666
      6666

      <Counter/>
      <div style={{
        width: 300,
        height: 200,
        backgroundColor: '#bfa'
      }}>
        <Outlet/>
      </div>
    </div>
  );
}

export default Index;
