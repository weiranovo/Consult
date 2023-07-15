const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]
const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码为6位数字' }
]
const pattern = /^[1-9]\d{5}(19|20)\d{2}(0\d|1[0-2])([0-2]\d|3[0-1])\d{3}([0-9]|X)$/
const idCardRules = [
  { required: true, message: '请输身份证' },
  { pattern, message: '请输入正确的身份证格式' },
  
]
export { mobileRules, passwordRules,codeRules,idCardRules }