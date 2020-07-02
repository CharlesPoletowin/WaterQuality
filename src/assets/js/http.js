import axios from 'axios'
import { Notify, SessionStorage } from 'quasar'
// http resquest 拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error.response)
})

function notiyfyerror (message) {
  Notify.create({
    color: 'warning',
    icon: 'report_problem',
    position: 'top',
    message: message
  })
}

function errorState (response) {
  console.log('errorState=============')
  if (response) {
    notiyfyerror(response.status + ' : ' + response.statusText)
  }
}

function successState (res) {
  // 统一判断后端返回的错误码
  console.log('successState=============')
  // if(!res.data.code){
  return res.data
  //  console.log(res)
  // }else{
  //   notiyfyerror(res.data.code+":"+res.data.message);
  // }
}

const httpServer = (opts, param) => {
  let httpDefaultOpts = { // http默认配置
    method: opts.method,
    baseURL: '',
    url: opts.url,
    // timeout: 2000,
    params: param,
    data: param,
    headers: opts.method === 'get' ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        resolve(successState(res))
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default httpServer
