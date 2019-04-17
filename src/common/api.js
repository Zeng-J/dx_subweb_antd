//公共接口

//工具引入
import { Post, Get, Put, Delete, Post2} from "@/utils/http";

//示例接口
// export const getUser = id => get("/user/" + id);
// export const getUsers = params => get("/user", params);
// export const addUser = params => post("/user", params);
// export const editUser = (id, params) => put("/user/" + id, params);
// export const delUser = id => del("/user/" + id);

export const getPicCode = (random) => Post("/subweb/open/captcha/"+random)

export const getSmsCaptcha = (addr,params) => Post("/subweb/open/sms/"+addr, params)

export const register = (params) => Post("/subweb/open/user", params)

export const login = (addr,params) => Post("/subweb/open/token/"+addr, params)

export const getUser = token => Get('/subweb/auth/user', token)

export const putUser = (data, token) => Put('/subweb/auth/user', data, token)

export const putPsw = (data, token) => Put('/subweb/auth/user/pwd', data, token)

export const logout = (token) => Delete('/subweb/auth/token', token)

// 竞赛
export const listContestType = () => Get('/subweb/open/contest/listContestType')

export const listContest = (data) => Get('/subweb/open/contest/listContest?' + data)

export const contestInfoId = (addr, id, token) => Get('/subweb/'+ addr +'/contest/getContestInfoId/' + id, token)

export const situation = (id, token) => Get('/subweb/auth/Situation/detail/' + id, token)

// 我的竞赛
export const myContest = (token) => Get('/subweb/auth/contest/getUserContestInfo', token)

// 竞赛报名
export const jionContest = (params, token) => Post2('/subweb/auth/UserContest', params, token)
// 获取竞赛报名信息
// export const contestApplicationInfo = (token) => Get('/subweb/auth/UserContest', token)



// 组织
export const orgMgtList = (token) => Get('/subweb/auth/Org/getOrgMgtList', token)

// ===============================团队成员==========================================================================================

// 团队成员列表
export const teamMember = (query, token) => Get('/subweb/auth/teamMember?'+query, token)

// 获取某一成员信息
export const teamMemberById = (id, token) => Get('/subweb/auth/teamMember/'+id, token)

// 编辑组织成员
export const editTeamMember = (data, token) => Put('/subweb/auth/teamMember', data, token)

// 新增组织成员
export const postTeamMember = (data, token) => Post2('/subweb/auth/teamMember', data, token)

// 检查是否已经是组织成员
export const ismember = (param, token) => Get('/subweb/auth/teamMember/checkMember/'+param, token)



// ===============================团队角色==========================================================================================

// 团队角色列表
export const roleList = (token) => Get('/subweb/auth/teamRole/getRolelist', token)

// 角色详情
export const roleDetails = (id, token) => Get('/subweb/auth/teamRole/getRole?roleId='+id, token)

// 编辑角色
export const editTeamRole = (data, token) => Put('/subweb/auth/teamRole', data, token)

// 新增角色
export const addTeamRole = (data, token) => Post2('/subweb/auth/teamRole', data, token)

// 权限列表
export const permissionList = (token) => Get('/subweb/auth/Perm/AddEdiRole', token)

// ===============================团队群组==========================================================================================

// 团队成员列表
export const teamGroup = (query, token) => Get('/subweb/auth/teamGroup?'+query, token)

// 获取群组信息
export const teamGroupDetails = (param, token) => Get('/subweb/auth/teamGroup/'+param, token)

// 更新群组信息
export const putGroupDetails = (data, token) => Put('/subweb/auth/teamGroup', data, token)

// 新增群组
export const postGroupDetails = (data, token) => Post2('/subweb/auth/teamGroup', data, token)