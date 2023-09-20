import request from "../util/request";


export async function getMenus() {
  return request({
      url: '/menu/',
      method: 'get'
    }
  )
}
