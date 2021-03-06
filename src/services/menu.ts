/*
* 菜单相关的请求模块
*/

import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}

export const createOrUpdateMenu = (data: any) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'POST',
    data
  })
}

export const getAllMenus = () => {
  return request({
    url: '/boss/menu/getAll',
    method: 'GET'
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    url: '/boss/menu/getEditMenuInfo',
    method: 'GET',
    params: {
      id
    }
  })
}

export const deleteMenu = (id: number) => {
  return request({
    url: `/boss/menu/${id}`,
    method: 'DELETE'
  })
}

export const getMenuNodeList = () => {
  return request({
    url: '/boss/menu/getMenuNodeList',
    method: 'GET'
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    url: '/boss/menu/allocateRoleMenus',
    method: 'POST',
    data
  })
}

export const getRoleMenus = (roleId: string | number) => {
  return request({
    url: '/boss/menu/getRoleMenus',
    method: 'GET',
    params: {
      roleId
    }
  })
}
