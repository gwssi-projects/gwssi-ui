import GwGrid from './grid'

//返回数据总数的节点
export const contentTotal = 'contentTotal'

GwGrid.install = function (Vue) {
  Vue.component(GwGrid.name, GwGrid)
}

export default GwGrid