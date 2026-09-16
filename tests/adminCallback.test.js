import test from "node:test";
import assert from "node:assert/strict";
import { adminCallbackPath } from "../src/utils/adminCallback.js";

test("routes a homepage email callback to admin while preserving session parameters", () => {
  const url = new URL("https://example.test/#access_token=test&refresh_token=test&type=magiclink");
  assert.equal(adminCallbackPath(url), `/admin${url.hash}`);
});
test("preserves a code callback for the auth client", () => {
  assert.equal(adminCallbackPath(new URL("https://example.test/?code=test")), "/admin?code=test");
});
test("keeps ordinary homepage visits and other routes unchanged", () => {
  assert.equal(adminCallbackPath(new URL("https://example.test/")), null);
  assert.equal(adminCallbackPath(new URL("https://example.test/?utm_source=email")), null);
  assert.equal(adminCallbackPath(new URL("https://example.test/admin#access_token=test&refresh_token=test")), null);
});
test("does not redirect password recovery links", () => {
  assert.equal(adminCallbackPath(new URL("https://example.test/#access_token=test&refresh_token=test&type=recovery")), null);
});
