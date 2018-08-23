import GwTheme from './theme'

GwTheme.install = function (Vue) {
  Vue.component(GwTheme.name, GwTheme)
}

export default GwTheme
