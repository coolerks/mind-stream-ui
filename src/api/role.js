import request from "../util/request";


export async function getRoleList(params) {
  return request({
      url: '/role/list',
      method: 'get',
      params
    }
  )
}

export async function getRoleDetail(id) {
  return request({
      url: `/role/info/${id}`,
      method: 'get',
    }
  )
}

export async function addRole(data) {
  return request({
      url: `/role/`,
      method: 'post',
      data
    }
  )
}
export async function updateRole(data) {
  return request({
      url: `/role/`,
      method: 'put',
      data
    }
  )
}
