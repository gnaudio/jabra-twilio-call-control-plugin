import React from "react";
import { jabra } from "../../jabra";
import { connect } from "react-redux";

const CallControl = ({ available, callState, activeDevice }) => {
  if (!activeDevice) return null;

  if (available && callState === "incoming") {
    jabra.ring();
    return null;
  }

  if (callState === "accepted") {
    jabra.offHook();
    return null;
  }

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
