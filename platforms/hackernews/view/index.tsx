import { Metrics } from "@/lib/@dsvgui/components";
import { ViewComponent } from "@/platforms/types";
import { HackerNewsIcon } from "@/lib/@dsvgui/icons";

export const getUser: ViewComponent = (result, config) => {
  const { user } = result.data;

  return (
    <Metrics
      icon={HackerNewsIcon}
      data={[{ title: "Karma", value: user.karma }]}
    />
  );
};
