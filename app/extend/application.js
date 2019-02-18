const fs = require('fs')
const { exec } = require('child_process')

Date.prototype.Format = function(fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)); }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length == 1)
          ? (o[k])
          : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

// Date.prototype.toJSON = function() {
//   return this.Format('yyyy-MM-dd hh:mm:ss');
// };

// Map.prototype.toJSON = function() {
//   const obj = {};
//   this.forEach((v, k) => {
//     obj[k] = v;
//   });
//   return obj;
// };

// 不可重入锁
const locklist = {};
const unlockGen = lockid => {
  return () => {
    // 释放锁
    locklist[lockid].locked = false;
    const nextResolve = locklist[lockid].waitlist.pop();
    if (nextResolve) {
      locklist[lockid].locked = true;
      nextResolve({ unlock: unlockGen(lockid) });
    }
  };
};

const applyLock = lockid => {
  // 返回一个promise，await成功后说明获取锁成功
  return new Promise((resolve, reject) => {
    // 先把当前申请加入到锁队列
    if (!locklist[lockid]) {
      locklist[lockid] = {
        locked: false,
        waitlist: [],
      };
    }
    // 触发一次锁分配检查
    if (!locklist[lockid].locked) {
      // 只有当前申请，则直接分配
      locklist[lockid].locked = true;
      resolve({ unlock: unlockGen(lockid) });
    } else {
      locklist[lockid].waitlist.push(resolve);
    }
  });
};

module.exports = {
  bb: new Map(),
  getGitVersion: async ()=>{
    return new Promise((resolve, reject)=>{
      exec('git log -n 1', (err, stdout, stderr)=>{
        if (err) {
          reject(err)
          return
        }

        resolve(stdout.match(/.*(commit) (\w+)/)[2])
      })
    })
  },
  getGitFullVersion() {
    return new Promise((resolve, reject)=>{
      exec('git log -n 3', (err, stdout, stderr)=>{
        if (err) {
          reject(err)
          return
        }

        resolve(stdout)
      })
    })
  },
  lock: async (lockid, task) => {
    let result;
    let aLock;
    try {
      try {
        aLock = await applyLock(lockid);
        result = await task();
      } finally {
        if (aLock) {
          aLock.unlock();
        }
      }
    } catch (e) {
      throw e;
    }
    return result;
  },
};
