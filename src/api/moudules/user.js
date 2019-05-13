import request from '@/utils/request'

export function getClients() {
  return request({
    url: '/api-o/clients',
    method: 'get'
  })
}

// 添加客户端
export function addClients() {
  return request({
    url: '/api-o/clients',
    method: 'get'
  })
}
// 修改客户端
export function editClients(id, secret) {
  return request({
    url: '/api-o/clients/' + id + '?secret=' + secret,
    method: 'put'
  })
}
// 删除客户端
export function delClients(id) {
  return request({
    url: '/api-o/clients/' + id,
    method: 'delete'
  })
}
