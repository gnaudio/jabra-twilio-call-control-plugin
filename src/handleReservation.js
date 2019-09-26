const defaultOptions = {
  manager: null,
  handleAllCalls: () => {},
  handleCallIncoming: () => {},
  handleCallAccepted: () => {},
  handleCallCanceled: () => {},
  handleCallCompleted: () => {},
  handleCallRejected: () => {},
  handleCallRescinded: () => {},
  handleCallTimeout: () => {},
  handleCallWrapping: () => {}
};

export function handleReservation(options) {
  options = Object.assign({}, defaultOptions, options);

  function handle(reservation) {
    if (reservation.task.taskChannelUniqueName !== "voice") return;

    if (reservation.status === "pending")
      options.handleCallIncoming(reservation);

    if (reservation.status === "wrapping")
      options.handleCallWrapping(reservation);

    reservation.on("accepted", options.handleCallAccepted);
    reservation.on("canceled", options.handleCallCanceled);
    reservation.on("completed", options.handleCallCompleted);
    reservation.on("rejected", options.handleCallRejected);
    reservation.on("rescinded", options.handleCallRescinded);
    reservation.on("timeout", options.handleCallTimeout);
    reservation.on("wrapup", options.handleCallWrapping);

    options.handleAllCalls(reservation);
  }

  options.manager.workerClient.reservations.forEach(handle);
  options.manager.workerClient.on("reservationCreated", handle);
}
