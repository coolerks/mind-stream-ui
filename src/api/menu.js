import request from "../util/request";


export async function getMenus() {
  return request({
      url: '/menu/',
      method: 'get'
    }
  )
}

export async function getAllMenus() {
  return request({
      url: '/menu/all',
      method: 'get'
    }
  )
}

export async function getAddedMenuKeys(id) {
  return request({
      url: `/role/menus/role/${id}`,
      method: 'get'
    }
  )
}

export async function addRoleMenus(data) {
  return request({
      url: `/role/menus/`,
      method: 'post',
      data
    }
  )
}
export async function removeRoleMenus(data) {
  return request({
      url: `/role/menus/`,
      method: 'delete',
      data
    }
  )
}
