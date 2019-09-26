import React from "react";
import { jabra } from "../../jabra";
import { connect } from "react-redux";

// This component handles the side effects related to call state
const CallControl = ({ available, callState, activeDevice }) => {
  // opt out if no active jabra device
  if (!activeDevice) return null;

  // If the user is available, and call state is incoming, ring the jabra headset
  if (available && callState === "incoming") {
    jabra.ring();
    return null;
  }

  // If callState is accepted, take the jabra headset offHook
  if (callState === "accepted") {
    jabra.offHook();
    return null;
  }

  // If neither is true, put jabra headset onHook
  jabra.onHook();

  return null;
};

const mapStateToPropsFlex = ({ flex }) => ({
  available: flex.worker.activity.available
});

const mapStateToPropsJabra = ({ jabra }) => ({
  activeDevice: jabra.devices.active,
  callState: jabra.call.state
});

export default connect(mapStateToPropsJabra)(({ store, ...props }) =>
  React.createElement(connect(mapStateToPropsFlex)(CallControl), props)
);
