import { Metrics } from "@/lib/@dsvgui/components";
import { ViewComponent } from "@/platforms/types";
import { FaHackerNewsSquare } from "react-icons/fa";

export const getUser: ViewComponent = (result, config) => {
  const { user } = result.data;

  return (
    <Metrics
      icon={FaHackerNewsSquare}
      data={[{ title: "Karma", value: user.karma }]}
    />
  );
};
