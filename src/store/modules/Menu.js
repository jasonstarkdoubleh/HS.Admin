import { findNavTree } from '@/api/moudules/menu'

export default {
    state: {
        navTree: [],  // 导航菜单树
    },
    getters: {
   
    },
    mutations: {
        setNavTree(state, navTree){  // 设置导航菜单树
            state.navTree = navTree;
        }
    },
    actions: {
        // 获取树形目录
        getNavTree({ commit, state }){
            return  new Promise((resolve, reject) => {
                findNavTree().then(res => {
                    console.log(res.data)
                    //const tree1 = treeUtils(res.data.data)
                    //console.log(tree1)
                    //commit("setNavTree", res.data.data)
                    
                    resolve(res.data.data)
                  }).catch(error => {
                      console.log(error)
                    reject(error)
                  })
            })
        },
       
      
    },
}