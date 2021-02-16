import * as AlertCtx from "../../../filters/AlertCtx/useAlertCtx";

export default function mockAlertCtx() {
    const mockedKGCtx = {};
    jest.spyOn(AlertCtx, "useAlertCtx").mockImplementation(() => mockedKGCtx);
}
