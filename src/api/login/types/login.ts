export interface ILoginRequestData {
  /** admin 或 editor */
  username: "admin" | "editor"
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
  captchaKey: string
  remember?: boolean
}

export type LoginCodeResponseData = IApiResponseData<{ captchaKey: string; dataBase64: string }>

export type LoginResponseData = IApiResponseData<{ token: string }>

export type UserInfoResponseData = IApiResponseData<{ loginName: string; roles: string[] }>
