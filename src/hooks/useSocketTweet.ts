import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { ITweet } from "../types/types";

const SOCKET_SERVER_URL = "https://hawkeye-1ueo.onrender.com"; // Update to your server port

export const useSocketTweets = (initialTweets = []) => {
  const [tweets, setTweets] = useState<ITweet[]>(initialTweets);
  const [isConnected, setIsConnected] = useState(false);
  const [newTweetsQueue, setNewTweetsQueue] = useState<ITweet[]>([]);
  const [hasNewTweets, setHasNewTweets] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<any>(null);

  // Function to fetch tweets from the API
  const fetchTweets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SOCKET_SERVER_URL}/api/tweets`);
      if (!response.ok) {
        console.log("Error fetching tweets:", response.statusText);
        throw new Error("Failed to fetch tweets");
      }
      const data = await response.json();
      setTweets(data);
      setNewTweetsQueue([]); // Clear any queued tweets when we do a full refresh
      setHasNewTweets(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error("Error refreshing tweets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to show new tweets (merge queued tweets with existing)
  const showNewTweets = useCallback(() => {
    if (newTweetsQueue.length > 0) {
      setTweets((prevTweets) => [...newTweetsQueue, ...prevTweets]);
      setNewTweetsQueue([]);
      setHasNewTweets(false);

      // Scroll to top to see new tweets
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [newTweetsQueue]);

  // Function to refresh tweets - can be called by components
  const refreshTweets = useCallback(async () => {
    await fetchTweets();

    // Optionally emit an event to the server to refresh connection or notify about refresh
    if (socket && isConnected) {
      socket.emit("refresh-request");
    }
  }, [fetchTweets, socket, isConnected]);

  useEffect(() => {
    // Initial fetch of tweets from database
    fetchTweets();

    // Set up socket connection
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Connection error");
    });

    // Listen for new tweets
    socketInstance.on("new-tweets", (newTweets) => {
      console.log("New tweets received:", newTweets);
      setTweets((prevTweets) => [...newTweets, ...prevTweets]);
    });

    // Cleanup function
    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.off("new-tweet");
      socketInstance.disconnect();
    };
  }, [fetchTweets]);

  return {
    tweets,
    isConnected,
    error,
    loading,
    refreshTweets,
    hasNewTweets,
    newTweetsCount: newTweetsQueue.length,
    showNewTweets,
  };
};
