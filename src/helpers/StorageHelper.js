export default class StorageHelper {
  static getStorage(cname) {
    // getter
    return localStorage.getItem(cname);
  }

  static setStorage(cname, cvalue) {
    // setter
    localStorage.setItem(cname, cvalue);
  }

  static checkInStorage(cname) {
    if (localStorage.getItem(cname)) {
      return true;
    } else {
      return false;
    }
  }

  static deleteStorage(cname) {
    localStorage.removeItem(cname);
  }
}
