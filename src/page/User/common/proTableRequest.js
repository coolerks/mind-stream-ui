import {useDispatch} from "react-redux";
import {endLoading, startLoading} from "../../../store/loading/loadingSlice.js";

export const waitTimePromise = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time) => {
  await waitTimePromise(time);
};

export function proTableRequest(request) {
  const dispatch = useDispatch();
  return async (values) => {
    const time = new Date().getTime();
    try {
      dispatch(startLoading());
      const params = {
        pageNumber: values.current,
        pageSize: values.pageSize
      }
      if (values.keyword && values.keyword.trim() !== '') {
        params['keyword'] = values.keyword;
      }
      if (values.status !== null && values.status !== 'null') {
        params['status'] = Number.parseInt(values.status);
      }
      const data = await request(params);
      data.current = data.pageNumber;
      return data;
    } catch (e) {

    } finally {
      const difference = new Date().getTime() - time;
      setTimeout(() => {
        dispatch(endLoading());
      }, difference < 500 ? 500 : 1);
      await waitTime(difference < 500 ? 500 : 1);
    }

  }
}
