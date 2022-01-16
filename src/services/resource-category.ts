/*
* 资源分类的请求模块
*/

import request from '@/utils/request'

export const getResourceCategory = () => {
  return request({
    url: '/boss/resource/category/getAll',
    method: 'GET'
  })
}
