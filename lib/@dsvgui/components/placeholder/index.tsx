import React from "react";

import { Document, getDocumentSize, Text } from "../../document";
import { DocumentMeta } from "../../document/type";
import { getTextWidth } from "../../utils";

export type IPlaceholder = {} & DocumentMeta;

export const documentPreferences = {
  minW: 1,
  minH: 1,
  maxW: 3,
  maxH: 3,
  default: {
    w: 1,
    h: 1,
  },
};

export const Placeholder: React.FC<IPlaceholder> = ({ document }) => {
  document = document || documentPreferences.default;
  const { height, width } = getDocumentSize(document);

  const textWidth = getTextWidth(`${document.w}x${document.h}`, {
    fontSize: 16,
    fontWeight: 500,
  });

  return (
    <Document w={width} h={height} padding={0} useBranding={false}>
      <Text x={(width - textWidth) / 2} y={height / 2} option="subtitle">
        {String(`${document.w}x${document.h}`)}
      </Text>
    </Document>
  );
};
