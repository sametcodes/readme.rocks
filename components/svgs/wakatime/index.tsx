import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/svgs/document";
import * as Icons from "@/components/icons";

export const getAllTimeSinceToday = (result: any, platform: any) => {
  return (
    <Document width={290} height={100}>
      <DocumentTitle>Wakatime</DocumentTitle>
      <List>
        <ListItem
          icon={<Icons.TimeIcon />}
          text="All time since today"
          value={result.text}
        />
      </List>
    </Document>
  );
};
