/*
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-03-05 17:16:07
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-03-08 16:26:22
 * @FilePath: \vue3-admin-lesson\src\api\register\types\register.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface IFormData {
  userName: string
  password: string
  checkPassword: string
  idCard: string
  phone: string
  email: string
  department: any
  role: any
}

// 用户注册返回值
export type UserRegisterResponseData = IApiResponseData<{ id: number; loginName: string; userName: string }>
