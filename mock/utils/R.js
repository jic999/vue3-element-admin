// class R {
//   constructor(code, msg, dataObj) {
//     this.code = code
//     this.msg = msg
//     if (dataObj) {
//       Object.keys(dataObj).forEach((key) => {
//         this[key] = dataObj[key]
//       })
//     }
//   }
//   static success(msg, data) {
//     return new R(0, msg, data)
//   }
//   static fail(msg) {
//     return new R(-1, msg)
//   }
// }

const R = {
  success(msg, dataObj) {
    const data = {}
    Object.keys(dataObj).forEach((key) => {
      data[key] = dataObj[key]
    })
    return { code: 0, msg, ...data }
  },
  fail(msg) {
    return { code: -1, msg }
  },
}
export default R
