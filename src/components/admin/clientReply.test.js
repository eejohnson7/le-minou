import test from "node:test";
import assert from "node:assert/strict";
import { clientReplyUrl } from "./clientReply.js";

test("email link has exactly the client recipient and the care request subject", () => {
  const mailto = new URL(clientReplyUrl(" client+cat&dog@example.com "));
  assert.equal(mailto.protocol, "mailto:");
  assert.equal(decodeURIComponent(mailto.pathname), "client+cat&dog@example.com");
  assert.equal(mailto.searchParams.get("subject"), "Your Le Minou care request");
  assert.deepEqual([...mailto.searchParams.keys()], ["subject"]);
});

test("missing, invalid, or multiple recipients cannot open a draft", () => {
  for (const value of [null, "", "invalid", "a@example.com,b@example.com", "a@example.com\r\nBcc:other@example.com"]) {
    assert.equal(clientReplyUrl(value), "");
  }
});
