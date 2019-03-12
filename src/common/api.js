//公共接口

//工具引入
import { get, post, put, del } from "@/utils/http";

//示例接口
export const getUser = id => get("/user/" + id);
export const getUsers = params => get("/user", params);
export const addUser = params => post("/user", params);
export const editUser = (id, params) => put("/user/" + id, params);
export const delUser = id => del("/user/" + id);
