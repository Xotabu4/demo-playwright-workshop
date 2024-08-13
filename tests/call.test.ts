import { doxymeTest } from "../fixtures";

doxymeTest.describe.configure({
  timeout: 10000,
});

doxymeTest(
  "doctor can start call with patient",
  async ({ doctor, patient }) => {
    await doctor.app.signIn();
    await patient.app.waitingRoom.checkin(patient.name);
    await doctor.app.dashboard.startCallWithFirstPatient();
    await patient.app.call.expectCallStarted("Mr. User1");
    await doctor.app.call.expectCallStarted(patient.name);
  }
);

doxymeTest(
  "doctor can signIn",
  async ({ doctor: { app: { call } } }) => {
    await call.expectCallStarted("Mr. User1");
  }
);
