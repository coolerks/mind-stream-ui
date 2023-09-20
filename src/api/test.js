import request from "../util/request";

export function getApi() {
  return request({
    url: 'https://up.api.daidr.me/apis/hitokoto.json',
    method: 'get'
  })
}
