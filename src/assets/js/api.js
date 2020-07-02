const base = 'http://210.14.69.81:5000'
let baseNew = 'http://10.200.43.5:5001'
if (!process.env.DEV) {
  baseNew = 'http://10.200.43.5:5001'
}
const apisetting = {
  'abnormal': {
    // url: base + '/api/abnormals',
    url: baseNew + '/api/water/abnormals',
    method: 'get'
  },
  'elements': {
    url: baseNew + '/api/water/elements_normalized',
    // url: base + '/api/elements',
    method: 'get'
  },
  'health': {
    url: base + '/api/health',
    method: 'get'
  },
  'recent': {
    url: baseNew + '/api/water/recent',
    method: 'get'
  },
  'logout': {
    url: base + '/api/logout',
    method: 'get'
  }

}

export default apisetting
