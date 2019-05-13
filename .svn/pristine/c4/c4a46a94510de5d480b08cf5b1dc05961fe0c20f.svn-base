import Cookies from 'js-cookie'

const aTokenKey = 'Access_Token'
const rTokenKey = 'Refresh_Token'

export function getAccessToken() {
  return Cookies.get(aTokenKey)
}
export function getRefreshToken() {
  return Cookies.get(rTokenKey)
}

export function setAccessToken(aToken) {
  return Cookies.set(aTokenKey, aToken)
}

export function setRefreshToken(rToken) {
  return Cookies.set(rTokenKey, rToken)
}

export function removeToken() {
  Cookies.remove(rTokenKey)
  return Cookies.remove(aTokenKey)
}
