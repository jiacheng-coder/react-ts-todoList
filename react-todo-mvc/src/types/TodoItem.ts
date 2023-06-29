// 普通版 TodoItem 的类型
export interface Todo {
  id: number,
  title: string,
  completed: boolean
}
// 袋鼠版 TodoItem 的类型
export interface TodoItem {
  id: string,
  title: string,
  content: string,
  date: string,
  completed: boolean
}