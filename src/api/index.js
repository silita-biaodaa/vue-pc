import axios from 'axios'


// const baseURL = 'http://api.biaodaa.com/'
const baseURL = 'http://pre.biaodaa.com/'



axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  // let token = localStorage.getItem('Authorization')
  let token = 'biaodaaTestToken'


  if (token) {
    config.headers['X-TOKEN'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
//   if (response.data.code === 402 || response.data.code === 401) {
//     localStorage.removeItem('Authorization')
//     this.$router.replace({
//       path: '/login' // 到登录页重新获取token
//     })
//   }
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })


export const getJsonData = (url, params) => {
  return new Promise((resolve, reject) => {
    // let token = localStorage.getItem("Authorization")
    let token = 'biaodaaTestToken'
    if (params != null) {
      axios.post(url, params, {
        headers: { 'Content-Type': 'application/json', 'X-TOKEN': token }
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    } else {
      axios.post(url, null, {
        headers: { 'Content-Type': 'application/json', 'X-TOKEN': token }
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    }
  })

}

export const foundation = params => {
  return axios.post('foundation/listBannerImage', params).then(res => res.data)
}

export const queryList = params => {
  return axios.post('notice/queryList', params).then(res => res.data)
}

export const companyList = params => {
  return axios.post('company/host', params).then(res => res.data)
}

export const filter = params => {
  return axios.get('company/filter', params).then(res => res.data)
}

export const companys = params => {
  return axios.post('company/query/filter', params).then(res => res.data)
}

