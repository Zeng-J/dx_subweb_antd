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

export const getUser = () => Get('/subweb/auth/user')

export const putUser = (data) => Put('/subweb/auth/user', data)

export const putPsw = (data) => Put('/subweb/auth/user/pwd', data)

export const logout = () => Delete('/subweb/auth/token')

// 竞赛
export const listContestType = () => Get('/subweb/open/contest/listContestType')

export const listContest = (data) => Get('/subweb/open/contest/listContest?' + data)


export const contestInfoId = (addr, id) => Get('/subweb/'+ addr +'/contest/getContestInfoId/' + id)

export const situation = (id) => Get('/subweb/auth/Situation/detail/' + id)

// 我的竞赛
export const myContest = () => Get('/subweb/auth/contest/getUserContestInfo')

// 竞赛报名
export const jionContest = (params) => Post2('/subweb/auth/UserContest', params)
// 获取竞赛报名信息
// export const contestApplicationInfo = (token) => Get('/subweb/auth/UserContest', token)



// 组织
export const orgMgtList = () => Get('/subweb/auth/Org/getOrgMgtList')

// ===============================团队成员==========================================================================================

// 团队成员列表
export const teamMember = (query) => Get('/subweb/auth/teamMember?'+query)

// 获取某一成员信息
export const teamMemberById = (id) => Get('/subweb/auth/teamMember/'+id)

// 编辑组织成员
export const editTeamMember = (data) => Put('/subweb/auth/teamMember', data)

// 新增组织成员
export const postTeamMember = (data) => Post2('/subweb/auth/teamMember', data)

// 检查是否已经是组织成员
export const ismember = (param) => Get('/subweb/auth/teamMember/checkMember/'+param)



// ===============================团队角色==========================================================================================

// 团队角色列表
export const roleList = () => Get('/subweb/auth/teamRole/getRolelist')

// 角色详情
export const roleDetails = (id) => Get('/subweb/auth/teamRole/getRole?roleId='+id)

// 编辑角色
export const editTeamRole = (data) => Put('/subweb/auth/teamRole', data)

// 新增角色
export const addTeamRole = (data) => Post2('/subweb/auth/teamRole', data)

// 权限列表
export const permissionList = () => Get('/subweb/auth/Perm/AddEdiRole')

// ===============================团队群组==========================================================================================

// 团队成员列表
export const teamGroup = (query) => Get('/subweb/auth/teamGroup?'+query)

// 获取群组信息
export const teamGroupDetails = (param) => Get('/subweb/auth/teamGroup/'+param)

// 更新群组信息
export const putGroupDetails = (data) => Put('/subweb/auth/teamGroup', data)

// 新增群组
export const postGroupDetails = (data) => Post2('/subweb/auth/teamGroup', data)