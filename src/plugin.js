import { jabra } from "./jabra";
import { FlexPlugin } from "flex-plugin";
import React from "react";

import CallControl from "./components/CallControl";
import DeviceIndicator from "./components/DeviceIndicator";
import { initialize, loadDevices, setCallState, store } from "./store";
import { handleReservation } from "./utils/handleReservation";

export class Plugin extends FlexPlugin {
  constructor() {
    super("JabraCallControl");
  }

  init(flex, manager) {
    this.flex = flex;
    this.manager = manager;

    store.dispatch(initialize());

    jabra.addEventListener("device attached", () => {
      store.dispatch(loadDevices());
    });

    jabra.addEventListener("device detached", () => {
      store.dispatch(loadDevices());
    });

    flex.MainHeader.Content.add(
      <DeviceIndicator key="jabra-device-indicator" store={store} />,
      {
        align: "end",
        sortOrder: -1
      }
    );

    flex.RootContainer.Content.add(
      <CallControl key="jabra-call-control" store={store} />
    );

    handleReservation({
      manager,
      handleCallIncoming: this.handleCallIncoming,
      handleCallAccepted: this.handleCallAccepted,
      handleCallCanceled: this.handleCallCanceled,
      handleCallCompleted: this.handleCallCompleted,
      handleCallRejected: this.handleCallRejected,
      handleCallRescinded: this.handleCallRescinded,
      handleCallTimeout: this.handleCallTimeout,
      handleCallWrapping: this.handleCallWrapping
    });
  }

  handleCallIncoming = reservation => {
    jabra.addEventListener("acceptcall", () => {
      this.flex.Actions.invokeAction("AcceptTask", {
        sid: reservation.sid
      });
      this.flex.Actions.invokeAction("SelectTask", {
        sid: reservation.sid
      });
    });

    store.dispatch(setCallState("incoming"));
  };

  handleCallAccepted = () => {
    const connection = this.manager.voiceClient.activeConnection();

    connection.on("mute", muted => {
      if (muted) jabra.mute();
      else jabra.unmute();
    });

    jabra.addEventListener("endcall", () => {
      connection.disconnect();
    });

    jabra.addEventListener("mute", () => {
      this.manager.voiceClient.activeConnection().mute(true);
    });

    jabra.addEventListener("unmute", () => {
      this.manager.voiceClient.activeConnection().mute(false);
    });

    store.dispatch(setCallState("accepted"));
  };

  handleCallWrapping = () => {
    store.dispatch(setCallState("wrapping"));
  };

  handleCallCanceled = () => {
    store.dispatch(setCallState("none"));
  };

  handleCallCompleted = () => {
    store.dispatch(setCallState("none"));
  };

  handleCallRejected = () => {
    store.dispatch(setCallState("none"));
  };

  handleCallRescinded = () => {
    store.dispatch(setCallState("none"));
  };

  handleCallTimeout = () => {
    store.dispatch(setCallState("none"));
  };
}
