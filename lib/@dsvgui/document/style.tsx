export const Style: React.FC = () => {
  return (
    <defs>
      <style>{`
            .text{ fill: #32373e;}
            .text.subtitle{ fill: #5c5c5c; }

            .dsvgui-container{ fill: #fbfbfb; }
            stop[offset='0']{ stop-color: #fbfbfb; }
            stop[offset='1']{ stop-color: #fbfbfb; }
            .border{ stroke: #ddd; }
            #dsvguibranding { fill: #bbbbbb; }
            .divider{ stroke: #dddddd; }

            @media (prefers-color-scheme: dark) {
              .text{ fill: #eee; }
              .text.subtitle{ fill: #9c9c9c; }

              .dsvgui-container { fill: #32373e }
              stop[offset='0']{ stop-color: #32373e; }
              stop[offset='1']{ stop-color: #32373e; }
              .icon{ fill: #dddddd; stroke: #dddddd; }
              .border{ stroke: #555; }
              #dsvguibranding { fill: #666666; }
              .divider{ stroke: #555555; }
            }
        `}</style>
    </defs>
  );
};
