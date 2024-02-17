import { IStorage } from "@/models/client/IStorage";

class LocalStorage implements IStorage {
  getString(key: string, defaultValue: string) {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value || defaultValue;
    } else return defaultValue;
  }

  getNumber(key: string, defaultValue: number) {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return Number(value) || defaultValue;
    } else return defaultValue;
  }

  getObject<T>(key: string, defaultValue: T) {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : defaultValue;
    } else return defaultValue;
  }

  getBoolean(key: string, defaultValue: boolean) {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? value === "true" : defaultValue;
    } else return defaultValue;
  }

  setString(key: string, value: string) {
    if (typeof window !== "undefined") window.localStorage.setItem(key, value);
  }

  setNumber(key: string, value: number) {
    if (typeof window !== "undefined")
      window.localStorage.setItem(key, String(value));
  }

  setBoolean(key: string, value: boolean) {
    if (typeof window !== "undefined")
      window.localStorage.setItem(key, String(value));
  }

  setObject<T>(key: string, value: T) {
    if (typeof window !== "undefined")
      window.localStorage.setItem(key, JSON.stringify(value));
  }

  clearAll(): void {
    if (typeof window !== "undefined") window.localStorage.clear();
  }
}

const localStorageInstance = new LocalStorage();
export default localStorageInstance;
