export interface UpdateToDoItem {
  id: string,
  name?: string;
  detail?: string;
  isDone?: boolean;
  [ key: string]: any;
}

export interface AddToDoItem {
  name?: string;
  detail?: string;
  pictureName?: string;
  isDone?: boolean;
}