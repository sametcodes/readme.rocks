import React from "react";

import { Text } from "..";

type IBranding = {
  x: number;
  y: number;
};

export const Branding: React.FC<IBranding> = ({ x, y }) => {
  return (
    <Text
      x={x}
      y={y}
      option={{ size: 8, weight: 500 }}
      id="dsvguibranding"
      className="text"
    >
      readme.rocks
    </Text>
  );
};
