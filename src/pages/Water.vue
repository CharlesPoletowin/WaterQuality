<template>
  <q-page class="row q-pa-md q-pt-xl bg-sky">
    <p class="pagetit">徐汇区水质监控决策分析</p>
    <q-tabs class="tab">
      <q-route-tab
        to="/"
        exact
        slot="title"
        class="text-grey-4 bg-black"
      >单个站点</q-route-tab>

      <!--<q-route-tab to="/water" exact slot="title" class="text-grey-4 bg-black">站点对比</q-route-tab>-->
    </q-tabs>
    <!--      baidu map 系列 展示相关数据-->
    <div class="col-4 q-pr-sm relative-position">
      <div
        id="baidumap"
        class="fit"
      ></div>
      <div
        class="dash q-pa-md"
        v-if="recent"
      >
        <p class="text-warning zdata"> {{zdName}}</p>
        <p class="text-positive zdata">{{recent_data.time}}</p>
        <p
          v-for="index in 11"
          :key="index"
          class="zdata "
        > {{ recent.fields[index-1]}} :
          <span
            class="text-info"
            :class="!recent.status[index-1] ? 'text-green-13' : 'text-red-12'"
          >{{toFiexed(recent.value[index-1])}}</span>
        </p>
      </div>
    </div>
    <div class="col-8 q-pl-sm">
      <div class="row full-height">
        <div class="col-12 q-pb-xs half-height">
          <div class="fit cardbg">
<!--矩形图 异常显示那个Echarts-->
<!--            iEchart->i-echart -->
            <i-echart
              class="fit"
              :option="option"
              ref="timeline"
              :isLoading="eleshow"
            ></i-echart>

          </div>
        </div>
        <div class="col-4 q-pr-xs q-pt-xs half-height">
          <div class="fit cardbg">
<!--            站点异常类型统计变化-->
            <i-echart
              class="fit"
              :option="riveropt"
              ref="river"
              :isLoading="rivershow"
            ></i-echart>
          </div>
        </div>
        <div class="col-4 q-px-xs q-pt-xs half-height">
          <div class="fit cardbg">
            <!--站点各维度关联矩阵-->
            <i-echart
              class="fit"
              :option="heatopt"
              :isLoading="heatshow"
            ></i-echart>
          </div>
        </div>
        <div class="col-4 q-pl-xs q-pt-xs half-height">
          <div class="fit cardbg">
<!--          站点健康雷达图-->
            <i-echart
              class="fit"
              :option="radaropt"
              :isLoading="radarshow"
            ></i-echart>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
.pagetit {
  position: absolute;
  left: 50%;
  top: 15px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-50%);
}

.tab {
  position: absolute;
  top: 0px;
  left: 15px;
}

.zdata {
  color: #E0E0E0;
  font-size: 14px;
  line-height: 5px;
}

.cardbg {
  background: rgba(255, 255, 255, 0.1);
}

#baidumap {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.dash {
  position: absolute;
  width: 200px;
  height: 280px;
  background: rgba(0, 0, 0, 0.85);
  left: 0px;
  bottom: 20px;
  z-index: 2;
  border: 1px solid #4AB9CE;
}

.half-height {
  height: 50% !important;
}

