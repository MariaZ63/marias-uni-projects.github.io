import { useState, useEffect } from "react";

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
