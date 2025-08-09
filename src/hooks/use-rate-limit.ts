"use client";

import { useState, useEffect, useCallback } from 'react';

const ANONYMOUS_SEARCH_LIMIT = 5;
const STORAGE_KEY = 'xyvea_anonymous_searches';

interface RateLimitState {
  searchesMade: number;
  lastSearchDate: string | null;
}

export const useRateLimit = () => {
  const [canSearch, setCanSearch] = useState(true);
  const [searchesLeft, setSearchesLeft] = useState(ANONYMOUS_SEARCH_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const { searchesMade, lastSearchDate }: RateLimitState = JSON.parse(storedData);
        const today = getTodayDateString();
        
        if (lastSearchDate === today) {
          const remaining = ANONYMOUS_SEARCH_LIMIT - searchesMade;
          setSearchesLeft(remaining);
          if (remaining <= 0) {
            setCanSearch(false);
            setIsLimitReached(true);
          }
        } else {
          // It's a new day, reset the limit
          localStorage.removeItem(STORAGE_KEY);
          setSearchesLeft(ANONYMOUS_SEARCH_LIMIT);
        }
      } else {
        setSearchesLeft(ANONYMOUS_SEARCH_LIMIT);
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
      // Degrade gracefully if localStorage is not available
      setCanSearch(true);
      setSearchesLeft(ANONYMOUS_SEARCH_LIMIT);
    }
  }, []);

  const consumeSearch = useCallback(() => {
    try {
      const today = getTodayDateString();
      const storedData = localStorage.getItem(STORAGE_KEY);
      let searchesMade = 0;
      
      if (storedData) {
          const parsedData: RateLimitState = JSON.parse(storedData);
          if(parsedData.lastSearchDate === today) {
              searchesMade = parsedData.searchesMade;
          }
      }
      
      const newSearchesMade = searchesMade + 1;
      
      const newRateLimitState: RateLimitState = {
        searchesMade: newSearchesMade,
        lastSearchDate: today,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRateLimitState));
      
      const remaining = ANONYMOUS_SEARCH_LIMIT - newSearchesMade;
      setSearchesLeft(remaining);

      if (remaining <= 0) {
        setCanSearch(false);
        setIsLimitReached(true);
      }
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  }, []);

  return { canSearch, searchesLeft, isLimitReached, consumeSearch };
};
