export interface IStorage {
  setString(key: string, value: string): void;
  setNumber(key: string, value: number): void;
  setBoolean(key: string, value: boolean): void;
  setObject<T>(key: string, value: T): void;
  getString(key: string, defaultValue: string | null): string | null;
  getNumber(key: string, defaultValue: number | null): number | null;
  getBoolean(key: string, defaultValue: boolean | null): boolean | null;
  getObject<T>(key: string, defaultValue: T | null): T | null;
  clearAll(): void;
}
