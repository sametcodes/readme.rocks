import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/view/document";
import * as Icons from "@/components/icons";
import { ViewComponent } from "@/components/view/types";

export const getReputation: ViewComponent = (result, platform) => {
  return (
    <Document width={280} height={120}>
      <DocumentTitle>Stackoverflow</DocumentTitle>
      <List>
        <ListItem
          icon={<Icons.IssueIcon />}
          text="Reputation"
          value={result.reputation}
          url={`https://stackoverflow.com/users/${result.user_id}`}
        />
        <ListItem
          icon={<Icons.IssueIcon />}
          text="Total Answered Question"
          value={result.reputation}
          url={`https://stackoverflow.com/users/${result.user_id}`}
        />
      </List>
    </Document>
  );
};
