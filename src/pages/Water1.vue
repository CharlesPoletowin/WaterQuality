<template>
  <q-page class="row q-pa-md q-pt-xl bg-sky">
    <p class="pagetit">徐汇区水质监控决策分析</p>
    <q-tabs class="tab">
      <q-route-tab to="/" exact slot="title" class="text-grey-4 bg-black">单个站点</q-route-tab>
      <q-route-tab to="/water" exact slot="title" class="text-grey-4  bg-black">站点对比</q-route-tab>
    </q-tabs>
    <div class="col-4 q-pr-sm relative-position">
      <div id="baidumap" class="fit"></div>
    </div>
    <div class="col-8 q-pl-sm">
      <div class="row full-height">
        <div class="col-12 q-pb-xs half-height">
          <div class="fit cardbg relative-position">
            <q-btn-dropdown color="primary" class="chosele text-positive" :label="chosenele">
              <q-list dense link highlight>
                <q-item v-for="(value,index) in elename" dark :key="value">
                  <q-radio v-model="chosenele" dark class="radiotext" :val="value" :label="value" @input="choosele" />
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div class="absolute-left q-pa-sm chipzhand" v-if="pointInPlolygon.length">
              <q-chip :style="{color:getColor(PName,indexOf(PName,value.name)),background:'rgba(255,255,255,0.1)'}" v-for="(value,index) in pointInPlolygon" :key="index">{{value.name}}</q-chip>
            </div>
            <i-echart class="fit" :option="option" ref="timeline"></i-echart>
          </div>
        </div>
        <div class="col-8 q-pr-xs q-pt-xs half-height">
          <div class="fit cardbg">
            <i-echart class="fit" :option="riveropt" ref="river"></i-echart>
          </div>
        </div>

        <div class="col-4 q-pl-xs q-pt-xs half-height">
          <div class="fit cardbg">
            <i-echart class="fit" :option="radaropt"></i-echart>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
@import '~variables'
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
.chosele{
  position: absolute;
  top: 0px;
  right: 0px;
  z-index:2
}

