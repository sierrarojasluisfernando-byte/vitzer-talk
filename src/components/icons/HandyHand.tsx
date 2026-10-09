import { Mic } from "lucide-react";

// Provisional Vitzer Talk glyph for the General section; replace with the final mark.
const HandyHand = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => <Mic width={width || 126} height={height || 135} />;

export default HandyHand;
