export interface AddTodoResponse {}

export interface GetToDoList {
  id: string;
  name: string;
  detail?: string;
  picturePath?: string;
  isDone?: boolean;
  createdAt: string
}

export interface TodoPublic {
  id: string;
  publicLink: string;
  createdAt: string;
}

export interface ToDoPublicResponse {
  id: string;
  name: string;
  detail: string;
  picturePath: string;
  isDone: boolean;
  createdAt: string;
}
