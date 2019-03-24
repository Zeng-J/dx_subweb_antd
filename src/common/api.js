//公共接口

//工具引入
import { get, post, put, del } from "@/utils/http";

import { post2} from "@/utils/http2";

//示例接口
export const getUser = id => get("/user/" + id);
export const getUsers = params => get("/user", params);
export const addUser = params => post("/user", params);
export const editUser = (id, params) => put("/user/" + id, params);
export const delUser = id => del("/user/" + id);

export const getPicCode = (random) => post2("/subweb/open/captcha/"+random)

export const getSmsCaptcha = (params) => post2("/subweb/open/sms/reg",params)

export const register = (params) => post2("/subweb/open/user",params)