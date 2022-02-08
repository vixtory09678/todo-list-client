import { HOST } from '../api/constant'

export function getAccessToken() {
  const token = localStorage.getItem('accessToken') || ''
  return token
}

export function getImageByPath(path: string): string {
  return HOST + '/images' + path
}