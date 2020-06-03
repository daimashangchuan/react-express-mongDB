/**
 * localStorage中实现自动登录
 */

export default {
    // 保存 user 
    setUser(user) {
        localStorage.setItem('USER_KEY',JSON.stringify(user));
    },
    // 读取 user
    getUser() {
        const user = JSON.parse(localStorage.getItem('USER_KEY'))
        return user?user:{};
    },
    removeUser() {
        localStorage.removeItem('USER_KEY');
    }
}
/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const delStorage = name => {
    if (!name) return
    window.localStorage.removeItem(name)
} 
