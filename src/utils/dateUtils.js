Date.prototype.format = function(fmt) {
  let tmp = fmt
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(tmp)) {
    tmp = tmp.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(tmp)) {
      tmp = tmp.replace(
        RegExp.$1,
        o[k] < 10 ? `0${o[k]}`.substr(o[k].length) : o[k]
      )
    }
  }
  return tmp
}
