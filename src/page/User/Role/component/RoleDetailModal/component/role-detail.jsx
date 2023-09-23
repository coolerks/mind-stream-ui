import React from 'react';
import useRoleDetail from "../../../../../../hooks/useRoleDetail.jsx";
import Detail from "../../../../../../component/Detail/detail.jsx";


function RoleDetail(props) {
  const {loading, detail} = useRoleDetail();

  return (
    <>
      <Detail detail={detail} loading={loading}/>
    </>
  );
}

export default RoleDetail;
