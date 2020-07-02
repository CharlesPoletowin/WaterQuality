import loadingstyle from 'assets/js/LOADING_STYLE'

// 深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 检测数据是否为空
export const isEmptyObject = function (obj) {
  for (var key in obj) {
    return false
  }
  return true
}

export const Loading = function (params) {
  return params.showLoading(loadingstyle)
}

// 计算最大最小
export const minMaxComputed = function (Opt, gap) {
  gap = gap || 1
  let max = -Infinity
  let min = Infinity
  Opt.forEach((itemOpt) => {
    if (itemOpt > max) {
      max = itemOpt
    }
    if (itemOpt < min) {
      min = itemOpt
    }
  })
  max = Math.ceil(max / gap) * gap
  min = Math.floor(min / gap - 2) * gap
  console.log('min: ' + min)
  console.log('max: ' + max)
  return {
    min,
    max
  }
}

// 节流函数
export const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

export const isValidOption = function (option) {
  function isObject (option) {
    return Object.prototype.isPrototypeOf(option)
  }
  // 1. 是否为对象；
  function isEmptyObject (option) {
    return Object.keys(option).length === 0
  }
  // 2. 是否为空对象；
  // function hasSeriesKey (option) {
  //   return !!option['series']
  // }
  // 3. 是否包含 series 键；
  function isSeriesArray (option) {
    return Array.isArray(option['series'])
  }
  // 4. series 是否为数组；
  function isSeriesEmpty (option) {
    if (isSeriesArray(option) && isSeriesArray(option)) {
      return option['series'].length === 0
    }
  }
  return isObject(option) && !isEmptyObject(option) && !isSeriesEmpty(option)
}

// 数据为空提示
export const addNodata = function (option) {
  let newoption = Object.assign({}, option, {
    title: {
      text: '数据为空',
      left: 'center',
      fontWeight: 'lighter',
      textStyle: {
        color: '#353446'
      }
    }
  })
  return newoption
}

// 按千用逗号
export const toThousands = function (num) {
  var result = '', counter = 0
  num = (num || 0).toString()
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i !== 0) { result = ',' + result }
  }
  return result
}
