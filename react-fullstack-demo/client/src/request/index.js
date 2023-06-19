import axios from 'axios'

export const getStudentList = ()=>{
  return axios.get("/api/student")
}

// 跨域
// 1. 服务端配置
// 2. 本地配置proxy