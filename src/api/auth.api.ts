import axios from 'axios'
import { LogInResponse, SignUpResponse } from './interfaces/auth-res.interface'

const host = process.env.TODO_SERVICE

const signup = async function(username: string, password: string) : Promise<SignUpResponse> {
  const resp = await axios.post(host + '/signup', { username, password: btoa(password) })
  const signupResponse: SignUpResponse = resp.data
  return signupResponse
}

const login = async function(username: string, password: string) : Promise<LogInResponse> {
  const resp = await axios.post(host + '/login', { username, password: btoa(password) })
  const loginResponse: LogInResponse = resp.data
  return loginResponse
}

export {
  signup,
  login
}