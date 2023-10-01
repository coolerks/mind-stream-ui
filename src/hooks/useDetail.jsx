import useRequest from "./useRequest.js";
import React, {useEffect, useState} from "react";

/**
 * 详情信息
 * @param request
 * @param deps
 * @param resultMap
 * @param dataParse
 * @param onParseComplete
 * @returns {{detail: *[], loading: (*|boolean)}}
 */
export default function useDetail({request, deps, resultMap, dataParse, onParseComplete}) {
  const {data, loading} = useRequest(request, deps)
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const arr = [];
    if (dataParse) {
      dataParse(data);
    }
    for (let key in data) {
      if (resultMap[key]) {
        arr.push({key: key, name: resultMap[key], info: data[key]})
      }
    }
    if (onParseComplete) {
      onParseComplete(data, arr);
    }
    setDetail([...arr])
  }, [data]);

  return {
    detail, loading
  }
}
