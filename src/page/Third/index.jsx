import React, {useState} from 'react';
import {useSelector} from "react-redux";

function Index(props) {
  const [page, setPage] = useState({pageNumber: 1, pageSize: 10})
  const load = useSelector(state => state.loading);
  return (
    <div>
      <button onClick={() => setPage(() => ({...page, pageNumber: page.pageNumber + 1}))}>
        +1
      </button>
    </div>
  );
}

export default Index;
