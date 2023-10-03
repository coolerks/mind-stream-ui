import request from "../util/request";

export function getAllPermissions() {
  return request({
    url: '/permissions/list',
    method: 'get'
  })
}

export function getRolePermissionsIds(id) {
  return request({
    url: `/role/permissions/role/${id}`,
    method: 'get'
  })
}

export function addRolePermissions(data) {
  return request({
    url: `/role/permissions/`,
    method: 'post',
    data
  })
}

export function removeRolePermissions(data) {
  return request({
    url: `/role/permissions/`,
    method: 'delete',
    data
  })
}

