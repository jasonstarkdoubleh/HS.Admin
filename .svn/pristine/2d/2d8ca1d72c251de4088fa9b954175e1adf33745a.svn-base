import request from '@/utils/request'

/* 
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return request({
        url: '/api-u/module/saveModule',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return request({
        url: '/api-u/module/del',
        method: 'delete',
        data
    })
}
// 查找所有导航菜单树
export const findNavTree = () => {
    return request({
        url: '/api-u/module/query/modules',
        method: 'get'
        
    })
}
// 查找当前用户导航菜单树
export const findMenuTree = () => {
    return request({
        url: '/api-u/module/findMenuTree',
        method: 'get'
    })
}