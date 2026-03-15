import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ITweet } from "../types/types";

const serverUrl = "http://localhost:3000"; // Replace with your server URL

export const useSocketTweets = (initialTweets: ITweet[] = []) => {
  const [tweets, setTweets] = useState<ITweet[]>(initialTweets);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialTweets = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/tweets`);
        if (!response.ok) {
          throw new Error("Failed to fetch initial tweets");
        }
        const data = await response.json();
        setTweets(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialTweets();

    const socket = io(serverUrl);

    socket.on("connect", () => {
      console.log("Connected to the socket server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconneted from socket server");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.log("socket connection error", err);
      setError("connection error")
    });

    socket.on("new-tweet", (newTweet) => {
      console.log("newTweet Detected", newTweet);
      setTweets(prevTweets => [newTweet, ...prevTweets]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new-tweet");
      socket.disconnect();
    };
  }, []);

  return {tweets, isConnected, error, loading}
};
