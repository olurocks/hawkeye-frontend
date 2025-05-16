import { createContext, ReactNode } from 'react';
import { useSocketTweets } from './useSocketTweet';
import { ITweet } from '../types/types';

interface TweetsContextType {
  tweets: ITweet[];
  isConnected: boolean;
  error: string | null;
  loading: boolean;
  refreshTweets: () => Promise<void>;
}

// Create the context with the correct type
export const TweetsContext = createContext<TweetsContextType | undefined>(undefined);

// Create a provider component
export const TweetsProvider = ({ children }: { children: ReactNode }) => {
  const { tweets, isConnected, error, loading, refreshTweets } = useSocketTweets([]);

  // Add any additional state or methods needed
  const contextValue = {
    tweets,
    isConnected,
    error,
    loading,
    refreshTweets
  };

  return (
    <TweetsContext.Provider value={contextValue}>
      {children}
    </TweetsContext.Provider>
  );
};