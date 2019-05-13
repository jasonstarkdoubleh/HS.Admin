import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'x-requested-with': 'XMLHttpRequest'
    },
    url: '/api-a/sys/login?username=' + data.username + '&password=' + data.password,
    method: 'post'
  })
}

export function logout(data) {
  return request({
    url: '/api-a/sys/logout',
    method: 'get',
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api-u/users/current',
    method: 'get',
    params: { token }
  })
}

export function getMenu() {
  return request({
    url: '/api-b/menus/me',
    method: 'get'
  })
}

