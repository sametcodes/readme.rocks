export const Style: React.FC = () => {
  return (
    <defs>
      <style>{`
            text{ font-family: 'Open Sans', 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif; }
            text.title{ fill: #32373e; font-size: 22px; }
            text.subtitle{ fill: #9c9c9c; font-size: 16px; }
            .dsvgui-container{ fill: #fbfbfb; }
            stop[offset='0']{ stop-color: #fbfbfb; }
            stop[offset='1']{ stop-color: #fbfbfb; }
            .border{ stroke: #ddd; }
            #dsvguibranding { fill: #bbbbbb; }
            .divider{ stroke: #dddddd; }
            @media (prefers-color-scheme: dark) {
              .dsvgui-container { fill: #32373e }
              stop[offset='0']{ stop-color: #32373e; }
              stop[offset='1']{ stop-color: #32373e; }
              text { fill: #eeeeee }
              .icon{ fill: #dddddd; stroke: #dddddd; }
              text.title{ fill: #fff; }
              text.subtitle{ fill: #9c9c9c; }
              .border{ stroke: #555; }
              #dsvguibranding { fill: #666666; }
              .divider{ stroke: #555555; }
            }
        `}</style>
    </defs>
  );
};
