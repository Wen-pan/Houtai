import request from './request'

 function getstndentList(data) {
  return request({
    url: '/admin/xy/student/list',
    method: 'get',
    data
  })
}
//更新
function updateStndent(data) {
  return request({
    url: '/admin/xy/student/update',
    method: 'post',
    data
  })
}
//保存
function saveStndent(data) {
  return request({
    url: '/admin/xy/student/save',
    method: 'post',
    data
  })
}
//查看编辑
function studentdetail(data){
  return request({
    url:'/admin/xy/student/detail',
    method:'get',
    data
  })
}
//删除
function delstudentdetail(data){
  return request({
    url:'/admin/xy/student/del',
    method:'get',
    data
  })
}
export default {
    getstndentList,
    updateStndent,
    saveStndent,
    studentdetail,
    delstudentdetail
}
//出了查询和删除是get类型，其他的都是post类型