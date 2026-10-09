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
      <text
        x="465"
        y="170"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="150"
        fontWeight="700"
        letterSpacing="-4"
        className="logo-primary"
      >
        {WORDMARK}
      </text>
    </svg>
  );
};

export default HandyTextLogo;
