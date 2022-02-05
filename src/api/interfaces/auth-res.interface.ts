export interface LogInResponse {
  username: string,
  accessToken: string,
  expiresIn: string,
}

export interface SignUpResponse {
  id: string,
  username: string
}