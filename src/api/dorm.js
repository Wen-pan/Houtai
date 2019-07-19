import request from './request'
//宿舍列表
 function getDormList(data) {
  return request({
    url: '/admin/xy/dorm/list',
    method: 'get',
    data
  })
}
//宿舍明细
function dormListdetail(data) {
  return request({
    url: '/admin/xy/dorm/detail',
    method: 'post',
    data
  })
}
//新增宿舍
function savedorm(data) {
  return request({
    url: '/admin/xy/dorm/save',
    method: 'post',
    data
  })
}
//更新宿舍
function updatedorm(data) {
  return request({
    url: '/admin/xy/dorm/update',
    method: 'post',
    data
  })
}
//删除宿舍
function deldorm(data) {
  return request({
    url: '/admin/xy/dorm/del',
    method: 'post',
    data
  })
}
export default {
    getDormList,
    dormListdetail,
    savedorm,
    updatedorm,
    deldorm
}