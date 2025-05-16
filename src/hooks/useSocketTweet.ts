import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { ITweet } from '../types/types';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Update to your server port

export const useSocketTweets = (initialTweets = []) => {
  const [tweets, setTweets] = useState<ITweet[]>(initialTweets);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<any>(null);
  
  // Function to fetch tweets from the API
  const fetchTweets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SOCKET_SERVER_URL}/api/tweets`);
      if (!response.ok) {
        console.log('Error fetching tweets:', response.statusText);
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      setTweets(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error refreshing tweets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to refresh tweets - can be called by components
  const refreshTweets = useCallback(async () => {
    await fetchTweets();
    
    // Optionally emit an event to the server to refresh connection or notify about refresh
    if (socket && isConnected) {
      socket.emit('refresh-request');
    }
  }, [fetchTweets, socket, isConnected]);
  
  useEffect(() => {
    // Initial fetch of tweets from database
    fetchTweets();
    
    // Set up socket connection
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);
    
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);
    });
    
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });
    
    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Connection error');
    });
    
    // Listen for new tweets
    socketInstance.on('new-tweet', (newTweet) => {
      console.log('New tweet received:', newTweet);
      setTweets(prevTweets => [newTweet, ...prevTweets]);
    });
    
    // Cleanup function
    return () => {
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('new-tweet');
      socketInstance.disconnect();
    };
  }, [fetchTweets]);
  
  return { tweets, isConnected, error, loading, refreshTweets };
};