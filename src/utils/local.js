// 关于本地存储的工具js
// 作者: 古天乐

export default {
  // 存
  set(key, value) {
    localStorage.setItem(key, value);
  },
  // 取
  get(key) {
    return localStorage.getItem(key);
  },
  // 删一个
  remove(key) {
    localStorage.removeItem(key);
  },
  // 清空
  clear() {
    localStorage.clear();
  },
};
