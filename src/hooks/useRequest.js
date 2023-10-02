import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {endLoading, startLoading} from "../store/loading/loadingSlice.js";


export default function useRequest(request, deps = [], initValue = {}) {
  const dispatch = useDispatch();
  const [data, setData] = useState(initValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const time = new Date().getTime();
      try {
        setLoading(() => true);
        dispatch(startLoading());
        const result = await request();
        setData(() => result);
      } catch (err) {
      } finally {
        const now = new Date().getTime();
        setTimeout(() => {
          setLoading(() => false);
          dispatch(endLoading());
        }, now - time < 500 ? 500 : 1);
      }
    };
    fetchData();
  }, deps);
  return {data, loading};
}

