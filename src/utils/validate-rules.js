// { required : true , message : '' , pattern : '' , validator( rule , value , callback ){ callback() ; callback(new Error(rule.message))} }

export default {
   // 校验密码
  psd () {
    return { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}/, message: `请输入正确的密码` }
  },
  // 必填
  required () {
    return { required: true, message: `必填项` }
  },
  // 整数
  int () {
    return { pattern: /^-?[0-9]\d*$/, message: `请输入整数` }
  },
  // 正整数
  nInt () {
    return { pattern: /^[1-9]\d*$/, message: `请输入正整数` }
  },
  // 负整数
  pInt () {
    return { pattern: /^-[1-9]*$/, message: `请输入负整数` }
  },
  // 大于
  greater (n, isEqual) {
    return {
      validator (r, v, callback) {
        if (isEqual) {
          v >= n ? callback() : callback(new Error(`必须大于或等于 ${n}`))
        }
        else {
          v > n ? callback() : callback(new Error(`必须大于 ${n}`))
        }
      }
    }
  },
  // 小于
  less (n, isEqual) {
    return {
      validator (r, v, callback) {
        if (isEqual) {
          v <= n ? callback() : callback(new Error(`必须小于或等于 ${n}`))
        }
        else {
          v < n ? callback() : callback(new Error(`必须小于 ${n}`))
        }
      }
    }
  },
  min (min) {
    min *= 1
    return {
      validator (r, v, callback) {
        v < min ? callback(new Error(`不可小于 ${min}`)) : callback()
      }
    }
  },
  max (max) {
    max *= 1
    return {
      validator (r, v, callback) {
        v > max ? callback(new Error(`不可大于 ${max}`)) : callback()
      }
    }
  },
  // 范围  参数 最小值 最大值  是否允许相等
  range (min, max, isEqual) {
    return {
      validator (r, v, callback) {
        if (isEqual) {
          (min <= v && v <= max) ? callback() : callback(new Error(`取值范围 ${min} ~ ${max}`))
        }
        else {
          (min < v && v < max) ? callback() : callback(new Error(`取值范围在${min} ~ ${max} 之间`))
        }
      }
    }
  },
  min (min) {
    min *= 1
    return {
      validator (r, v, callback) {
        v < min ? callback(new Error(`不可小于 ${min}`)) : callback()
      }
    }
  },
  max (max) {
    max *= 1
    return {
      validator (r, v, callback) {
        v > max ? callback(new Error(`不可大于 ${max}`)) : callback()
      }
    }
  },
  // 范围  参数 最小值 最大值  是否允许相等
  range (min, max, isEqual) {
    return {
      validator (r, v, callback) {
        if (isEqual) {
          (min <= v && v <= max) ? callback() : callback(new Error(`取值范围 ${min} ~ ${max}`))
        }
        else {
          (min < v && v < max) ? callback() : callback(new Error(`取值范围在${min} ~ ${max} 之间`))
        }
      }
    }
  },
  // 任意数字验证
  number () {
    return { pattern: /^-?\d*[.]?\d*$/, message: `请输入数字`}
  },
  // 小数 ( 默认 2 为  )( 精确 )
  float (len) {
    len = len || 2
    return { pattern: new RegExp(`^-?\\d*\\.[\\d]{${len}}$`), message: `请输入精确到 ${len} 位的小数` }
  },
  // 最大小数位数
  maxFloat (len = 2) {
    return { pattern: new RegExp(`^-?(([1-9][0-9]*)|(([0]\\.\\d{1,2}|[1-9][0-9]*\\.\\d{1,${len}})))$`), message: `请输入最多 ${len} 位的小数的数字` }
  },
  // 最小长度限制
  minLength (min) {
    return {
      validator (r, v, c) {
        v += ''
        v.length < min ? c(new Error(`字符长度不可少于`, { number: min })) : c()
      }
    }
  },
  // 最大长度验证
  maxLength (max) {
    return {
      validator (r, v, c) {
        v += ''
        v.length > max ? c(new Error(`字符长度不可超过${max}`, { number: max })) : c()
      }
    }
  },
  // 长度限制
  length (min, max) {
    return {
      validator (r, v, c) {
        v += '';
        (v.length < min || v.length > max) ? c(new Error(`字符长度应该在${min}-${max}`, { min: min, max: max })) : c()
      }
    }
  },
  // 非空验证
  notEmpty () {
    return { pattern: new RegExp("\\S+", "g"), message: `不可为空` }
  },
  // 不包含特殊字符 | & # [ ]
  noSpecial () {
    return { pattern: /^((?![\|\&\#\[\]]).)*$/, message: '不可包含特殊字符 | & # [ ]' }
  },
  // 必须包含验证
  withIn (v) {
    return { pattern: new RegExp(v), message: '字符中必须包含'`${v}` }
  },
  // 不可包含验证
  withOut (v) {
    return { pattern: new RegExp(`^((?!${v}).)*$`), message: '字符中不可包含' + `${v == ' ' ? '空格' : v}` }
  },
  //（字母，数字，下划线，减号）
  account () {
    let reg = new RegExp(`^[a-zA-Z0-9_-]*$`)
    return { pattern: reg, message: `只可包含 字母，数字，下划线，减号`, trigger: 'blur' }
  },
  // 链接
  url () {
    return { pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message: '链接格式有误', trigger: 'blur' }
  },
  // 身份证
  idCard () {
    return { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确身份证号码', trigger: 'blur' }
  },
  // 手机号
  mobile () {
    return { pattern: /^1[345789]\d{9}$/, message: '请正确输入手机号码', trigger: 'blur' }
  },
  mobileName () {
    return { pattern: /^1[345789]\d{8,49}$/, message: '请正确输入手机号码', trigger: 'blur' }
  },
  // 电话
  telephone () {
    return { pattern: /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)/, message: '请正确输入电话号码', trigger: 'blur' }
  },
  eMail () {
    return { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请正确输入邮箱地址', trigger: 'blur' }
  },
  // 不包含中文
  noCN () {
    return { pattern: /^[\x01-\x7f]*$/, message: '不可包含中文' }
  },
  // 全局字段长度 ( 默认 30 )
  G_FieldLength () {
    return this.maxLength(30)
  },
  // 全局备注长度 ( 默认 300 )
  G_RemarkLength () {
    return this.maxLength(300)
  },
  // 全局邮箱地址长度 ( 50 )
  G_EMailLength () {
    return this.maxLength(50)
  },
  // 全局密码长度（ 6 - 16）
  G_PasswordLength () {
    return this.length(6, 16)
  }
}
