export interface AddTodoResponse {}

export interface GetToDoList {
  id: string;
  name: string;
  detail: string;
  picturePath: string;
  isDone: boolean;
  createdAt: string
}