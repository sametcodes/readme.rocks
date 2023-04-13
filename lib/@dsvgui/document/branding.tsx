type IBranding = {
  x: number;
  y: number;
};

export const Branding: React.FC<IBranding> = ({ x, y }) => {
  return (
    <text
      id="dsvguibranding"
      xmlSpace="preserve"
      fontSize={8}
      fontFamily="Manrope"
      fill="#cccccc"
      x={x}
      y={y}
    >
      <tspan>readme.rocks</tspan>
    </text>
  );
};
