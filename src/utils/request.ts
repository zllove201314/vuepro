import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseurl
  // timeout
})

function toLogin () {
  router.push({
    name: 'login',
    query: {
      redicrect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config: any) {
  // 这里改写config的配置
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // config一定要返回，否者请求发布出去
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false
let requests: any[] = []
request.interceptors.response.use(function (response) {
  // 2XX会进入这里
  // 自定义状态码写在这里
  return response
}, async function (error) {
  // 超出2XX 会进入这里
  // http 状态码写在这里
  if (error.response) {
    // 请求发出了，但是状态码超出2XX
    // console.log('00000', error.response)
    const { status } = error.request

    if (status === 401) {
      // token 无效(过期，未提供token，token不对)
      // 1.刷新token 如果有 refresh_token
      if (!store.state.user) {
        // 跳转到登录
        toLogin()
      }
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新token
        // 发送请求刷新token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败')
          }
          // 刷新token陈宫
          store.commit('setUser', res.data.content)
          requests.forEach(cb => cb())
          requests = [] // 重置数组
          return request(error.config)
        }).catch(error => {
          // 刷新token失败，清空store.state.user,并跳转到登录页
          store.commit('setUser', null)
          toLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }

      // 刷新状态下，把请求挂起放在requests数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求地址不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，联系管理员')
    }
  } else if (error.request) {
    // 请求发出了，但是超时 没有响应
    console.log(error.request)
  } else {
    // 在设置请求时发生了一些错误
    console.log('Error', error.message)
  }

  // 把请求失败的错误对象继续抛出，发给上一个调用者
  return Promise.reject(error)
})

export default request
