//公共接口

//工具引入
import { Post, Get, Put, Delete} from "@/utils/http";

//示例接口
// export const getUser = id => get("/user/" + id);
// export const getUsers = params => get("/user", params);
// export const addUser = params => post("/user", params);
// export const editUser = (id, params) => put("/user/" + id, params);
// export const delUser = id => del("/user/" + id);

export const getPicCode = (random) => Post("/subweb/open/captcha/"+random)

export const getSmsCaptcha = (addr,params) => Post("/subweb/open/sms/"+addr,params)

export const register = (params) => Post("/subweb/open/user",params)

export const login = (addr,params) => Post("/subweb/open/token/"+addr,params)

export const getUser = token => Get('/subweb/auth/user', token)

export const putUser = (data, token) => Put('/subweb/auth/user', data, token)

export const putPsw = (data, token) => Put('/subweb/auth/user/pwd', data, token)

export const logout = (token) => Delete('/subweb/auth/token', token)

// 竞赛
export const listContestType = () => Get('/subweb/open/contest/listContestType')

export const listContest = (data) => Get('/subweb/open/contest/listContest?' + data)

export const contestInfoId = (id) => Get('/subweb/open/contest/getContestInfoId/' + id)


// 组织
export const orgMgtList = (token) => Get('/subweb/auth/Org/getOrgMgtList', token)