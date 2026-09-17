import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
import { requestSearchFilter } from "./requestSearch.js";

test("blank searches add no filter", () => {
  assert.equal(requestSearchFilter("   "), "");
});

test("search punctuation stays inside quoted filter values", () => {
  for (const term of ['Smith, Jr.', 'O’Brien', 'a"),status.eq.confirmed', '50%_\\test']) {
    const filter = requestSearchFilter(term);
    const prefix = "full_name.ilike.";
    const boundary = ',email.ilike.';
    const split = filter.indexOf(boundary);
    const first = JSON.parse(filter.slice(prefix.length, split));
    const petBoundary = ',pet_names.ilike.';
    const petSplit = filter.indexOf(petBoundary);
    const second = JSON.parse(filter.slice(split + boundary.length, petSplit));
    const pet = JSON.parse(filter.slice(petSplit + petBoundary.length));
    assert.equal(first, `%${term.replace(/[\\%_]/g, "\\$&")}%`);
    assert.equal(second, first);
    assert.equal(pet, first);
  }
});

test("Supabase search keeps status, ordering, and pagination in the server query", async () => {
  let requestUrl;
  const client = createClient("https://example.supabase.co", "test-publishable", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: async url => {
      requestUrl = new URL(url);
      return new Response("[]", { headers: { "Content-Type": "application/json" } });
    } }
  });
  const { error } = await client.from("care_inquiry").select("id,full_name")
    .eq("status", "contacted").order("created_at", { ascending: false })
    .range(25, 50).or(requestSearchFilter("person@example.com"));
  assert.equal(error, null);
  assert.equal(requestUrl.searchParams.get("status"), "eq.contacted");
  assert.equal(requestUrl.searchParams.get("or"), '(full_name.ilike."%person@example.com%",email.ilike."%person@example.com%",pet_names.ilike."%person@example.com%")');
  assert.equal(requestUrl.searchParams.get("order"), "created_at.desc");
  assert.equal(requestUrl.searchParams.get("offset"), "25");
  assert.equal(requestUrl.searchParams.get("limit"), "26");
});
