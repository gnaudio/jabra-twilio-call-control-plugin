import { jabra } from "./jabra";
import { FlexPlugin } from "flex-plugin";
import React from "react";

import CallControl from "./components/CallControl";
import DeviceIndicator from "./components/DeviceIndicator";
import { initialize, loadDevices, setCallState, store } from "./store";
import { handleReservation } from "./utils/handleReservation";

/**
 * This is the FlexPlugin, the plugin can be loaded into Twilio Flex, with the
 * loadPlugin function
 *
 * @export
 * @class Plugin
 * @extends {FlexPlugin}
 */
export class Plugin extends FlexPlugin {
  /**
   * Creates an instance of Plugin. And define the name of the plugin.
   * @memberof Plugin
   */
  constructor() {
    super("JabraCallControl");
  }

  /**
   * This is the init method, it's called by twilio flex, whenever the
   * application is loaded, this method is where we bootstrap the entire plugin.
   *
   * @param {*} flex
   * @param {*} manager
   * @memberof Plugin
   */
  init(flex, manager) {
    // Bind flex and manager, so it can be used outside the init method.
    this.flex = flex;
    this.manager = manager;

    // Start initializtion.
    store.dispatch(initialize());

    // When a device is attached or detached, load a list of connected jabra
    // devices.
    jabra.addEventListener("device attached", () => {
      store.dispatch(loadDevices());
    });

    jabra.addEventListener("device detached", () => {
      store.dispatch(loadDevices());
    });

    // Add the device indicator, to the Twilio Flex main header, and supply or
    // custom redux store.
    flex.MainHeader.Content.add(
      <DeviceIndicator key="jabra-device-indicator" store={store} />,
      {
        align: "end",
        sortOrder: -1
      }
    );

    // To benefit from react-redux, and React's ability to only re-render when a
    // prop changes, we will handle the effects of our state changes using a
    // react component
    flex.RootContainer.Content.add(
      <CallControl key="jabra-call-control" store={store} />
    );

    // A reservation in flex is what represents a call, to be notified when a
    // reservation changes state, this helper function allows up to specify
    // callback functions to when the reservation is in a specific state
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

  // Handle when the reservation is an incoming call
  handleCallIncoming = reservation => {
    // Listen to when the acceptcall button is pressed on the jabra device
    jabra.addEventListener("acceptcall", () => {
      // Using Twilio Flex actions, to accept and select the task, meaning
      // accepting the call, and changing view to in ongoing call
      this.flex.Actions.invokeAction("AcceptTask", {
        sid: reservation.sid
      });
      this.flex.Actions.invokeAction("SelectTask", {
        sid: reservation.sid
      });
    });

    // Update global state, with current call state, and current reservation
    store.dispatch(setCallState("incoming", reservation));
  };

  // Handle when the reservation is an accepted call
  handleCallAccepted = reservation => {
    // When a call is ongoing, there is a connection, we use this method to get
    // the current active connection
    const connection = this.manager.voiceClient.activeConnection();

    // When the connection is muted, mute the jabra headset
    connection.on("mute", muted => {
      if (muted) jabra.mute();
      else jabra.unmute();
    });

    // When endcall button is pressed on the headset, disconnect the connection
    jabra.addEventListener("endcall", () => {
      connection.disconnect();
    });

    // When mute button is pressed on the headset, mute connection
    jabra.addEventListener("mute", () => {
      connection.mute(true);
    });

    // When unmute button is pressed on the headset, unmute connection
    jabra.addEventListener("unmute", () => {
      connection.mute(false);
    });

    // Update global state, with current call state, and current reservation
    store.dispatch(setCallState("accepted", reservation));
  };

  handleCallWrapping = reservation => {
    // Update global state, with current call state, and current reservation
    store.dispatch(setCallState("wrapping", reservation));
  };

  // When a reservation is in either of the below state, we set the global call
  // state to none, to make the headset be onHook
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
