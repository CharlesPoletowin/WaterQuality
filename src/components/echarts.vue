<template>
  <!-- content -->
  <div class="echarts">
    <div
      class="echartsReal"
      :id="randomID"
    ></div>
  </div>

</template>
<script>

import { isValidOption } from 'assets/js/util'
import loadingstyle from 'assets/js/LOADING_STYLE'
import { debounce } from 'quasar'

export default {
  name: 'echarts',
  props: {
    option: {
      type: Object
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      randomID: 'myEcharts' + Date.now() + Math.random(),
      icon: false
    }
  },
  mounted () {
    let $chartsDOM = document.getElementById(this.randomID)
    if (!$chartsDOM) return
    let myEcharts = this.$echarts.init($chartsDOM)
    window.addEventListener('resize', () => {
      myEcharts.resize()
    })
    this.myEcharts = myEcharts
    if (this.isLoading) {
      this.myEcharts.showLoading(loadingstyle)
    } else {
      this.checkAndSetOption()
    }
  },
  watch: { // 观察option的变化
    option: {
      handler (newVal, oldVal) {
        if (this.myEcharts) {
          if (newVal) {
            this.myEcharts.setOption(newVal, true)
          } else {
            this.myEcharts.setOption(oldVal, true)
          }
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    isLoading () {
      if (!(this.isLoading)) { this.checkAndSetOption() }
    }
  },
  methods: {
    checkAndSetOption () {
      let option = this.option
      // 配置等于父组件传过来的数据
      if (isValidOption(option)) {
        this.myEcharts.setOption(option)
        // 渲染出来
        this.myEcharts.hideLoading()
        // 隐藏加载动画

        // test click
        this.myEcharts.on('click', function () {
          return
          console.log(arguments)
          let data = arguments[0]
          if (data.seriesName != '序列异常') {

          } else if (data.seriesName == '序列异常') {
            alert('序列异常')
            let dataIndex = data.dataIndex
            let seriesIndex = data.seriesIndex
            let componentType = data.componentType
            let xAxis = data.data.xAxis
            let seriesName = data.seriesName
            let month = parseInt(xAxis.slice(5, 7), 10)

            let _option = option

            let deleted = _option['options'][month - 1]['series'][seriesIndex][componentType]['data'].splice(dataIndex, 1)
            console.log(deleted)
            _option['options'][month - 1]['series'][14][componentType]['data'].push(...deleted)
            _option.baseOption.timeline.currentIndex = month - 1 // 防止刷新后返回第一个月份

            // delete in chart2
          }
        }
        )
      } else {
        this.myEcharts.showLoading(loadingstyle)
        // 加载动画
      }
    }
  }
}

</script>

<style lang="stylus">
.echarts {
  width: 100%;
}

.echartsReal {
  height: 100%;
}
</style>
