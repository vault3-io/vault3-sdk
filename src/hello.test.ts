import { expect, test } from "vitest";
import { HelloWorld } from "./hello";

test("Hello without a name", () => {
  expect(HelloWorld(undefined)).toEqual("Hello World!");
});

test("Hello with name", () => {
  expect(HelloWorld("AAAAAAAA")).toEqual("Hello AAAAAAAA!");
});
