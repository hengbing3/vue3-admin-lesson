/*
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-03-05 17:15:30
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-03-05 22:21:23
 * @FilePath: \vue3-admin-lesson\src\api\register\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils/service"
import type * as Register from "./types/register"

/** 注册 */
export function registerUserDataApi(data: Register.IFormData) {
  return request({
    url: "register",
    method: "post",
    data
  })
}
