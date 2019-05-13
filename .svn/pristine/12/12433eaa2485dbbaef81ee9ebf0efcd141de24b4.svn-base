import store from '@/store'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
// var hasPermission = false;
export function hasPermission (perms) {
    let permissions = store.state.dir.permiss
    for (let i in permissions){
      if(permissions[i] == perms){
        return true
      }
    }
    return false
}
  
