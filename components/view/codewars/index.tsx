import * as Icons from "@/components/icons";
import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/view/document";
import { ObjectEntries } from "@/utils";

export const getUser = (result: any, platform: any) => {
  const langs = ObjectEntries(result.ranks.languages).map(([key, value]) => ({
    lang: key,
    ...value,
  }));

  const langItems = langs.map((lang, index) => (
    <ListItem
      key={index}
      icon={<Icons.CodeIcon />}
      text={lang.lang as string}
      value={lang.score}
    />
  ));

  return (
    <Document width={210} height={200}>
      <DocumentTitle>Codewars</DocumentTitle>
      <List>
        <ListItem icon={<Icons.StarIcon />} text="Honor" value={result.honor} />
        <ListItem
          icon={<Icons.ScoreIcon />}
          text="Overall Score"
          value={result.ranks.overall.score}
        />
        {langItems}
      </List>
    </Document>
  );
};
