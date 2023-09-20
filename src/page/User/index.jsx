import React from 'react';
import {Outlet} from "react-router-dom";

function Index(props) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Index;
