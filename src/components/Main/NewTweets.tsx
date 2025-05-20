import { useState, useEffect, useCallback } from "react";

// The NewTweetsNotification component displays a notification when new tweets are available
type NewTweetsNotificationProps = {
  count: number;
  onClick: () => void;
};

export const NewTweetsNotification = ({
  count,
  onClick,
}: NewTweetsNotificationProps) => {
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(() => {
    onClick(); // Use the onClick prop instead of the context directly
  }, [onClick]);

  useEffect(() => {
    if (count > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [count]);

  if (!visible || count <= 0) return null;

  return (
    <div
      className="flex justify-center w-full py-2"
      style={{ pointerEvents: "none" }}
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full shadow-md transition-all duration-200 hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-lg"
        style={{ pointerEvents: "auto" }}
      >
        {/* Arrow up icon using inline SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 5L5 12H9V19H15V12H19L12 5Z" fill="currentColor" />
        </svg>

        <span className="text-sm">
          {count} new tweet{count !== 1 ? "s" : ""}
        </span>
      </button>
    </div>
  );
};