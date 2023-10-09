import request from "../util/request";


export async function getFilePage(params) {
  return request({
    url: '/file/page',
    method: 'get',
    params
  })
}

export async function getUploadConfig() {
  return request({
    url: '/file/config',
    method: 'get'
  })
}

export async function getFileUploadParam(data) {
  return request({
    url: '/file/upload/request',
    method: 'post',
    data
  })
}

export async function createFolder(data) {
  return request({
    url: '/file/folder',
    method: 'post',
    data
  })
}

export async function uploadComplete(id) {
  return request({
    url: `/file/upload/complete/${id}`,
    method: 'post'
  })
}
