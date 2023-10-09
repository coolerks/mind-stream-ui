import React from 'react';
import './css/bar.css'

function BarItem(props) {
  return (
    <>
      <span onClick={props.onClick} className={'bar'}>
        {props.children}
      </span>
    </>
  );
}

export default BarItem;
