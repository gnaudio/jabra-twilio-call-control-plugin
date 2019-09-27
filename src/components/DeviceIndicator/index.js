import React from "react";
import { connect } from "react-redux";

import DeviceSelector from "../DeviceSelector";
import * as S from "./styles";

// This component represents the deviceIndicator shown in the main menu bar
const DeviceIndicator = ({
  store,
  devices,
  activeDevice,
  isInitialized,
  isInitializing
}) => {
  let invalid;

  if (isInitializing) {
    invalid = "Jabra Browser SDK initializing...";
  } else if (!isInitialized) {
    invalid = "Jabra Browser SDK installation incomplete. Please (re)install";
  } else if (devices.length < 1 || !activeDevice) {
    invalid = "Couldn't find any Jabra devices";
  }

  return (
    <React.Fragment>
      <S.Base>
        <S.Logo data-tip data-for="jabra-device" invalid={invalid} />
      </S.Base>
      <S.Tooltip id="jabra-device">
        {invalid ? (
          <S.Error>{invalid}</S.Error>
        ) : (
          <DeviceSelector store={store}></DeviceSelector>
        )}
      </S.Tooltip>
    </React.Fragment>
  );
};

const mapStateToProps = ({ jabra }) => ({
  isInitialized: jabra.sdk.isInitialized,
  isInitializing: jabra.sdk.isInitializing,
  devices: jabra.devices.items,
  devices: jabra.devices.items,
  activeDevice: jabra.devices.active
});

export default connect(mapStateToProps)(DeviceIndicator);
