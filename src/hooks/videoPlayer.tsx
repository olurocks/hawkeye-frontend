import React, {useRef, useEffect} from "react";
import Hls from "hls.js";

export const VideoPlayer: React.FC<{
  videoUrl: string;
  previewUrl?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  videoUrl,
  previewUrl,
  autoPlay = false,
  controls = false,
  loop = false,
  muted = true,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const isHLS = videoUrl.toLowerCase().includes(".m3u8");

  // Track autoplay prop changes
  useEffect(() => {
    // Handle autoplay state changes
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [autoPlay]);

  useEffect(() => {
    // Setup HLS for m3u8 streams if the video element is available
    if (videoRef.current && isHLS) {
      // Check if HLS is supported
      if (Hls.isSupported()) {
        // Clean up any existing HLS instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        // Create new HLS instance
        hlsRef.current = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: 0, // Start with lowest quality for faster startup
          abrEwmaDefaultEstimate: 1000000, // Default bandwidth estimate
          enableWorker: true, // Enable web workers for better performance
        });

        hlsRef.current.loadSource(videoUrl);
        hlsRef.current.attachMedia(videoRef.current);

        // Handle playback when manifest is parsed
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            videoRef.current?.play().catch(e => console.log("Auto-play prevented:", e));
          }
        });

        // Error handling
        hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // Try to recover network error
                console.log("Network error, trying to recover");
                hlsRef.current?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("Media error, trying to recover");
                hlsRef.current?.recoverMediaError();
                break;
              default:
                // Fatal error, cannot recover
                hlsRef.current?.destroy();
                break;
            }
          }
        });
      }
      // Fallback for Safari which has native HLS support
      else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoUrl;
        if (autoPlay) {
          videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
        }
      }
    } else if (videoRef.current && !isHLS) {
      // For non-HLS videos, handle directly
      videoRef.current.src = videoUrl;
      if (autoPlay) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
      }
    }

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl, isHLS]); // Don't include autoPlay in dependencies to prevent recreation of HLS on hover

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={false} // Let our useEffect handle autoplay for both HLS and regular videos
      loop={loop}
      muted={muted}
      playsInline
      poster={previewUrl}
      preload="metadata"
      className={className}
      style={style}
    >
      {!isHLS && <source src={videoUrl} type="video/mp4" />}
      Your browser does not support video playback.
    </video>
  );
};