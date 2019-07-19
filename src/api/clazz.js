import request from './request'

 function getclassList(data) {
  return request({
    url: '/admin/xy/clazz/list',
    method: 'get',
    data
  })
}
export default {
    getclassList
}
