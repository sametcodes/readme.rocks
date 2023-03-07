import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/svgs/document";
import * as Icons from "@/components/icons";

export const getReputation = (result: any, platform: any) => {
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