.cardbg {
  background: rgba(255, 255, 255, 0.1)!important;
}
.chipzhand{
  color: $grey-4;
  width: 100%;
  padding-right:150px
}
#baidumap {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.half-height {
  height: 50% !important;
}
.radiotext {
  font-size: 14px!important;
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
import path2 from 'assets/js/path2'
import path3 from 'assets/js/path3'
import { deepcopy } from 'assets/js/util.js'

const PName = Points.map(e => e.name)

const errorcolors = ['#FF6757', '#FFCB57', '#5976D6']
let errorType = ['设备异常', '统计异常', '序列异常']
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

// 雷达图
let indicatorName = []
elename.forEach(e => {
  indicatorName.push({ name: e, min: -0.5, max: 1 })
})

export default {
  name: 'WaterQuality',
  components: {
    iEchart,
    api
  },
  data () {
    return {
      months: '',
      chosenele: 'temperature',
      elename,
      PName,
      pointInPlolygon: [],
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
            right: '3%',
            left: '6%',
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
              interval: 0,
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
        dataZoom: [{
          show: true,
          height: 25,
          bottom: 20,
          right: 120,
          left: 85,
          start: 40,
          end: 100,
          borderColor: '#6a7985',
          dataBackground: {
            lineStyle: {
              color: '#5daec1'
            },
            areaStyle: {
              color: '#5daec1'
            }
          },
          handleStyle: {
          },
          fillerColor: 'rgba(246,164,54,0.2)',
          textStyle: {
            color: 'rgba(255,255,255,0.8)'
          }
        }, {
          type: 'inside'
          // show: true,
          // height: 10,
          // start: 1,
          // end: 35
        }],
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
          show: false,
          data: this.elename,
          selected: {
            COD: false,
            DO: false,
            EC: false,
            NH3N: false,
            ORP: false,
            P: false,
            flux: false,
            pH: false,
            temperature: true,
            transparency: false,
            turbidity: false
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
        series: null,
        animation: false
      }
    }
  },
  mounted () {
    this.drawLine()
    // this.chooseZhand(["永川路"])
  },
  methods: {
    indexOf (arr, item) {
      if (Array.prototype.indexOf) {
        return arr.indexOf(item)
      } else {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === item) { return i } else return -1
        }
      }
    },
    getColor (arr, i) {
      let hStep = 300 / (arr.length - 1)
      return this.$echarts.color.modifyHSL('#EB7F49', Math.round(7 * i))
    },
    setAbnormal (group) {
      http(api.abnormal, { group: group })
        .then(res => {
          res = res.data
          console.log(res)
          this.riveropt.series[0].data = this.shapeRiverData(res)
          this.riveropt.singleAxis.data = res.month
        })
    },
    setHealth (group) {
      http(api.health, { group: group })
        .then(res => {
          res = res.data
          // console.log(res)
          let series = []
          res.forEach(e => {
            console.log(e.name)
            let obj = createStyle.radar(e.name, this.getColor(PName, this.indexOf(PName, e.name)))
            obj.data = [e.value]
            series.push(obj)
          })
          // console.log(series)
          this.radaropt.series = series
        })
    },
    choosele () {
      console.log('====' + this.chosenele)
      let selected = {}
      this.elename.forEach(e => {
        selected[e] = this.chosenele == e
      })
      this.option.legend.selected = selected
      console.log(selected)
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
      let baiduMap = this.$echarts.init(document.getElementById('baidumap'))

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
          enableMapClick: false
        },
        series: [
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
              color: (param) => {
                return this.getColor(PName, this.indexOf(PName, param.name))
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
                opacity: 0.6,
                width: 3
              }
            },
            progressiveThreshold: 500,
            progressive: 200
            // zlevel: 2
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
      this.baiduMap = baiduMap
      let bmap = baiduMap
        .getModel()
        .getComponent('bmap')
        .getBMap()
      bmap.enableScrollWheelZoom()
      bmap.enableAutoResize() // 地图自适应容器宽高变化
      this.bmap = bmap

      let styleOptions = {
        strokeColor: 'red', // 边线颜色。
        fillColor: 'red', // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.1, // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' // 边线的样式，solid或dashed。
      }
      // 实例化鼠标绘制工具
      this.drawingManager = new BMapLib.DrawingManager(bmap, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMap.Size(5, 5), // 偏离值
          scale: 0.5, // 工具栏缩放比例
          drawingModes: [
            // 工具栏上可以选择出现的绘制模式
            // BMAP_DRAWING_MARKER,
            BMAP_DRAWING_POLYGON
            // BMAP_DRAWING_CIRCLE
          ]
        },
        circleOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions // 多边形的样式
      })
      let overlays = []
      let overlaycomplete = (e) => {
        for (var i = 0; i < overlays.length; i++) {
          bmap.removeOverlay(overlays[i])
        }
        overlays = []
        let overlay = e.overlay
        overlays.push(overlay)
        switch (e.drawingMode) {
          case 'polygon':
            this.pointInPlolygon = Points.filter(p =>
              BMapLib.GeoUtils.isPointInPolygon(
                new BMap.Point(p.value[0], p.value[1]),
                overlay
              )
            )
            let group = this.pointInPlolygon.map(e => e.name)
            this.setAll(group)
            break
        }
      }
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      this.drawingManager.addEventListener('overlaycomplete', overlaycomplete)
    },
    setAll (group) {
      this.chooseZhand(group)
      this.setAbnormal(group)
      this.setHealth(group)
    },
    chooseZhand (group) {
      http(api.elements, { group: group })
        .then(res => {
          res = res.data
          let series = []

          // 站点obj
          Object.entries(res).forEach(arr => {
            let name = arr[0]
            let data = arr[1]
            // 装载时间序列数据
            let timestamp = data.timestamp
            let elemdata = data.data
            // ele
            Object.keys(elemdata).forEach((el, j) => {
              let eleuint = []
              elemdata[el].forEach((d, i) => {
                let arr = []
                arr[0] = timestamp[i]
                arr[1] = d
                eleuint.push(arr)
              })
              let styleunit = createStyle.line(el, this.getColor(PName, this.indexOf(PName, name)))
              styleunit.data = eleuint
              eleuint.id = name + el
              series.push(styleunit)
            })
          })
          this.option.series = series
        })
    }
  }
}
</script>
