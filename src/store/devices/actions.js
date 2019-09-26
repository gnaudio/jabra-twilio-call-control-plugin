import * as Flex from "@twilio/flex-ui";
import { jabra } from "../../jabra";

export const LOAD_DEVICES = "LOAD_DEVICES";
export const SET_ACTIVE_DEVICE = "SET_ACTIVE_DEVICE";
export const REMOVE_ACTIVE_DEVICE = "REMOVE_ACTIVE_DEVICE";
export const SET_MMI_FOCUS = "SET_MMI_FOCUS";
export const REMOVE_MMI_FOCUS = "REMOVE_MMI_FOCUS";

export const loadDevices = () => async (dispatch, getState) => {
  const { active } = getState().jabra.devices;

  try {
    const devices = await jabra.getDevices();

    // If no active device set the first device as the active one
    if (!active) {
      const device = await jabra.getActiveDevice();

      await dispatch(setActiveDevice(device.deviceID));
    }
    // If the devices list no longer contains the active device
    else if (!devices.some(device => device.deviceID === active.deviceID)) {
      // If there is more devices available, set the first one as the new active
      // device
      if (devices.length > 0) {
        await dispatch(setActiveDevice(devices[0].deviceID));
      } else {
        dispatch(removeActiveDevice());
      }
    }

    dispatch({ type: LOAD_DEVICES, status: "success", payload: devices });
  } catch (error) {
    dispatch({ type: LOAD_DEVICES, status: "error", payload: error });
  }
};

export const setActiveDevice = id => async dispatch => {
  try {
    await jabra.setActiveDeviceId(id);

    const device = await jabra.getActiveDevice();

    // Set the active jabra device as the device used in Twilio Flex
    if (window.location.protocol === "https:") {
      const manager = Flex.Manager.getInstance();
      const { deviceInfo } = await jabra.getUserDeviceMediaExt({
        audio: true
      });

      await manager.voiceClient.audio.setInputDevice(
        deviceInfo.browserAudioInputId
      );

      await manager.voiceClient.audio.speakerDevices.set(
        deviceInfo.browserAudioOutputId
      );
    }

    if (device.deviceFeatures.includes(jabra.DeviceFeature.RemoteMMIv2)) {
      await dispatch(setMMIFocus());
    } else {
      dispatch(removeMMIFocus());
    }

    dispatch({ type: SET_ACTIVE_DEVICE, status: "success", payload: device });
  } catch (error) {
    dispatch({ type: SET_ACTIVE_DEVICE, status: "error", payload: error });
  }
};

export const removeActiveDevice = () => dispatch => {
  dispatch(removeMMIFocus());
  dispatch({ type: REMOVE_ACTIVE_DEVICE });
};

export const setMMIFocus = () => async dispatch => {
  try {
    await jabra.setMmiFocus(jabra.RemoteMmiType.MMI_TYPE_DOT3, true);
    await jabra.setMmiFocus(jabra.RemoteMmiType.MMI_TYPE_DOT4, true);

    dispatch({ type: SET_MMI_FOCUS, status: "success" });
  } catch (error) {
    dispatch({ type: SET_MMI_FOCUS, status: "error", payload: error });
  }
};

export const removeMMIFocus = () => ({ type: REMOVE_MMI_FOCUS });
