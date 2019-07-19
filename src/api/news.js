import request from './request'
//新闻列表
 function getNewsList(data) {
  return request({
    url: '/admin/xy/news/list',
    method: 'get',
    data
  })
}
//新增新闻
function addNewsList(data) {
  return request({
    url: '/admin/xy/news/save',
    method: 'post',
    data
  })
}
//新闻详情
function getNewsdetail(data) {
  return request({
    url: '/admin/xy/news/detail',
    method: 'get',
    data
  })
}
//修改新闻
function UpdateNews(data) {
  return request({
    url: '/admin/xy/news/update',
    method: 'post',
    data
  })
}
//新增新闻
function SaveNews(data) {
  return request({
    url: '/admin/xy/news/save',
    method: 'post',
    data
  })
}
//删除
function DelNewsList(data) {
  return request({
    url: '/admin/xy/news/del',
    method: 'get',
    data
  })
}
export default {
    getNewsList,
    addNewsList,
    getNewsdetail,
    UpdateNews,
    SaveNews,
    DelNewsList
}