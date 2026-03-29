import { useCallback, useEffect, useState } from 'react';

const MAX_STORAGE_ITEM_BYTES = 100_000;

/**
 * @deprecated 此文件保留为兼容层（避免删除文件引起的跨分支冲突）。
 * 迁移说明：
 * - 购物车：改用 `@/contexts/CartContext` 中的 `useCart`。
 * - 业务型本地存储 hooks（wishlist/recentlyViewed/searchHistory）已移除，请在对应页面/feature 内按需实现。
 * - 推荐仅保留并使用本通用 hook：`useLocalStorage<T>()`。
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item && item.length > MAX_STORAGE_ITEM_BYTES) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          const serialized = JSON.stringify(valueToStore);

          if (serialized.length > MAX_STORAGE_ITEM_BYTES) {
            throw new Error(`Value for key "${key}" exceeds localStorage size guard`);
          }

          window.localStorage.setItem(key, serialized);
          window.dispatchEvent(new StorageEvent('storage', { key, newValue: serialized }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  useEffect(() => {
    setStoredValue(readValue());
  }, [key, readValue]);

  return [storedValue, setValue];
}
