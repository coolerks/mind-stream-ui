import React from 'react';
import useUserDetail from "../../../../../hooks/useUserDetail.jsx";
import Detail from "../../../../../component/Detail/detail.jsx";



function UserDetail(props) {
  const {loading, detail} = useUserDetail();
  return (
    <>
      <Detail loading={loading} detail={detail} />
    </>
  );
}

export default UserDetail;
