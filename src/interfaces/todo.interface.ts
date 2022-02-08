export interface UpdateItem {
  id: string;
  name?: string;
  detail?: string;
  isDone?: boolean;
  file?: File;
}

export interface AddItem {
  name: string;
  detail?: string;
  file?: File;
}