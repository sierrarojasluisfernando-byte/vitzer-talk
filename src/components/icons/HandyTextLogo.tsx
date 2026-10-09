import React from "react";

// Provisional Vitzer Talk wordmark; replace with the final logo artwork.
const WORDMARK = "Vitzer Talk";

const HandyTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 930 328"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={WORDMARK}
    >
      <defs>
        <linearGradient id="vitzer-talk-wordmark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <text
        x="465"
        y="170"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="150"
        fontWeight="700"
        letterSpacing="-4"
        fill="url(#vitzer-talk-wordmark)"
      >
        {WORDMARK}
      </text>
    </svg>
  );
};

export default HandyTextLogo;
