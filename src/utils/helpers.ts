import { useEffect } from "react";
import { iconComponents } from "../components/Main/IconComponents";
export const pageVariants = {
  initial: (direction: "forward" | "backward") => ({
    opacity: 0,
    x: direction === "forward" ? 50 : -50,
    scale: 0.98,
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  out: (direction: "forward" | "backward") => ({
    opacity: 0,
    x: direction === "forward" ? -50 : 50,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  }),
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export const useScrollToTop = (dependency?: any) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dependency]);
};

export const generateGridIcons = (count = 100) => {
  const icons = [];

  // Calculate grid dimensions based on count
  const gridSize = Math.ceil(Math.sqrt(count)) + 1; // Add extra space
  const cellSize = 100 / gridSize; // Cell size as percentage of page

  // Create a grid tracking system
  const occupiedCells = new Set();

  // Helper function to find an unoccupied cell
  const findUnoccupiedCell = () => {
    let attempts = 0;
    let cellX, cellY;

    do {
      cellX = Math.floor(Math.random() * gridSize);
      cellY = Math.floor(Math.random() * gridSize);
      attempts++;

      // Break out of loop if we've tried too many times
      if (attempts > gridSize * gridSize * 2) {
        return null;
      }
    } while (occupiedCells.has(`${cellX}-${cellY}`));

    occupiedCells.add(`${cellX}-${cellY}`);
    return { cellX, cellY };
  };

  for (let i = 0; i < count; i++) {
    // Select random icon
    const randomIconIndex = Math.floor(Math.random() * iconComponents.length);
    const randomIcon = iconComponents[randomIconIndex];

    // Find an unoccupied cell
    const cell = findUnoccupiedCell();
    if (!cell) {
      continue; // Skip if we couldn't find an empty cell
    }

    // Add some randomness within the cell (but not enough to cause overlap)
    const jitterX = Math.random() * 0.5 * cellSize;
    const jitterY = Math.random() * 0.5 * cellSize;

    // Calculate position based on cell and jitter
    const posX = cell.cellX * cellSize + jitterX;
    const posY = cell.cellY * cellSize + jitterY;

    // Ensure icons don't get too close to the edges
    const boundedPosX = Math.min(Math.max(posX, 5), 95 - cellSize / 2);
    const boundedPosY = Math.min(Math.max(posY, 5), 95 - cellSize / 2);

    const icon = {
      id: i,
      component: randomIcon.component,
      name: randomIcon.name,
      position: {
        top: `${boundedPosY}%`,
        left: `${boundedPosX}%`,
      },
      rotation: Math.floor(Math.random() * 360),
      size: Math.floor(Math.random() * 40) + 60, // Random size between 60-100px (reduced max size)
      opacity: Math.random() * 0.3 + 0.2, // Random opacity between 0.2-0.5
    };

    icons.push(icon);
  }

  return icons;
};