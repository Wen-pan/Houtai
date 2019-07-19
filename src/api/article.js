import request from './request'
//素材列表
 function getUploadList(data) {
  return request({
    url: '/admin/xy/upload/list',
    method: 'get',
    data
  })
}
//更新标题
function postUpdateTitle(data) {
  return request({
    url: '/admin/xy/upload/updateTitle',
    method: 'post',
    data
  })
}
//删除
function delUpdateList(data) {
  return request({
    url: '/admin/xy/upload/del',
    method: 'get',
    data
  })
}
export default {
    getUploadList,
    postUpdateTitle,
    delUpdateList
}