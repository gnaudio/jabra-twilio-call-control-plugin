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

// A reservation in flex is what represents a call, to be notified when a
// reservation changes state, this helper function allows up to specify
// callback functions to when the reservation is in a specific state
export function handleReservation(options) {
  // Merge defaultOptions, with the specified options.
  options = Object.assign({}, defaultOptions, options);

  // The handler thats called initally for every existing reservervation, and
  // again when a new reservation is created
  function handle(reservation) {
    // If the reservation task isn't a voice task, opt out.
    if (reservation.task.taskChannelUniqueName !== "voice") return;

    // Fired when a Reservation is an incoming call
    if (reservation.status === "pending")
      options.handleCallIncoming(reservation);

    // Fired when a Reservation has been accepted for this Worker
    if (reservation.status === "wrapping")
      options.handleCallWrapping(reservation);

    // Fired when a Reservation has been accepted for this Worker
    reservation.on("accepted", options.handleCallAccepted);
    // Fired when a Reservation has been canceled for this Worker
    reservation.on("canceled", options.handleCallCanceled);
    // Fired when an accepted Reservation has been completed for this Worker
    reservation.on("completed", options.handleCallCompleted);
    // Fired when a Reservation has been rejected for this Worker
    reservation.on("rejected", options.handleCallRejected);
    // Fired when a Reservation has been rescinded for the Worker
    reservation.on("rescinded", options.handleCallRescinded);
    // Fired when a Reservation has been timed out for this Worker
    reservation.on("timeout", options.handleCallTimeout);
    // Fired when a Reservation has been wrapped up for the Worker
    reservation.on("wrapup", options.handleCallWrapping);

    options.handleAllCalls(reservation);
  }

  // Iterate though all existing reservations, and call handle.
  options.manager.workerClient.reservations.forEach(handle);
  // When a new reservation is created, call handle
  options.manager.workerClient.on("reservationCreated", handle);
}
