import { useState, useEffect, useCallback, useRef } from "react";
import { TweetData } from "../types/types";

// type MessageHandler = (data: any) => void;

export const useWebSocket = (url: string) => {
  const [isConnected, setIsconnected] = useState(false);
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null); //websocket reference
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    const socket = new WebSocket(url);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("websocket connected");
      setIsconnected(true);
      setError(null);
      reconnectAttemptsRef.current = 0;

      socket.send(JSON.stringify({ type: "getAccounts" }));
    };


    //delete in production or just edit error message (depends on the styling required)
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "error") {
        console.error("WebSocket Error:", data.message, data.details);
        // alert("Error setting up stream: " + data.details.title); // Handle UI feedback
      }
    };
    

    socket.onclose = () => {
      console.log("Websocket disconnected");
      setIsconnected(false);

      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current)
        );
        console.log(`Attempting to Reconect in ${delay / 1000} seconds ...`);

        setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connect();
        }, delay);
      } else {
        setError("Connection lost, Unable to connect to the server");
      }

      socket.onerror = (event) => {
        console.error("Websocket Error", event);
        setError("Error Connecting to Tweet Stream");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "accounts") {
            setAccounts(data.accounts);
          } else if (data.tweet) {
            setTweets((prevTeets) => [data, ...prevTeets].slice(0, 50));
          }
        } catch (error) {
          console.error("Error Parsing Message: ", error);
        }
      };
    };
  }, [url]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(()=>{
    connect();
    return ()=> disconnect()
  }, [connect, disconnect])


  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  return { isConnected, tweets, accounts, error, sendMessage };
};
