
export function sonsTree(obj, arr) {
  var children = new Array();
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].parentid == obj.id) {  //pid等于加入数组
          sonsTree(arr[i], arr);//递归出子元素
          arr[i].pname=obj.fullname;
          children.push(arr[i]);
      }
  }
  if (children.length > 0) {
      obj.children = children;
  }
  return obj;
}


export function treeUtils(arr) {
  let ptree = [];
  let tree = [];
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].parentid == '0') {//获取父元素
          let o = sonsTree(arr[i], arr);
          ptree.push(o);
      }
  }
  console.log(ptree);
  return ptree;
}