import request from "../util/request";


export async function getAccountList(params) {
  return request({
    url: '/account/list',
    method: 'get',
    params
  })
}

export async function getAccountDetail(id) {
  return request({
    url: `/account/info/${id}`,
    method: 'get'
  })
}

export async function addAccount(data) {
  return request({
    url: `/account/`,
    method: 'post',
    data
  })
}

export async function updateAccount(data) {
  return request({
    url: `/account/`,
    method: 'put',
    data
  })
}

export async function login(data) {
  return request({
    url: `/account/login`,
    method: 'post',
    data
  })
}

export async function getLoginUser() {
  return request({
    url: `/account/my`,
    method: 'get'
  })
}

export async function getUserRolePage(id, page) {
  return request({
    url: `/account/role/user/${id}`,
    method: 'get',
    params: page
  })
}

export async function getRoleUserPage(id, page) {
  return request({
    url: `/account/role/role/${id}`,
    method: 'get',
    params: page
  })
}

export async function deleteUserRoleBatch(data) {
  return request({
    url: `/account/role/`,
    method: 'delete',
    data
  })
}

export async function deleteUserRole(userId, roleId) {
  return deleteUserRoleBatch({
    userId: userId,
    roleIds: [roleId]
  })
}



