import request from '@/utils/request'

export function getAside() {
  return request({
    url: '/api-u/dataitem/queryItems',
    method: 'get'
  })
}
export function showform(itemcode) { 
  return request({
    url: '/api-u/dataitemdetail/getDetails',
    method: 'get',
    params: { itemcode }
  })
}
export function addform(data) {
  return request({
    url: '/api-u/dataitem/save',
    method: 'post',
    data
  })
}
export function deleteform(data) {
  return request({
    url: '/api-u/dataitem/delete/' + data,
    method: 'delete'
  })
}
export function getData(id) {
  return request({
    url: '/api-u/dataitem/item/' + id,
    method: 'get'
  })
}
export function updateform(data) {
  return request({
    url: '/api-u/dataitem/updateItem',
    method: 'put',
    data
  })
}
export function deleteformdetail(data) {
  return request({
    url: '/api-u/dataitemdetail/delete/' + data,
    method: 'delete'
  })
}
export function searchform(data) {
  return request({
    url: '/api-u/dataitemdetail/finddetails?' + data[0] + '=' + data[1] + '&' + data[2] + '=' + data[3],
    method: 'get',
  })
}
export function getOrgAll() {
  return request({
    url: '/api-u/organize/query/organizes',
    method: 'get'
  })
}
export function saveOrganize(data) {
  return request({
    url: '/api-u/organize/saveOrganize',
    method: 'post',
    data
  })
}
export function updateOrganize(data) {
  return request({
    url: '/api-u/organize/update',
    method: 'put',
    data
  })
}
export function getUserInfos() {
  return request({
    url: '/api-u/user/query/getUserInfos',
    method: 'get',
  })
}
export function saveItemDetial(data) {
  return request({
    url: '/api-u/dataitemdetail/saveItemDetial',
    method: 'post',
   // headers: {'Content-Type':'application/json;charset=utf-8'},
    data
  })
}
export function updateItemDetial(data) {
  return request({
    url: '/api-u/dataitemdetail/updateItemDetial',
    method: 'put',
    data
  })
}
export function deleteItemDetial(data) {
  return request({
    url: '/api-u/dataitemdetail/delete/' + data,
    method: 'delete',
  })
}
export function delItemDetial(data) {
  return request({
    url: '/api-u/organize/del/' + data,
    method: 'delete',
  })
}
export function getOrganize(data) {
  return request({
    url: '/api-u/department/query/getDepartmentsByOrganize?organizeid='+ data,
    method: 'get',
  })
}
export function getRoleByOrganize(data) {
  return request({
    url: '/api-u/role/getRoleByOrganize/'+data,
    method: 'get',
  })
}
export function getPostByOrganize(data) {
  return request({
    url: '/api-u/role/getPostByOrganize/'+data,
    method: 'get',
  })
}
export function getJobByOrganize(data) {
  return request({
    url: '/api-u/role/getJobByOrganize/'+data,
    method: 'get',
  })
}
export function saveUserInfo(data) {
  return request({
    url: '/api-u/user/saveUserInfo',
    method: 'post',
    data
  })
}
export function updateUserInfo(data) {
  return request({
    url: '/api-u/user/updateUserInfo',
    method: 'put',
    data
  })
}
export function delUserInfo(data) {
  return request({
    url: '/api-u/user/del/'+data,
    method: 'delete',
  })
}
export function resetPassword(data) {
  return request({
    url: '/api-u/user/resetPassword',
    method: 'post',
    data
  })
}
export function getUerPage(data) {
  return request({
    url: '/api-u/user/page/getUerPage?'+data,
    method: 'get',
  })
}
export function findOrganizes(data) {
  return request({
    url: '/api-u/organize/query/findOrganizes?'+data[0]+'='+data[1],
    method: 'get'
  })
}
export function getAllUserByKey(data) {
  return request({
    url: '/api-u/user/query/getAllUserByKey?'+data[0]+'='+data[1],
    method: 'get'
  })
}

export function getAllUserByKeyArea(data) {
  return request({
    url: '/api-u/user/getUerArea?areaname='+data,
    method: 'get'
  })
}
