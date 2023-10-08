import request from "../util/request";


export async function getFilePage(params) {
  return request({
    url: '/file/page',
    method: 'get',
    params
  })
}
