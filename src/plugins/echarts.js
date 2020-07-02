// import something here
import echarts from 'echarts'

export default ({ app, router, Vue }) => {
  Vue.prototype.$echarts = echarts // 将echarts注册成Vue的全局属性
}
