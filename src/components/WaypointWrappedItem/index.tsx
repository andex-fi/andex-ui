import * as React from "react";
import { Waypoint } from "react-waypoint";

import TokenItem, { TokenItemProps } from "../TokenItem";

const WaypointWrappedItem: React.FC<TokenItemProps> = (props) => {
  const [visible, setVisibleTo] = React.useState(false);

  const onPositionChange = ({ currentPosition }: Waypoint.CallbackArgs) => {
    setVisibleTo(currentPosition === "inside");
  };

  return (
    <Waypoint onPositionChange={onPositionChange}>
      <div
        className="popup-item-wrapper "
        style={{
          height: visible ? "" : 60,
          minHeight: visible ? "" : 60,
          borderCollapse: "collapse",
        }}
      >
        {visible && <TokenItem {...props} />}
      </div>
    </Waypoint>
  );
}

export default WaypointWrappedItem
