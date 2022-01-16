/*
* 角色的请求模块
*/

import request from '@/utils/request'

export const getRoles = (data: any) => {
  return request({
    url: '/boss/role/getRolePages',
    method: 'POST',
    data
  })
}

export const createOrUpdate = (data: any) => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'POST',
    data
  })
}