.bg-sky {
  background: radial-gradient(1100px at 70% 50%, #192B39, #000000);
  height: 100%;
}
</style>

<script>
import iEchart from 'src/components/echarts'

require('echarts/extension/bmap/bmap')
import { debounce } from 'quasar'
import BPStyle from 'assets/js/BMAP_STYLE'
import tooltip from 'assets/js/TOOLTIP_STYLE'
import Points from 'assets/json/zhandian.json'
import createStyle from 'assets/js/createStyle.js'
import api from 'assets/js/api'
import http from 'assets/js/http'
import path from 'assets/js/path'
import path2 from 'assets/js/path2'
import path3 from 'assets/js/path3'
import { deepcopy } from 'assets/js/util.js'

const colorList = [
  '#eb7f49',
  '#eb9a49',
  '#ebb549',
  '#ebd049',
  '#ebeb49',
  '#d0eb49',
  '#b5eb49',
  '#9aeb49',
  '#49eb9a',
  '#49ebb5',
  '#49ebd0',
  '#49ebeb',
  '#49d0eb',
  '#49b5eb',
  '#499aeb',
  '#497feb',
  '#4964eb',
  '#4949eb',
  '#6449eb',
  '#7f49eb',
  '#9a49eb',
  '#b549eb',
  '#d049eb',
  '#eb49eb',
  '#eb49d0'
]
const errorcolors = ['#FF6757', '#FFCB57', '#5976D6']
const toLabelColors = ['#808080']
const xAxisStyle = {
  splitLine: {
    // 分割线
    show: true,
    lineStyle: {
      color: '#666',
      opacity: 0.1
    }
  },
  axisTick: {
    // 坐标轴刻度相关设置。
    show: false
  },
  axisLine: {
    // 坐标轴轴线相关设置
    show: false,
    lineStyle: {
      color: '#999', // x轴
      width: 1
    }
  }
}
let series = []
const elename = [
  'temperature',
  'pH',
  'EC',
  'ORP',
  'DO',
  'turbidity',
  'transparency',
  'COD',
  'P',
  'NH3N',
  'flux'
]
elename.forEach((ele, i) => {
  let style = createStyle.line(ele, colorList[i])
  series.push(style)
})

let errorType = ['设备异常', '统计异常', '序列异常']
let toLabelType = ['可标记']

// 雷达图
let indicatorName = []
elename.forEach(e => {
  indicatorName.push({ name: e, min: -0.5, max: 1 })
})

const errorStyle = [
  {
    name: errorType[0],
    type: 'line',
    itemStyle: {
      // 折线拐点标志的样式。
      normal: {
        color: errorcolors[0],
        borderWidth: 0
      }
    }
  },
  {
    name: errorType[1],
    type: 'line',
    itemStyle: {
      // 折线拐点标志的样式。
      normal: {
        color: errorcolors[1],
        borderWidth: 0
      }
    }
  },
  {
    name: errorType[2],
    type: 'line',
    itemStyle: {
      // 折线拐点标志的样式。
      normal: {
        color: errorcolors[2],
        borderWidth: 0
      }
    }
  }
]
const toLabelStyle = [{
  name: toLabelType[0],
  type: 'line',
  itemStyle: {
    normal: {
      color: toLabelColors[0],
      borderWidth: 0
    }
  }
}]
series = series.concat(errorStyle)
series = series.concat(toLabelStyle)
export default {
  name: 'WaterQuality',
  components: {
    iEchart,
    api
  },
  data () {
    return {
      eleshow: true,
      rivershow: true,
      heatshow: true,
      radarshow: true,
      months: '',
      recent: '',
      recent_data: [],
      elename,
      zdName: '华东理工站1',
      heatopt: {
        title: {
          text: '站点内各维度关联关系矩阵',
          top: 10,
          left: 10,
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 14
          }
        },
        tooltip: Object.assign({}, tooltip, {
          formatter: function (params, ticket, callback) {
            let val = params.value
            let i = val[0]
            let j = val[1]
            return elename[i] + '-' + elename[j] + ' 相关度 : ' + val[2]
          }
        }),
        animation: false,
        grid: {
          height: '65%',
          y: '22%',
          left: '20%',
          right: '8%'
        },
        xAxis: Object.assign(
          {},
          {
            type: 'category',
            data: elename,
            axisLabel: {
              rotate: '20',
              interval: 0,
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 10
              }
            },
            splitArea: {
              show: false
            }
          },
          xAxisStyle
        ),
        yAxis: {
          type: 'category',
          data: elename,
          axisLabel: {
            rotate: '20',
            interval: 0,
            textStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 10
            }
          },
          splitArea: {
            show: false
          }
        },
        visualMap: {
          min: -1,
          max: 1,
          show: true,
          top: '10%',
          right: '6%',
          itemWidth: 12,
          itemHeight: '45%',
          precision: 2,
          calculable: true,
          textStyle: {
            color: '#eee'
          },
          orient: 'horizontal',
          inRange: { color: ['#74D3E5', 'rgba(247,187,88,0)', '#BDA061'] }
        },
        series: [
          {
            name: '相关度',
            type: 'heatmap',
            data: null,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      radaropt: {
        title: {
          text: '站点健康度雷达图',
          top: 10,
          left: 10,
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 14
          }
        },
        tooltip: Object.assign({}, tooltip, {
          // 提示框组件
          show: true,
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
            lineStyle: {
              color: '#FFD77F'
            }
          }
        }),
        radar: {
          center: ['50%', '55%'],
          radius: '60%',
          startAngle: 90,
          splitNumber: 3,
          shape: 'circle',
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.1)'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'rgba(255,103,87, 0.2)',
                'rgba(255,203,87, 0.1)',
                'rgba(131,236,176, 0.2)'
              ].reverse()
            }
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: [
                'rgba(255,255,255, 0.1)',
                'rgba(131,236,176, 0)',
                'rgba(255,103,87, 0.8)'
              ]
            }
          },
          name: {
            show: true,
            color: 'rgba(255,255,255,0.7)',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 10
          },
          indicator: indicatorName
        },
        series: [
          {
            name: '健康度',
            type: 'radar',
            symbol: 'circle',
            symbolSize: 6,
            label: {
              show: false
            },
            areaStyle: {
              normal: {
                color: 'rgba(245, 166, 35, 0.1)'
              }
            },
            itemStyle: {
              color: 'rgba(245, 166, 35, 1)',
              borderColor: 'rgba(245, 166, 35, 0.3)'
              // borderWidth: 10,
            },
            lineStyle: {
              normal: {
                type: 'dashed',
                color: 'rgba(245, 166, 35, 1)',
                width: 1
              }
            },
            data: null
          }
        ]
      },
      riveropt: {
        // 河流图
        color: errorcolors,
        title: {
          text: '站点异常类型统计变化',
          top: 10,
          left: 10,
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 14
          }
        },
        tooltip: Object.assign({}, tooltip, {
          // 提示框组件
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#FFD77F',
              type: 'dashed'
            }
          }
        }),
        legend: {
          // 图例组件，颜色和名字
          width: 'auto',
          top: '12%',
          itemGap: 16,
          itemWidth: 20,
          itemHeight: 14,
          icon: 'circle',
          data: errorType,
          textStyle: {
            color: '#a8aab0', // 浅灰
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        singleAxis: Object.assign(
          {},
          {
            top: '25%',
            bottom: '12%',
            right: '6%',
            left: '12%',
            // type: 'time',
            type: 'category',
            data: this.months,
            axisPointer: {
              type: 'line',
              animation: true,
              label: {
                show: true,
                backgroundColor: '#000',
                shadowBlur: 0
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              rotate: '20',
              interval: 1,
              align: 'right',
              textStyle: {
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 10
              }
            }
          },
          xAxisStyle
        ),
        series: [
          {
            type: 'themeRiver',
            top: '15%',
            itemStyle: {
              opacity: 0.4,
              emphasis: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: null,
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      },
      option: {
        baseOption: {
          timeline: {
            show: true,
            type: 'slider',
            axisType: 'category',
            bottom: '3%',
            currentIndex: 0,
            autoPlay: false, // 是否自动播放
            playInterval: 4000,
            loop: true,
            realtime: true, // 拖动圆点的时候，是否实时更新视图。
            controlPosition: 'right',
            label: {
              normal: {
                color: '#4AB9CE',
                interval: 0,
                rotate: 20,
                padding: -5,
                align: 'right'
              }
            },
            itemStyle: {
              normal: {
                // color: '#fff',
                borderColor: '#4AB9CE',
                borderWidth: 1
              }
            },
            checkpointStyle: {
              // 『当前项』（checkpoint）的图形样式
              color: '#f6a436'
            },
            lineStyle: {
              show: true, // false 不显示轴线
              color: '#4AB9CE'
            },
            symbol: 'circle',
            controlStyle: {
              // 控制按钮的样式
              show: true,
              showPrevBtn: false,
              showNextBtn: false,
              itemGap: 20,
              itemSize: 20,
              normal: {
                color: '#4AB9CE',
                borderColor: '#4AB9CE'
              },
              emphasis: {
                show: false
              }
            },
            data: this.months
          },
          title: {
            text: '',
            top: 10,
            left: 10,
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 14
            }
          },
          tooltip: Object.assign({}, tooltip, {
            // 提示框组件
            show: true,
            position: function (point, params, dom, rect, size) {
              // 固定在顶部
              return [[point[0] - size.contentSize[0], point[0]][+(point[0] < size.viewSize[0] / 2)], '25%']
            },
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              lineStyle: {
                color: '#FFD77F'
              }
            }
          }),
          grid: {
            left: '4%',
            right: '5%',
            bottom: '18%',
            top: '20%',
            containLabel: true
          },
          legend: {
            // 图例组件，颜色和名字
            right: 50,
            top: '10%',
            itemGap: 16,
            itemWidth: 20,
            itemHeight: 14,
            data: elename,
            selectedMode: 'multiple',
            textStyle: {
              color: '#a8aab0', // 浅灰
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          xAxis: [
            Object.assign(
              {},
              {
                type: 'time',
                boundaryGap: true, // 坐标轴两边留白
                axisLabel: {
                  // 坐标轴刻度标签的相关设置。
                  interval: 5, // 设置为 1，表示『隔一个标签显示一个标签』
                  margin: 5,
                  textStyle: {
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 10
                  }
                }
              },
              xAxisStyle
            )
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber: 6,
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              },
              offset: 5,
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#ccc',
                  opacity: 0.15
                }
              }
            }
          ],
          series: series,
          animation: false
        },
        options: null
      }
    }
  },
  mounted () {
    this.drawLine()
    http(api.abnormal)
      .then(res => {
        this.Abnormal = res.data
        this.months = this.Abnormal[this.zdName].month
        this.chooseZhand(this.zdName)
        this.$refs.timeline.myEcharts.on('timelinechanged', e => {
          this.changeEle(e.currentIndex)
        })
      })
  },
  methods: {
    toFiexed (val) {
      return Number(val).toFixed(3)
    },
    changeEle (num) {
      let abinfo = this.Abnormal[this.zdName]
      console.log('异常站点')
      // console.log(abinfo);
      this.months = abinfo.month
      let month = this.months[num]
      console.log(num)
      console.log(this.months)
      console.log('%c this.ele: ' + month, 'background: red')
      // console.log(this.element);
      let element = this.element[month]
      this.heatopt.series[0].data = this.shapeHeatData(element.correlation)
      this.radaropt.series[0].data = [element['health']['value']]
      this.riveropt.series[0].data = this.shapeRiverData(abinfo)
      this.riveropt.singleAxis.data = this.months
      this.rivershow = false
      this.heatshow = false
      this.radarshow = false
      console.log('%c tooltip 变化：' + num, 'background: green')
      this.$refs.river.myEcharts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: num
      })
    },
    shapeHeatData (EleRelation) {
      let heatmap_value = []
      let heatmap_data = EleRelation.value
      heatmap_data.forEach((d, i) => {
        d.forEach((m, j) => {
          heatmap_value.push([j, i, m])
        })
      })
      return heatmap_value
    },
    shapeRiverData (AbData) {
      let river_value = []
      let river_data = AbData.value
      let label = AbData.yfields
      river_data.forEach((d, i) => {
        d.forEach((m, j) => {
          river_value.push([j, m, label[i]])
        })
      })
      return river_value
    },
    drawLine () {
      http(api.recent)
        .then(res => {
          console.log('==')
          this.recent_data = res.data
          console.log(res.data[this.zdName])
          this.recent = this.recent_data.data[this.zdName].data
          let baiduMap = this.$echarts.init(document.getElementById('baidumap'))
          // test
          path.forEach((p, i) => {
            let hStep = 300 / (path.length - 1)
            p.lineStyle = {
              normal: {
                color: this.$echarts.color.modifyHSL('#EBD049', Math.round(1 * (1 - this.recent_data.data[p.name].abdata) * 100))
                // color: this.$echarts.color.modifyHSL('#5A94DF', Math.round(hStep * i))
              }
            }
          })

          path3.forEach((p, i) => {
            p.lineStyle = {
              normal: {
                color: '#4AB9CE',
                opacity: 0.7,
                width: 5
              }
            }
          })

          this.bmapoption = {
            tooltip: {
              show: false
            },
            // 加载 bmap 组件
            bmap: {
              // 百度地图中心经纬度
              center: [121.44061699999999, 31.152043],
              // 百度地图缩放
              zoom: 14,
              // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
              maxZoom: 20,
              roam: false,
              // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
              mapStyle: {
                styleJson: BPStyle
              },
              enableMapClick: false,
              enableAutoResize: false
            },
            series: [
              {
                type: 'effectScatter',
                // 使用百度地图坐标系
                coordinateSystem: 'bmap',
                rippleEffect: {
                  period: 10,
                  scale: 5,
                  brushType: 'fill'
                },
                symbolSize: 10,
                zlevel: 2,
                // label: {
                //   show: false,
                //   position: "left",
                //   distance: 12,
                //   formatter: function(params, ticket, callback) {
                //     return params.name;
                //   },
                //   textStyle: {
                //     color: "#fff",
                //     fontSize: 12
                //   },
                //   borderColor: "#EBB549",
                //   borderWidth: 1,
                //   borderRadius: 3,
                //   padding: [12, 12, 12, 12],
                //   backgroundColor: "rgba(0,0,0,0.8)"
                // },
                showEffectOn: 'render',
                itemStyle: {
                  normal: {
                    color: '#EBB549'
                  }
                },
                data: null
              },
              {
                name: '监测站',
                type: 'scatter',
                coordinateSystem: 'bmap',
                symbolSize: 15,
                // symbol: 'pin',
                rippleEffect: {
                  brushType: 'stroke'
                },
                label: {
                  emphasis: {
                    show: true,
                    position: 'right',
                    distance: 12,
                    formatter: '{b}',
                    textStyle: {
                      color: '#eee',
                      fontSize: 12
                    }
                  }
                },
                showEffectOn: 'render',
                itemStyle: {
                  normal: {
                    color: (param) => {
                      // return `rgba(255,203,87,${1-recent_data[param.name].abdata*3})`
                      return this.$echarts.color.modifyHSL('#EBD049', Math.round(1 * (1 - this.recent_data.data[param.name].abdata) * 100))
                    }
                  }
                },
                data: Points
              }, {
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: path2.concat(path3),
                silent: true,
                lineStyle: {
                  normal: {
                    color: '#74D3E5',
                    opacity: 0.8,
                    width: 3
                  }
                },
                progressiveThreshold: 500,
                progressive: 200
              },
              {
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: path,
                lineStyle: {
                  normal: {
                    width: 0
                    // opacity:0.01
                  }
                },
                effect: {
                  constantSpeed: 20,
                  show: true,
                  trailLength: 0.3,
                  symbolSize: 4
                },
                zlevel: 1
              }
            ]
          }

          let timeId = null
          window.addEventListener('resize', () => {
            timeId = setTimeout(() => {
              this.baiduMap.resize()
              var center = this.bmap.getCenter()
              this.bmap.checkResize()
              this.bmap.setCenter(center)
            }, 100)
          })
          if (timeId) clearTimeout(timeId)

          baiduMap.setOption(this.bmapoption)
          baiduMap.on('click', params => {
            let seriesName = params.seriesName
            this.zdName = params.name
            console.log('点击' + this.zdName)
            if (seriesName == '监测站') {
              this.chooseZhand(this.zdName)
            }
          })
          this.baiduMap = baiduMap
          let bmap = baiduMap
            .getModel()
            .getComponent('bmap')
            .getBMap()
          bmap.enableScrollWheelZoom()
          bmap.enableAutoResize() // 地图自适应容器宽高变化
          this.bmap = bmap
        })
    },
    chooseZhand (pram) {
      if (this.recent) {
        this.recent = this.recent_data.data[this.zdName].data
      }
      http(api.elements, { zName: pram })
        .then(res => {
          this.element = res.data
          console.log('更改站点')
          // console.log(this.element);
          // 描绘地图地址
          let addr = Points.filter(e => {
            return e.name == pram
          })
          this.bmapoption.series[0].data = addr
          this.baiduMap.setOption(this.bmapoption)

          this.option.baseOption.title.text = pram

          let options = []
          let timeline = []

          Object.entries(this.element).forEach(arr => { // 循环 所以有很多条
            let obj = {}
            obj.series = []
            let data = arr[1]

            // 装载时间轴
            let time = arr[0]
            timeline.push(time)

            // 装载时间序列数据
            let timestamp = data.timestamp
            let elemdata = data.data

            Object.keys(elemdata).forEach(el => { // keys e.g:'ph'
              let eleuint = []
              let parr = []
              elemdata[el].forEach((d, i) => {
                let arr = []
                arr[0] = timestamp[i]
                arr[1] = d
                eleuint.push(arr)
              })
              let eleobj = {}
              eleobj.data = eleuint
              let pob = {}
              pob.data = parr
              eleobj.markPoint = pob
              obj.series.push(eleobj)
            })

            // 描绘错误域
            let errorarea = data.errorarea
            let erarr = []
            // start 防止错误域和可标记域重复
            let errorAxis = []
            // end
            if (errorarea) {
              Object.entries(errorarea).forEach((el, i) => {
                let eobj = { markArea: { data: [] } }
                let ty = []

                erarr.push(el[0])
                let data = el[1]

                data.forEach(arr => {
                  let axis = []
                  axis[0] = {
                    name: arr[2]
                      ? errorType[i] + ' ( ' + arr[2] + ' )'
                      : errorType[i],
                    xAxis: arr[0]
                  }
                  axis[1] = {
                    xAxis: arr[1]
                  }
                  errorAxis.push([arr[0], arr[1]])

                  ty.push(axis)
                })

                eobj.markArea.data = ty
                eobj.markArea.label = {
                  show: false,
                  fontSize: 10
                }
                obj.series.push(eobj)
              })
            }

            errorType.forEach(s => {
              if (!erarr.includes(s)) {
                obj.series.push({ markArea: { data: [] } })
              }
            })
            /*
            // add toLabelField
            console.log(errorAxis)
            const toCopy = obj.series[0].data
            let toLabelField = { markArea: { data: [] } }
            for (let i in toCopy) {
              if (i == toCopy.length - 1) { break }
              let toPush = [{ name: '可标记', xAxis: '' }, { xAxis: '' }]

              let next = parseInt(i, 10) + 1

              toPush[0].xAxis = toCopy[i][0]
              toPush[1].xAxis = toCopy[next][0]
              toPush[0].name = `可标记${toPush[0].xAxis}-${toPush[1].xAxis}`

              let flag = 0
              for (let [startTime, endTime] of errorAxis) {
                if (toPush[0].xAxis >= startTime && toPush[1].xAxis <= endTime) { flag = 1; break }
              }
              if (flag) { continue }

              toLabelField.markArea.data.push(toPush)
            }
            toLabelField.markArea.label = {
              show: false,
              fontSize: 10
            }
            obj.series.push(toLabelField)
            // end add
            */
            options.push(obj)
          })

          // 装载options

          console.log('装载timeline')
          console.log('----options-----')

          console.log('----options-----')
          this.option.baseOption.timeline.data = timeline
          this.option.options = options
          this.eleshow = false
          this.changeEle(0)
        })
    }
  }
}
</script>
