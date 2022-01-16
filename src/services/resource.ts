/*
* 资源的请求模块
*/

import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    url: '/boss/resource/getResourcePages',
    method: 'POST',
    data
  })
}
