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

export async function addAccount(data) {
  return request({
      url: `/account/`,
      method: 'post',
      data
    }
  )
}

export async function updateAccount(data) {
  return request({
      url: `/account/`,
      method: 'put',
      data
    }
  )
}
