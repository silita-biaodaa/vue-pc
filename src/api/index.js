import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui';
Vue.prototype.$http = axios
// const baseURL = 'http://api.biaodaa.com/'
const baseURL = 'http://pre.biaodaa.com/'
// const baseURL = '/' 




axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = sessionStorage.getItem('xtoken') ? sessionStorage.getItem('xtoken') : (localStorage.getItem('Xtoken') ? localStorage.getItem('Xtoken') : '' );
  if (token) {
    config.headers['X-TOKEN'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  if (response.data.code == 401 ) {
    // localStorage.removeItem('Xtoken')
    // sessionStorage.removeItem('xtoken')
    // window.location.href = "http://pre-new.biaodaa.com/#/logo?id=1";
  }
  return response
}, function (error) {
  return Promise.reject(error)
})


export const getJsonData = (url, params) => {
  return new Promise((resolve, reject) => {
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

export const CQdetails = params => {
  return axios.post('company/detail', params).then(res => res.data)
}

export const Branch = params => {
  return axios.post('company/branchCompany', params).then(res => res.data)
}

export const Law = params => {
  return axios.post('law/list', params).then(res => res.data)
}

export const Person = params => {
  return axios.post('company/person', params).then(res => res.data)
}

export const Project = params => {
  return axios.post('project/company/list', params).then(res => res.data)
}

export const exportX = form => {
  return axios({ // 用axios发送post请求
    method: 'post',
    url: 'api/export', // 请求地址
    data: form, // 参数
    responseType: 'blob', // 表明返回服务器返回的数据类型
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.data)
}

export const apiL = params => {
  return axios.post('api/list', params).then(res => res.data)
}

export const authorize = params => {
  return axios.post('authorize/memberLogin', params).then(res => res.data)
} 

export const getVerifyCode = params => {
  return axios.post('authorize/getVerifyCode', params).then(res => res.data)
}

export const memberRegister = params => {
  return axios.post('authorize/memberRegister', params).then(res => res.data)
}

export const updatePwd = params => {
  return axios.post('userCenter/updatePwd', params).then(res => res.data)
} 

export const updateUserTemp = params => {
  return axios.post('userCenter/updateUserInfo', params).then(res => res.data)
} 

export const getUserTemp = params => {
  return axios.post('userCenter/refreshUserInfo', params).then(res => res.data)
} 

export const address = params => {
  return axios.post('authorize/address', params).then(res => res.data)
} 

export const collectionNotice = params => {
  return axios.post('userCenter/collectionNotice', params).then(res => res.data)
} 

export const nocollectionNotice = params => {
  return axios.post('userCenter/cancelCollectionNotice', params).then(res => res.data)
}

export const collectionCompany = params => {
  return axios.post('userCenter/collectionCompany', params).then(res => res.data)
}

export const nocollectionCompany = params => {
  return axios.post('userCenter/cancelCollectionCompany', params).then(res => res.data)
}

export const collectlist = params => {
  return axios.post('userCenter/listCollectionNotice', params).then(res => res.data)
}

export const qytlist = params => {
  return axios.post('userCenter/listCollectionCompany', params).then(res => res.data)
}


export const getOpenid=params => {
    return axios.post('/authorize/openid', params).then(res => res.data)
}

export const ThirdLogin=params => {
    return axios.post('/authorize/memberThirdLogin', params).then(res => res.data)
}

export const binding = params => {
    return axios.post('authorize/thirdPartyBinding', params).then(res => res.data)
}

export const refresh = params => {
  return axios.post('/userCenter/refreshUserInfo', params).then(res => res.data)
}

export const report = params => {
  return axios.post('/report/query', params).then(res => res.data)
}

export const history = params => {
  return axios.post('/report/history/list', params).then(res => res.data)
}

export const orderList = params => {
  return axios.post('/vip/queryOrderList', params).then(res => res.data)
}

export const send = params => {
  return axios.post('/report/send/again', params).then(res => res.data)
}

export const wxPay = params => {
  return axios.post('/wxPay/report/unifiedOrder', params).then(res => res.data)
}

export const nowxPay = params => {
  return axios.post('/wxPay/queryOrderStatus', params).then(res => res.data)
}

export const FeeStandard = params => {
  return axios.post('/vip/queryFeeStandard', params).then(res => res.data)
}

export const vipPay = params => {
  return axios.post('/wxPay/unifiedOrder', params).then(res => res.data)
}

export const qual = params => {
  return axios.post('company/filter/qual', params).then(res => res.data)
}

export const project = params => {
  return axios.post('project/query', params).then(res => res.data)
}

export const prodet = params => {
  return axios.post('project/detail', params).then(res => res.data)
}

export const cprodet = params => {
  return axios.post('project/company/detail', params).then(res => res.data)
}

export const lprodet = params => {
  return axios.post('project/list/detail', params).then(res => res.data)
}

export const count = params => {
  return axios.post('project/detail/count', params).then(res => res.data)
}

export const under = params => {
  return axios.post('under/list', params).then(res => res.data)
}

export const underq = params => {
  return axios.post('under/query', params).then(res => res.data)
}

export const persond = params => {
  return axios.post('person/detail', params).then(res => res.data)
}

export const undesirable = params => {
  return axios.post('reputation/undesirable', params).then(res => res.data)
}