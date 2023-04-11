/**
 * @deprecated
 *
 * @description
 * @export
 * @enum {number}
 */
export enum Store {
  LOCAL = 'local',
  SESSION = 'session',
  MEMORY = 'memory'
}

/**
 * @deprecated
 *
 * @description
 * @author Chema Perez
 * @date 2019-08-07
 * @export
 * @class LocalStorage
 */
export class LocalStorage {
  static get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static remove(key: string): boolean {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  static clear(): void {
    localStorage.clear();
  }
}

/**
 * @deprecated
 *
 * @description
 * @author Chema Perez
 * @date 2019-08-07
 * @export
 * @class SessionStorage
 */
export class SessionStorage {
  static get(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  static set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  static remove(key: string): boolean {
    if (sessionStorage.getItem(key) !== null) {
      sessionStorage.removeItem(key);
      return true;
    }
    return false;
  }

  static clear(): void {
    sessionStorage.clear();
  }
}

/**
 * @deprecated
 *
 * @description
 * @author Chema Perez
 * @date 2019-08-07
 * @export
 * @class MemoryStorage
 */
export class MemoryStorage {
  private static readonly store: Map<string, string> = new Map<string, string>();

  static get(key: string): any {
    return JSON.parse(this.store.get(key.trim()));
  }

  static set(key: string, value: any): void {
    this.store.set(key.trim(), JSON.stringify(value));
  }

  static has(key: string): boolean {
    return this.store.has(key.trim());
  }

  static remove(key: string): boolean {
    if (this.store.has(key.trim())) {
      return this.store.delete(key.trim());
    }
    return false;
  }

  static clear(): void {
    this.store.clear();
  }
}


/**
 * @deprecated
 *
 * @description
 * @author Chema Perez
 * @date 2019-08-07
 * @export
 * @class WebStorage
 */
export class WebStorage {
  static get(key: string, store: Store = Store.MEMORY): any {
    if (store === Store.LOCAL) {
      return LocalStorage.get(key);
    } else if (store === Store.SESSION) {
      return SessionStorage.get(key);
    } else {
      return MemoryStorage.get(key);
    }
  }

  static set(key: string, value: any, store: Store = Store.MEMORY): void {
    if (store === Store.LOCAL) {
      return LocalStorage.set(key, value);
    } else if (store === Store.SESSION) {
      return SessionStorage.set(key, value);
    } else {
      return MemoryStorage.set(key, value);
    }
  }

  static has(key: string, store: Store = Store.MEMORY): boolean {
    if (store === Store.LOCAL) {
      return LocalStorage.has(key);
    } else if (store === Store.SESSION) {
      return SessionStorage.has(key);
    } else {
      return MemoryStorage.has(key);
    }
  }

  static remove(key: string, store: Store = Store.MEMORY): boolean {
    if (store === Store.LOCAL) {
      return LocalStorage.remove(key);
    } else if (store === Store.SESSION) {
      return SessionStorage.remove(key);
    } else {
      return MemoryStorage.remove(key);
    }
  }

  static clear(store: Store = Store.MEMORY): void {
    if (store === Store.LOCAL) {
      return LocalStorage.clear();
    } else if (store === Store.SESSION) {
      return SessionStorage.clear();
    } else {
      return MemoryStorage.clear();
    }
  }
}
