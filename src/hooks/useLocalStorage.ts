import { useState, useEffect, useCallback } from 'react';

const MAX_STORAGE_ITEM_BYTES = 100_000;

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get stored value or use initial value
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

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save to state
        setStoredValue(valueToStore);
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          const serialized = JSON.stringify(valueToStore);

          if (serialized.length > MAX_STORAGE_ITEM_BYTES) {
            throw new Error(`Value for key "${key}" exceeds localStorage size guard`);
          }

          window.localStorage.setItem(key, serialized);
          
          // Dispatch custom event for cross-tab synchronization
          window.dispatchEvent(
            new StorageEvent('storage', {
              key,
              newValue: serialized,
            })
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes in other tabs/windows
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
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  // Update state if key changes
  useEffect(() => {
    setStoredValue(readValue());
  }, [key, readValue]);

  return [storedValue, setValue];
}

// Hook for cart functionality
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>('aman-cart', []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === item.id && i.size === item.size
      );
      
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, [setCart]);

  const removeFromCart = useCallback((id: string, size?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  }, [setCart]);

  const updateQuantity = useCallback((id: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  }, [setCart, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
}

// Hook for wishlist functionality
export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('aman-wishlist', []);

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, [setWishlist]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, [setWishlist]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, [setWishlist]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}

// Hook for recently viewed items
export function useRecentlyViewed(maxItems: number = 10) {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>('aman-recently-viewed', []);

  const addToRecentlyViewed = useCallback((itemId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((id) => id !== itemId);
      // Add to beginning and limit to maxItems
      return [itemId, ...filtered].slice(0, maxItems);
    });
  }, [setRecentlyViewed, maxItems]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
}

// Hook for search history
export function useSearchHistory(maxItems: number = 10) {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('aman-search-history', []);

  const addSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, maxItems);
    });
  }, [setSearchHistory, maxItems]);

  const removeSearch = useCallback((query: string) => {
    setSearchHistory((prev) => prev.filter((q) => q !== query));
  }, [setSearchHistory]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  return {
    searchHistory,
    addSearch,
    removeSearch,
    clearHistory,
  };
}
