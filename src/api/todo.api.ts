import axios from 'axios'
import { GetToDoList } from './interfaces/todo-res.interface'
import { HOST } from './constant'
import { getAccessToken } from '@/utils/access-token.utils'

const addToDo = async function(name: string, detail?: string, pictureName?: string) : Promise<{ isCompleted: boolean, err?:string}> {
  try {
    const payload = {
      name, detail, pictureName
    }
    const headers = {
      'Authorization': 'Bearer ' + getAccessToken()
    }
    const resp = await axios.post(HOST + '/todo', payload, { headers })

    const isCompleted: boolean = resp.status === 201
    return { isCompleted, err: undefined }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { isCompleted: false, err: err.response.data.message }
    }
    return { isCompleted: false, err: undefined }
  }
}

const getTodoList = async function() : Promise<{ getToDoList: GetToDoList[], err?: string}> {
  try {
    const headers = {
      'Authorization': 'Bearer ' + getAccessToken()
    }
    const resp = await axios.get(HOST + '/todo', { headers })

    const getToDoList: GetToDoList[] = resp.data
    return { getToDoList, err: undefined }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { getToDoList: [], err: err.response.data.message }
    }
    return { getToDoList: [], err: undefined }
  }
}

export {
  addToDo,
  getTodoList
}