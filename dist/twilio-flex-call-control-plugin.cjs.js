"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var flexPlugin=require("flex-plugin"),jabra=require("@gnaudio/jabra-browser-integration"),React=_interopDefault(require("react")),reactRedux=require("react-redux"),Flex=require("@twilio/flex-ui"),redux=require("redux"),thunk=_interopDefault(require("redux-thunk")),styled=require("styled-components"),styled__default=_interopDefault(styled),ReactTooltip=_interopDefault(require("react-tooltip"));function asyncGeneratorStep(e,t,n,r,a,c,i){try{var o=e[c](i),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(r,a)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function i(e){asyncGeneratorStep(c,r,a,i,o,"next",e)}function o(e){asyncGeneratorStep(c,r,a,i,o,"throw",e)}i(void 0)}))}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _taggedTemplateLiteral(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}var mapStateToProps=function(e){return{available:e.flex.worker.activity.available}},CallState=function(e){var t=e.available,n=e.callState;return e.activeDevice?t&&"incoming"===n?(jabra.ring(),null):t&&"accepted"===n?(jabra.offHook(),null):(jabra.onHook(),null):null},CallState$1=reactRedux.connect(mapStateToProps)(CallState),CallControl=reactRedux.connect((function(e){return{jabra:e.jabra}}))((function(e){var t=e.jabra;return React.createElement(CallState$1,{callState:t.call.state,activeDevice:t.devices.active})})),SET_CALL_STATE="SET_CALL_STATE",setCallState=function(e){return{type:SET_CALL_STATE,payload:e}},initialState={state:"none",reservation:null};function call(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case SET_CALL_STATE:return _objectSpread2({},e,{state:t.payload});default:return e}}var LOAD_DEVICES="LOAD_DEVICES",SET_ACTIVE_DEVICE="SET_ACTIVE_DEVICE",REMOVE_ACTIVE_DEVICE="REMOVE_ACTIVE_DEVICE",loadDevices=function(){return function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(t,n){var r,a,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n().jabra.devices.active,e.prev=1,e.next=4,jabra.getDevices();case 4:if(a=e.sent,r){e.next=12;break}return e.next=8,jabra.getActiveDevice();case 8:c=e.sent,t(setActiveDevice(c.deviceID)),e.next=13;break;case 12:a.some((function(e){return e.deviceID===r.deviceID}))||(a.length>0?t(setActiveDevice(a[0].deviceID)):t(removeActiveDevice()));case 13:t({type:LOAD_DEVICES,status:"success",payload:a}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),t({type:LOAD_DEVICES,status:"error",payload:e.t0});case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t,n){return e.apply(this,arguments)}}()},setActiveDevice=function(e){return function(){var t=_asyncToGenerator(regeneratorRuntime.mark((function t(n){var r,a,c,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,jabra.setActiveDeviceId(e);case 3:return t.next=5,jabra.getActiveDevice();case 5:if(r=t.sent,"https:"!==window.location.protocol){t.next=16;break}return a=Flex.Manager.getInstance(),t.next=10,jabra.getUserDeviceMediaExt({audio:!0});case 10:return c=t.sent,i=c.deviceInfo,t.next=14,a.voiceClient.audio.setInputDevice(i.browserAudioInputId);case 14:return t.next=16,a.voiceClient.audio.speakerDevices.set(i.browserAudioOutputId);case 16:n({type:SET_ACTIVE_DEVICE,status:"success",payload:r}),t.next=22;break;case 19:t.prev=19,t.t0=t.catch(0),n({type:SET_ACTIVE_DEVICE,status:"error",payload:t.t0});case 22:case"end":return t.stop()}}),t,null,[[0,19]])})));return function(e){return t.apply(this,arguments)}}()},removeActiveDevice=function(){return{type:REMOVE_ACTIVE_DEVICE}},initialState$1={items:[],active:null};function devices(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState$1,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case LOAD_DEVICES:if("success"===t.status)return _objectSpread2({},e,{items:t.payload});break;case SET_ACTIVE_DEVICE:if("success"===t.status)return _objectSpread2({},e,{active:t.payload});break;case REMOVE_ACTIVE_DEVICE:return _objectSpread2({},e,{active:null});default:return e}}var INITIALIZE_REQUEST="INITIALIZE_REQUEST",INITIALIZE_FAILURE="INITIALIZE_FAILURE",INITIALIZE_SUCCESS="INITIALIZE_SUCCESS",initialize=function(){return function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:INITIALIZE_REQUEST}),e.prev=1,e.next=4,jabra.init();case 4:return e.next=6,t(loadDevices());case 6:t({type:INITIALIZE_SUCCESS}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t({type:INITIALIZE_FAILURE,payload:e.t0});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()},initialState$2={isInitialized:!1,isInitializing:!1};function sdk(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState$2,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case INITIALIZE_REQUEST:return _objectSpread2({},e,{isInitializing:!0});case INITIALIZE_SUCCESS:return _objectSpread2({},e,{isInitialized:!0,isInitializing:!1});case INITIALIZE_FAILURE:return _objectSpread2({},e,{isInitializing:!1,initializationError:t.payload});default:return e}}var jabraReducer=redux.combineReducers({sdk:sdk,call:call,devices:devices}),store=redux.createStore(redux.combineReducers({jabra:jabraReducer,flex:Flex.FlexReducer}),redux.compose(redux.applyMiddleware(thunk),Flex.applyFlexMiddleware()));function _templateObject2(){var e=_taggedTemplateLiteral(["\n  margin-right: 1rem;\n"]);return _templateObject2=function(){return e},e}function _templateObject(){var e=_taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  user-select: none;\n\n  &:not(:first-child) {\n    margin-top: 0.5rem;\n  }\n"]);return _templateObject=function(){return e},e}var Device=styled__default.label(_templateObject()),Input=styled__default.input(_templateObject2()),DeviceSelector=function(e){function t(){var e,n;_classCallCheck(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return _defineProperty(_assertThisInitialized(n=_possibleConstructorReturn(this,(e=_getPrototypeOf(t)).call.apply(e,[this].concat(a)))),"handleChange",(function(e){n.props.dispatch(setActiveDevice(e.target.value))})),n}return _inherits(t,React.Component),_createClass(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.devices,r=t.activeDevice;return r?React.createElement("div",null,_toConsumableArray(n).sort((function(e,t){return e.deviceName.localeCompare(t.deviceName)})).map((function(t){return React.createElement(Device,null,React.createElement(Input,{type:"radio",value:t.deviceID,name:"active_device",checked:t.deviceID===r.deviceID,onChange:e.handleChange}),t.deviceName)}))):null}}]),t}(),mapStateToProps$1=function(e){var t=e.jabra;return{devices:t.devices.items,activeDevice:t.devices.active}},DeviceSelector$1=reactRedux.connect(mapStateToProps$1)(DeviceSelector),Logo=function(e){return React.createElement("svg",_extends({},e,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 472.6 160.9"}),React.createElement("path",{fill:"#FFD100",d:"M143.8 75.7c-11 0-11 2.6-11 3.8v2.1c0 1.1 0 3.7 11 3.7s11-2.6 11-3.7v-2.1c-.1-1.2-.1-3.8-11-3.8zM210.8 81.5V64.7c0-1.1 0-3.7-11-3.7s-11 2.6-11 3.7v16.8c0 1.1 0 3.7 11 3.7s11-2.6 11-3.7zM283.9 85.3c11 0 11-2.6 11-3.7v-2.1c0-1.1 0-3.8-11-3.8s-11 2.6-11 3.8v2.1c0 1.1 0 3.7 11 3.7z"}),React.createElement("path",{fill:"#FFD100",d:"M462.6 0H10.1C4.5 0 0 4.5 0 10.1v140.8c0 5.6 4.5 10.1 10.1 10.1h452.5c5.6 0 10.1-4.5 10.1-10.1V10.1C472.6 4.5 468.1 0 462.6 0zM261 77.5c0-2.6 0-7.7 22.8-7.7 4.5 0 8.1.2 11 .5v-5.6c0-1.1 0-3.7-11-3.7-10.1 0-10.1 2.6-10.1 3.7 0 .8-.6 1.4-1.4 1.4h-9.1c-.8 0-1.4-.6-1.4-1.4v-1.9c0-2.6 0-7.7 22-7.7 22.8 0 22.8 5.1 22.8 7.7v20.7c0 2.6 0 7.7-22.8 7.7S261 86.1 261 83.5v-6zM70.4 119.9c0 .5-.4.8-.8.8h-3.4c-.5 0-.8-.4-.8-.8v-8.4c0-.5.4-.8.8-.8h3.4c.5 0 .8.4.8.8v8.4zm16.9-.1c0 .5-.4.9-.9.9h-3.9c-.5 0-.9-.4-.9-.9v-8.3c0-.5.4-.9.9-.9h3.9c.5 0 .9.4.9.9v8.3zm17 0c0 .5-.4.9-.9.9h-4.5c-.5 0-.9-.4-.9-.9v-8.2c0-.5.4-.9.9-.9h4.5c.5 0 .9.4.9.9v8.2zm6.7-36.3c0 2.6 0 7.7-22.8 7.7s-22.8-5.1-22.8-7.7V80c0-.8.6-1.4 1.4-1.4h9.1c.8 0 1.4.6 1.4 1.4v1.8c0 1.2.4 3.6 11 3.6 11 0 11-2.6 11-3.7V41.8c0-.8.6-1.4 1.4-1.4h9.1c.8 0 1.4.6 1.4 1.4l-.2 41.7zm10.3 36.2c0 .5-.4.9-.9.9h-5c-.5 0-.9-.4-.9-.9v-8.2c0-.5.4-.9.9-.9h5c.5 0 .9.4.9.9v8.2zm16.9 0c0 .5-.4 1-1 1h-5.6c-.5 0-1-.4-1-1v-8.1c0-.5.4-1 1-1h5.6c.5 0 1 .4 1 1v8.1zm-17.3-36.2v-6c0-2.6 0-7.7 22.8-7.7 4.5 0 8.1.2 11 .5v-5.6c0-1.1 0-3.7-11-3.7-10.2 0-10.2 2.6-10.2 3.7 0 .8-.6 1.4-1.4 1.4H123c-.8 0-1.4-.6-1.4-1.4v-1.9c0-2.6 0-7.7 22-7.7 22.8 0 22.8 5.1 22.8 7.7v20.7c0 2.6 0 7.7-22.8 7.7-22.7 0-22.7-5.1-22.7-7.7zm34.3 36.2c0 .6-.5 1-1 1h-6.1c-.6 0-1-.5-1-1v-8c0-.6.5-1 1-1h6.1c.6 0 1 .5 1 1v8zm17-.1c0 .6-.5 1.1-1.1 1.1h-6.7c-.6 0-1.1-.5-1.1-1.1v-7.9c0-.6.5-1.1 1.1-1.1h6.7c.6 0 1.1.5 1.1 1.1v7.9zm4.8-36.2V41.7c0-.8.6-1.4 1.4-1.4h9.1c.8 0 1.4.6 1.4 1.4v13.8c2.9-.3 6.5-.5 11-.5 22.8 0 22.8 5.1 22.8 7.7v20.7c0 2.6 0 7.7-22.8 7.7-22.9.1-22.9-5.1-22.9-7.7zm12.1 36.2c0 .6-.5 1.1-1.1 1.1h-7.2c-.6 0-1.1-.5-1.1-1.1v-7.9c0-.6.5-1.1 1.1-1.1h7.2c.6 0 1.1.5 1.1 1.1v7.9zm17-.1c0 .6-.5 1.1-1.1 1.1h-7.8c-.6 0-1.1-.5-1.1-1.1v-7.8c0-.6.5-1.1 1.1-1.1h7.8c.6 0 1.1.5 1.1 1.1v7.8zm17 0c0 .7-.5 1.2-1.2 1.2h-8.3c-.7 0-1.2-.5-1.2-1.2v-7.7c0-.7.5-1.2 1.2-1.2h8.3c.7 0 1.2.5 1.2 1.2v7.7zm17 0c0 .7-.5 1.2-1.2 1.2H230c-.7 0-1.2-.5-1.2-1.2v-7.6c0-.7.5-1.2 1.2-1.2h8.8c.7 0 1.2.5 1.2 1.2v7.6zm4.8-30.5c0 .8-.6 1.4-1.4 1.4h-9.1c-.8 0-1.4-.6-1.4-1.4V62.8c0-2.6 0-7.7 22.8-7.7.8 0 1.4.6 1.4 1.4v3.1c0 .8-.6 1.4-1.4 1.4-11 0-11 2.6-11 3.7V89zm121.5 29.5c0 1.2-1 2.2-2.2 2.2H247.3c-1.2 0-2.2-1-2.2-2.2v-5.6c0-1.2 1-2.2 2.2-2.2h116.9c1.2 0 2.2 1 2.2 2.2v5.6zm.1-46.4c0 1.6-1.3 2.9-2.9 2.9H349c-9.9 0-17.9-8.3-17.4-18.3.4-9.3 8.3-16.6 17.7-16.6h14.3c1.6 0 2.9 1.3 2.9 3 0 1.6-1.4 2.9-3 2.9H349c-6.2 0-11.3 4.9-11.6 11-.4 6.7 5.1 12.3 11.8 12.3h10.7c.4 0 .7-.3.7-.7v-7.3c0-.4-.3-.7-.7-.7h-5.1c-1.6 0-2.9-1.3-2.9-3 0-1.6 1.4-2.9 3-2.9h8.6c1.6 0 2.9 1.3 2.9 2.9v14.5zm40.6-.1c0 1-.5 2.1-1.4 2.6-.5.3-1 .4-1.5.4-.8 0-1.5-.3-2.1-.9L379 51c-.3-.3-.9-.1-.9.4V72c0 1.6-1.3 3-2.9 3-1.6 0-3-1.3-3-2.9v-29c0-1 .5-2 1.4-2.5 1.2-.7 2.7-.5 3.6.4l23.2 23.2c.3.3.9.1.9-.4V43.1c0-1.6 1.3-3 2.8-3 1.6 0 3 1.3 3 2.9v29z"}),React.createElement("path",{fill:"#212721",d:"M255.9 61c.8 0 1.4-.6 1.4-1.4v-3.1c0-.8-.6-1.4-1.4-1.4-22.8 0-22.8 5.1-22.8 7.7V89c0 .8.6 1.4 1.4 1.4h9.1c.8 0 1.4-.6 1.4-1.4V64.7c-.1-1.1-.1-3.7 10.9-3.7zM166.6 83.5V62.8c0-2.6 0-7.7-22.8-7.7-22 0-22 5.1-22 7.7v1.9c0 .8.6 1.4 1.4 1.4h9.1c.8 0 1.4-.6 1.4-1.4 0-1.1 0-3.7 10.2-3.7 11 0 11 2.6 11 3.7v5.6c-2.9-.3-6.5-.5-11-.5-22.8 0-22.8 5.1-22.8 7.7v6c0 2.6 0 7.7 22.8 7.7 22.7 0 22.7-5.1 22.7-7.7zm-11.9-2c0 1.1 0 3.7-11 3.7s-11-2.6-11-3.7v-2.1c0-1.1 0-3.8 11-3.8s11 2.6 11 3.8v2.1zM222.6 83.4V62.8c0-2.6 0-7.7-22.8-7.7-4.5 0-8.1.2-11 .5V41.7c0-.8-.6-1.4-1.4-1.4h-9.1c-.8 0-1.4.6-1.4 1.4v41.7c0 2.6 0 7.7 22.8 7.7 22.9.1 22.9-5.1 22.9-7.7zm-33.7-1.9V64.7c0-1.1 0-3.7 11-3.7s11 2.6 11 3.7v16.8c0 1.1 0 3.7-11 3.7s-11-2.6-11-3.7zM283.9 91.2c22.8 0 22.8-5.1 22.8-7.7V62.8c0-2.6 0-7.7-22.8-7.7-22 0-22 5.1-22 7.7v1.9c0 .8.6 1.4 1.4 1.4h9.1c.8 0 1.4-.6 1.4-1.4 0-1.1 0-3.7 10.1-3.7 11 0 11 2.6 11 3.7v5.6c-2.9-.3-6.5-.5-11-.5-22.8 0-22.8 5.1-22.8 7.7v6c-.1 2.6-.1 7.7 22.8 7.7zm-11-11.8c0-1.1 0-3.8 11-3.8s11 2.6 11 3.8v2.1c0 1.1 0 3.7-11 3.7s-11-2.6-11-3.7v-2.1zM109.5 40.4h-9.1c-.8 0-1.4.6-1.4 1.4v39.8c0 1.1 0 3.7-11 3.7-10.5 0-10.9-2.4-11-3.6v-1.8c0-.8-.6-1.4-1.4-1.4h-9.1c-.8 0-1.4.6-1.4 1.4v3.5c0 2.6 0 7.7 22.8 7.7s22.8-5.1 22.8-7.7V41.7c.3-.7-.4-1.3-1.2-1.3zM69.5 110.6h-3.4c-.5 0-.8.4-.8.8v8.4c0 .5.4.8.8.8h3.4c.5 0 .8-.4.8-.8v-8.4c.1-.4-.3-.8-.8-.8zM86.5 110.6h-3.9c-.5 0-.9.4-.9.9v8.3c0 .5.4.9.9.9h3.9c.5 0 .9-.4.9-.9v-8.3c-.1-.5-.5-.9-.9-.9zM103.4 110.6h-4.5c-.5 0-.9.4-.9.9v8.2c0 .5.4.9.9.9h4.5c.5 0 .9-.4.9-.9v-8.2c0-.5-.4-.9-.9-.9zM120.3 110.6h-5c-.5 0-.9.4-.9.9v8.2c0 .5.4.9.9.9h5c.5 0 .9-.4.9-.9v-8.2c.1-.5-.4-.9-.9-.9zM137.3 110.6h-5.6c-.5 0-1 .4-1 1v8.1c0 .5.4 1 1 1h5.6c.5 0 1-.4 1-1v-8.1c-.1-.5-.5-1-1-1zM154.2 110.6h-6.1c-.6 0-1 .5-1 1v8c0 .6.5 1 1 1h6.1c.6 0 1-.5 1-1v-8c0-.5-.5-1-1-1zM171.1 110.6h-6.7c-.6 0-1.1.5-1.1 1.1v7.9c0 .6.5 1.1 1.1 1.1h6.7c.6 0 1.1-.5 1.1-1.1v-7.9c0-.6-.5-1.1-1.1-1.1zM188 110.6h-7.2c-.6 0-1.1.5-1.1 1.1v7.9c0 .6.5 1.1 1.1 1.1h7.2c.6 0 1.1-.5 1.1-1.1v-7.9c0-.6-.4-1.1-1.1-1.1zM205 110.6h-7.8c-.6 0-1.1.5-1.1 1.1v7.8c0 .6.5 1.1 1.1 1.1h7.8c.6 0 1.1-.5 1.1-1.1v-7.8c0-.6-.5-1.1-1.1-1.1zM221.9 110.6h-8.3c-.7 0-1.2.5-1.2 1.2v7.7c0 .7.5 1.2 1.2 1.2h8.3c.7 0 1.2-.5 1.2-1.2v-7.7c0-.6-.5-1.2-1.2-1.2zM238.8 110.6H230c-.7 0-1.2.5-1.2 1.2v7.6c0 .7.5 1.2 1.2 1.2h8.8c.7 0 1.2-.5 1.2-1.2v-7.6c.1-.6-.5-1.2-1.2-1.2zM364.2 110.6H247.3c-1.2 0-2.2 1-2.2 2.2v5.6c0 1.2 1 2.2 2.2 2.2h116.9c1.2 0 2.2-1 2.2-2.2v-5.6c0-1.2-1-2.2-2.2-2.2zM404.2 40.1c-1.6 0-2.8 1.4-2.8 3v20.6c0 .5-.6.7-.9.4L377.2 41c-.9-.9-2.4-1.1-3.6-.4-.9.5-1.4 1.5-1.4 2.5v29c0 1.6 1.3 2.9 3 2.9 1.6 0 2.9-1.4 2.9-3V51.4c0-.5.6-.7.9-.4l23.2 23.2c.6.6 1.3.9 2.1.9.5 0 1-.1 1.5-.4.9-.5 1.4-1.5 1.4-2.6V43c-.1-1.6-1.4-2.9-3-2.9zM363.5 54.7h-8.6c-1.6 0-3 1.3-3 2.9 0 1.6 1.3 3 2.9 3h5.1c.4 0 .7.3.7.7v7.3c0 .4-.3.7-.7.7h-10.7c-6.8 0-12.2-5.5-11.8-12.3.3-6.1 5.4-11 11.6-11h14.4c1.6 0 3-1.3 3-2.9 0-1.6-1.3-3-2.9-3h-14.3c-9.3 0-17.2 7.3-17.7 16.6-.5 10 7.5 18.3 17.4 18.3h14.5c1.6 0 2.9-1.3 2.9-2.9V57.6c.2-1.6-1.1-2.9-2.8-2.9z"}))};function _templateObject5(){var e=_taggedTemplateLiteral(["\n  text-align: center;\n"]);return _templateObject5=function(){return e},e}function _templateObject4(){var e=_taggedTemplateLiteral(["\n  max-width: 16rem !important;\n  pointer-events: auto !important;\n  padding: 1rem !important;\n\n  &:hover {\n    visibility: visible !important;\n    opacity: 1 !important;\n  }\n"]);return _templateObject4=function(){return e},e}function _templateObject3(){var e=_taggedTemplateLiteral(["\n      filter: saturate(0%);\n    "]);return _templateObject3=function(){return e},e}function _templateObject2$1(){var e=_taggedTemplateLiteral(["\n  height: 16px;\n\n  ","\n"]);return _templateObject2$1=function(){return e},e}function _templateObject$1(){var e=_taggedTemplateLiteral(["\n  padding: 6px;\n  display: flex;\n  align-items: center;\n"]);return _templateObject$1=function(){return e},e}var Base=styled__default.div(_templateObject$1()),Logo$1=styled__default(Logo)(_templateObject2$1(),(function(e){return e.invalid&&styled.css(_templateObject3())})),Tooltip=styled__default(ReactTooltip).attrs({delayHide:100,effect:"solid",place:"bottom"})(_templateObject4()),Error=styled__default.div(_templateObject5()),Device$1=function(e){var t,n=e.store,r=e.devices,a=e.activeDevice,c=e.isInitialized;return e.isInitializing?t="Browser SDK initializing...":c?(r.length<1||!a)&&(t="Couldn't find any Jabra devices"):t="Browser SDK installation incomplete. Please (re)install",React.createElement(React.Fragment,null,React.createElement(Base,null,React.createElement(Logo$1,{"data-tip":!0,"data-for":"jabra-device",invalid:t})),React.createElement(Tooltip,{id:"jabra-device"},t?React.createElement(Error,null,t):React.createElement(DeviceSelector$1,{store:n})))},mapStateToProps$2=function(e){var t,n=e.jabra;return _defineProperty(t={isInitialized:n.sdk.isInitialized,isInitializing:n.sdk.isInitializing,devices:n.devices.items},"devices",n.devices.items),_defineProperty(t,"activeDevice",n.devices.active),t},DeviceIndicator=reactRedux.connect(mapStateToProps$2)(Device$1),Plugin=function(e){function t(){var e;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,"JabraCallControl"))),"handleReservation",(function(t){"voice"===t.task.taskChannelUniqueName&&(["pending"].includes(t.status)&&e.handleCallIncoming(t),["wrapping"].includes(t.status)&&e.handleCallWrapping(t),t.on("accepted",e.handleCallAccepted),t.on("wrapup",e.handleCallWrapping),t.on("completed",e.handleCallCompleted),t.on("canceled",e.handleCallCanceled),t.on("rescinded",e.handleCallRescinded))})),_defineProperty(_assertThisInitialized(e),"handleCallIncoming",(function(t){jabra.addEventListener("acceptcall",(function(){e.flex.Actions.invokeAction("AcceptTask",{sid:t.sid}),e.flex.Actions.invokeAction("SelectTask",{sid:t.sid})})),store.dispatch(setCallState("incoming"))})),_defineProperty(_assertThisInitialized(e),"handleCallAccepted",(function(t){var n=e.manager.voiceClient.activeConnection();n.on("mute",(function(e){e?jabra.mute():jabra.unmute()})),jabra.addEventListener("endcall",(function(){n.disconnect()})),jabra.addEventListener("mute",(function(){e.manager.voiceClient.activeConnection().mute(!0)})),jabra.addEventListener("unmute",(function(){e.manager.voiceClient.activeConnection().mute(!1)})),store.dispatch(setCallState("accepted"))})),_defineProperty(_assertThisInitialized(e),"handleCallWrapping",(function(e){store.dispatch(setCallState("wrapping"))})),_defineProperty(_assertThisInitialized(e),"handleCallCompleted",(function(e){store.dispatch(setCallState("none"))})),_defineProperty(_assertThisInitialized(e),"handleCallCanceled",(function(e){store.dispatch(setCallState("none"))})),_defineProperty(_assertThisInitialized(e),"handleCallRescinded",(function(e){store.dispatch(setCallState("none"))})),e}return _inherits(t,flexPlugin.FlexPlugin),_createClass(t,[{key:"init",value:function(e,t){this.flex=e,this.manager=t,store.dispatch(initialize()),jabra.addEventListener("device attached",(function(){store.dispatch(loadDevices())})),jabra.addEventListener("device detached",(function(){store.dispatch(loadDevices())})),t.workerClient.reservations.forEach(this.handleReservation),t.workerClient.on("reservationCreated",this.handleReservation),e.MainHeader.Content.add(React.createElement(DeviceIndicator,{key:"jabra-device-indicator",store:store}),{align:"end",sortOrder:-1}),e.RootContainer.Content.add(React.createElement(CallControl,{key:"jabra-call-control",store:store}))}}]),t}();exports.Plugin=Plugin,exports.store=store;
//# sourceMappingURL=twilio-flex-call-control-plugin.cjs.js.map
