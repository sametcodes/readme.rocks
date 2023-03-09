import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/view/document";
import * as Icons from "@/components/icons";
import { ViewComponent } from "@/components/view/types";

export const getAllTimeSinceToday: ViewComponent = (result, platform) => {
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
