<template>
  <q-page class="flex flex-center">
    <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">-->
  </q-page>
</template>

<style>

</style>

<script>
import elements from 'assets/json/elements.json'
let test = elements['华东理工站1']['2018-01']
import abnormal from 'assets/json/abnormal.json'
export default {
  name: 'PageIndex',
  data () {
    return {

    }
  },
  mounted () {
    // this.obj = {}
    // this.getAllJson(test, "",",")
    // console.log(this.findJson(test,['data','flux'],0,1))
    let group = ['华东理工站1', '文定路桥站']
    console.log('===')
    let container = {
      month: ['2018-07',
        '2018-08',
        '2018-09',
        '2018-10',
        '2018-11',
        '2018-12'],
      yfields: [
        '设备异常',
        '统计异常',
        '序列异常'
      ],
      'value': [[], [], []]
    }
    let months = container.month

    for (let i = 0; i < group.length; i++) {
      console.log(group[i])
      let temp = abnormal[group[i]]
      months.forEach((m, i) => {
        for (let j = 0; j < 3; j++) {
          container.value[j][i] = container.value[j][i] ? container.value[j][i] : 0 + temp.value[j][this.indexOf(temp.month, m)]
        }
      })
    }
    console.log(container)

    // let container = {}
    // group.forEach(name => {
    //   console.log(name)
    //   let element = elements[name]
    //   container[name] = {}
    //   Object.keys(element).forEach(time => {
    //     let data = {
    //       data: element[time].data,
    //       // timestamp: element[time].timestamp
    //     }
    //     container[name] =this.summarizeJson(container[name],data)
    //   })
    // })
    // console.log(container)
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
    getAllJson (jsons, name, sign) {
      for (let key in jsons) {
        let temp = name ? (name + sign + key) : key
        if ((jsons[key] instanceof Object) && (!Array.isArray(jsons[key]))) {
          // this.obj[key] = {}
          this.getAllJson(jsons[key], temp, sign)
        } else {
          // console.log(jsons[key]);
          let keys = temp.split(',')
          // console.log(keys)
          let temp1 = jsons[key]
          for (let i = keys.length; i > 0; i--) {
            // console.log(i-1)
            // console.log(keys[i-1])
            let temp = {}
            temp[keys[i - 1]] = temp1
            temp1 = temp
          }
          console.log(temp1)
          // this.obj[key] = jsons[key]
        }
      }
    },
    findJson (jsons, arr, i, n) {
      if (i < n) {
        console.log('%c i<n ', 'background:red')
        return this.findJson(jsons[arr[i]], arr, ++i, n)
      } else if (i == n) {
        console.log('%c i=n ', 'background:green')
        return jsons[arr[i]]
      }
    },
    generizeJson (target, source) {
      if (typeof source !== 'object' && typeof target !== 'object' && source !== null) return
      for (let key in source) {
        if (typeof source[key] === 'object') {
          if (typeof target[key] === 'undefined') {
            target[key] = Array.isArray(source[key]) ? [] : {}
          }
          target[key] = this.generizeJson(target[key], source[key])
        } else {
          if (Array.isArray(source)) {
            target = Array.isArray(target) ? target : Array.of(target)
            let tkey = target.length
            target[tkey] = source[key]
          } else {
            target[key] = (target[key] ? [target[key]] : []).concat([source[key]])
          }
        }
      }
      return target
    },
    shapeJson (target, source, callback) {
      if (typeof source !== 'object' && typeof target !== 'object' && source !== null) return
      for (let key in source) {
        if (typeof source[key] === 'object') {
          if (typeof target[key] === 'undefined') {
            target[key] = Array.isArray(source[key]) ? [] : {}
          }
          target[key] = this.generizeJson(target[key], source[key])
        } else {
          if (Array.isArray(source)) {
            target = Array.isArray(target) ? target : Array.of(target)
            callback(target, source, key)
            // let tkey = target.length;
            // target[tkey] = source[key];
          } else {
            target[key] = (target[key] ? [target[key]] : []).concat([source[key]])
          }
        }
      }
      return target
    },
    summarizeJson (target, source) {
      let transfer = (target, source, key) => {
        // target = target.concat([source[key]])
        target[key] = target[key] ? target[key] : 0 + source[key]
      }
      return this.shapeJson(source, target, transfer)
    }
  }
}
</script>
