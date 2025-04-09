import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface DataFetchingOptions {
  /**
   * Enable/disable automatic fetching (set to false to manually trigger fetches)
   * @default true
   */
  enabled?: boolean;

  /**
   * Initial data to use before the first fetch
   */
  initialData?: any;

  /**
   * Duration in milliseconds that data should be cached
   * @default 60000 (1 minute)
   */
  cacheDuration?: number;

  /**
   * Custom key for cache identification
   */
  cacheKey?: string;

  /**
   * Number of retry attempts for failed requests
   * @default 0
   */
  retries?: number;

  /**
   * Delay in milliseconds between retry attempts (can be a number or a function)
   * @default 1000
   */
  retryDelay?: number | ((attempt: number) => number);

  /**
   * Headers to include in the fetch request
   */
  headers?: HeadersInit;

  /**
   * Callback to execute on successful fetch
   */
  onSuccess?: (data: any) => void;

  /**
   * Callback to execute on fetch error
   */
  onError?: (error: Error) => void;

  /**
   * Dependencies array that will trigger a refetch when changed
   */
  dependencies?: any[];
}

// In-memory cache store
const cache: Record<string, CacheItem<any>> = {};

/**
 * A hook for fetching data with advanced caching and retry capabilities
 */
export function useDataFetching<T = any>(
  url: string,
  options: DataFetchingOptions = {}
) {
  const {
    enabled = true,
    initialData = null,
    cacheDuration = 60000, // 1 minute default
    cacheKey = url,
    retries = 0,
    retryDelay = 1000,
    headers = {},
    onSuccess,
    onError,
    dependencies = [],
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  // Function to calculate retry delay
  const getRetryDelay = useCallback((attempt: number): number => {
    return typeof retryDelay === 'function' 
      ? retryDelay(attempt) 
      : retryDelay;
  }, [retryDelay]);

  // Function to check if cache is valid
  const isValidCache = useCallback((timestamp: number): boolean => {
    const now = Date.now();
    return now - timestamp < cacheDuration;
  }, [cacheDuration]);

  // Main fetch function
  const fetchData = useCallback(
    async (skipCache = false): Promise<T | null> => {
      // Abort previous fetch if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create a new AbortController
      abortControllerRef.current = new AbortController();

      // Check cache first if not skipping cache
      if (!skipCache && cache[cacheKey] && isValidCache(cache[cacheKey].timestamp)) {
        return cache[cacheKey].data;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          signal: abortControllerRef.current.signal,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Update cache
        cache[cacheKey] = {
          data: result,
          timestamp: Date.now(),
        };
        
        // Reset retry count on success
        setRetryCount(0);
        setLastFetchTime(Date.now());
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        // Don't handle aborted requests as errors
        if (err.name === 'AbortError') {
          return null;
        }
        
        const error = err instanceof Error ? err : new Error(String(err));
        
        // Retry logic
        if (retryCount < retries) {
          setRetryCount(rc => rc + 1);
          const delay = getRetryDelay(retryCount);
          
          // Schedule retry
          setTimeout(() => {
            fetchData(skipCache)
              .then(data => data && setData(data))
              .catch(e => {
                setError(e);
                if (onError) onError(e);
              });
          }, delay);
          
          return null;
        }
        
        // Max retries reached, set error
        setError(error);
        
        // Call error callback if provided
        if (onError) {
          onError(error);
        }
        
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [url, cacheKey, retryCount, retries, headers, getRetryDelay, isValidCache, onSuccess, onError]
  );

  // Execute the fetch
  const refetch = useCallback(async () => {
    const result = await fetchData(true);
    if (result !== null) {
      setData(result);
    }
    return result;
  }, [fetchData]);

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (!enabled) return;
    
    fetchData()
      .then(result => {
        if (result !== null) {
          setData(result);
        }
      })
      .catch(err => {
        setError(err);
        if (onError) onError(err);
      });
      
    return () => {
      // Cleanup: abort fetch on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, fetchData, onError, ...dependencies]);

  // Clear cache utility
  const clearCache = useCallback(() => {
    delete cache[cacheKey];
  }, [cacheKey]);

  return {
    data,
    isLoading,
    error,
    refetch,
    clearCache,
    retryCount,
    lastFetchTime,
  };
} 