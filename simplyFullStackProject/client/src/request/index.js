import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
})

export const getStudentList = ()=>{
  return axiosInstance.get("/student")
}

// 跨域
// 1. 服务端配置
// 2. 本地配置proxy