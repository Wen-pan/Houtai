import request from './request'

function getclassList(data) {
    return request({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}
function classDetail(data) {
    return request({
        url: '/admin/xy/clazz/detail',
        method: 'get',
        data
    })
}
// 新增班级
function saveclassDetail(data) {
    return request({
        url: '/admin/xy/clazz/save',
        method: 'post',
        data
    })
}
//更新班级
function updateclassDetail(data) {
    return request({
        url: '/admin/xy/clazz/update',
        method: 'post',
        data
    })
}
//删除
function delclassDetail(data) {
    return request({
        url: '/admin/xy/clazz/del',
        method: 'get',
        data
    })
}
export default {
    getclassList,
    classDetail,
    saveclassDetail,
    updateclassDetail,
    delclassDetail
}