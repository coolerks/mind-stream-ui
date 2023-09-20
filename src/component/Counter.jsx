import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {decrement, increment, incrementByAmount} from '../store/features/counter/counterSlice'
import {updateUser} from "../store/user/userSlice";

export function Counter() {
  const count = useSelector(state => {
    console.log(state);
    return state.count.value
  })
  const user = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount({
          a: 100
        }))}>
          ++
        </button>
      </div>
      <div>
        <span>{JSON.stringify(user)}</span>
        <button onClick={() => dispatch(updateUser({
          username: 'aaaaa'
        }))}>更新用户</button>
      </div>
    </div>
  )
}
