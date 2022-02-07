import axios from 'axios'
import { GetToDoList } from './interfaces/todo-res.interface'
import { HOST } from './constant'
import { getAccessToken } from '@/utils'
import FormData from 'form-data'
import { AddToDoItem, UpdateToDoItem } from './interfaces/todo-req.interface'

const uploadFile = async function(file: File) : Promise<string> {
  const data = new FormData();

  data.append('image', file, file.name);
  const headers = {
    'Authorization': 'Bearer ' + getAccessToken(),
    'Content-Type': `multipart/form-data; boundary=${data.getBoundary}`,
  }
  const resp = await axios.post(HOST + '/todo/upload', data, { headers })

  const { fileName } = resp.data
  return fileName
}

const addToDo = async function(name: string, detail?: string, pictureName?: string) : Promise<{ isCompleted: boolean, err?:string}> {
  try {
    const payload: AddToDoItem = {
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

const updateTodo = async function (item: UpdateToDoItem) : Promise<{ isCompleted: boolean, err?:string}> {
  try {
    const payload: UpdateToDoItem = item
    const headers = {
      'Authorization': 'Bearer ' + getAccessToken()
    }
    const resp = await axios.put(HOST + '/todo/' + `${item.id}`, payload, { headers })

    const isCompleted: boolean = resp.status === 200
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
  getTodoList,
  uploadFile,
  updateTodo
}