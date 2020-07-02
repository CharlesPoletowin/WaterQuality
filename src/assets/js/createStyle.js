const createStyle = {
  line: (param1, param2) => {
    return {
      'name': param1,
      'type': 'line',
      'symbol': 'circle',
      'symbolSize': 1, // 空心标记的大小
      'smooth': true, // 是否平滑曲线显示
      'smoothMonotone': 'x', // 指明是在 x 轴或者 y 轴上保持单调性
      'lineStyle': { // 线条样式
        'normal': {
          'width': 1,
          'color': param2,
          'opacity': 1
        }
      },
      'itemStyle': { // 折线拐点标志的样式。
        'normal': {
          'color': param2,
          'borderColor': param2,
          'borderWidth': 0
        }
      },
      'areaStyle': {
        'normal': {
          'color': {
            'type': 'linear',
            'x': 0,
            'y': 0,
            'x2': 0,
            'y2': 1,
            'colorStops': [{
              'offset': 0,
              'color': param2
            }, {
              'offset': 0.5,
              'color': 'rgba(0, 0, 0, 0)'
            }],
            'shadowColor': 'rgba(0, 0, 0, 0.1)',
            'globalCoord': false
          }
        }
      }
    }
  },
  radar: (param1, param2) => {
    return {
      'name': param1,
      'type': 'radar',
      'symbol': 'circle',
      'symbolSize': 6,
      'label': {
        'show': false
      },
      'areaStyle': {
        'normal': {
          'color': 'rgba(245, 166, 35, 0.1)'
        }
      },
      'itemStyle': {
        'color': param2,
        'borderColor': 'rgba(245, 166, 35, 0.3)'
        // borderWidth: 10,
      },
      'lineStyle': {
        'normal': {
          'type': 'dashed',
          'color': param2,
          'width': 1
        }
      }
    }
  }
}
export default createStyle
