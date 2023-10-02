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

export async function getUserRoleIds(userId) {
  return request({
      url: `/account/role/list/${userId}`,
      method: 'get'
    }
  )
}


export async function getAllRoles() {
  return request({
      url: `/role/list/all`,
      method: 'get'
    }
  )
}


export async function addUserRoles(data) {
  return request({
    url: `/account/role/`,
    method: 'post',
    data
  })
}
