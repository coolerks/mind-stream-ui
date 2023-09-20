import request from "../util/request";


export async function getAccountList(params) {
  return request({
      url: '/account/list',
      method: 'get',
      params
    }
  )
}

export async function getAccountDetail(id) {
  return request({
      url: `/account/info/${id}`,
      method: 'get'
    }
  )
}

