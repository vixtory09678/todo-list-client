import axios, { AxiosError } from 'axios'
import { LogInResponse, SignUpResponse } from './interfaces/auth-res.interface'

const host = process.env.TODO_SERVICE || 'http://localhost:3000'

const signup = async function(username: string, password: string) : Promise<{signupResponse?: SignUpResponse, err?:string}> {
  try {
    const resp = await axios.post(host + '/auth/signup', { username, password: btoa(password) })
    const signupResponse: SignUpResponse = resp.data
    return { signupResponse, err: undefined }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { signupResponse: undefined, err: err.response.data.message }
    }
    return { signupResponse: undefined, err: undefined }
  }
}

const login = async function(username: string, password: string) : Promise<{loginResponse?: LogInResponse, err?:string}> {
  try {
    const resp = await axios.post(host + '/auth/login', { username, password: btoa(password) })
    const loginResponse: LogInResponse = resp.data
    return { loginResponse, err: undefined }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { loginResponse: undefined, err: err.response.data.message }
    }
    return { loginResponse: undefined, err: undefined }
  }
}

export {
  signup,
  login
}