import { useState, useEffect } from "react";

/**
 * Tooltip component for displaying additional information on hover.
 *
 * @param {Object} props - The props for the Tooltip component.
 * @param {string|ReactNode} props.content - The content to display inside the tooltip.
 * @param {Object} props.position - The position object for tooltip placement.
 * @param {number} props.position.x - The x-coordinate for tooltip placement.
 * @param {number} props.position.y - The y-coordinate for tooltip placement.
 * @param {boolean} props.isVisible - Flag to control the visibility of the tooltip.
 * 
 * @returns {JSX.Element} A tooltip element positioned based on the provided coordinates.
 */
const Tooltip = ({ content, position, isVisible }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (position) {
      setStyle({
        left: `${position.x + 10}px`,
        top: `${position.y - 28}px`,
        opacity: isVisible ? 1 : 0,
      });
    }
  }, [position, isVisible]);

  return (
    <div
      id="tooltip"
      style={{
        position: "absolute",
        backgroundColor: "white",
        width: "120px",
        padding: "5px",
        borderRadius: "3px",
        border: "1px solid #ccc",
        pointerEvents: "none",
        ...style,
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
