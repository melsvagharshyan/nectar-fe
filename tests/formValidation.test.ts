import test from "node:test";
import assert from "node:assert/strict";
import { numeric } from "../src/utils/helpers";
import {
  validateClient,
  validateContact,
  validateRequest,
} from "../src/features/demo-form/utils/validations";
import { validateProperty } from "../src/features/object-editor/utils/validations";
import { blockSchema } from "../src/features/panels/utils/validations";
import { rejectSchema } from "../src/pages/registrations/utils/validations";
import { signUpSchema } from "../src/pages/sign-up/utils/validations";
test("client validates trim, demo phone, optional email and company employee", () => {
  assert.deepEqual(
    validateClient(
      {
        name: "Елена",
        phone: "+7 (000) 000-00-01",
        email: "",
        employeeId: "E1",
      },
      ["E1"],
    ),
    {},
  );
  const errors = validateClient(
    { name: "  ", phone: "abc", email: "not an email", employeeId: "FOREIGN" },
    ["E1"],
  );
  assert.deepEqual(Object.keys(errors), [
    "name",
    "phone",
    "email",
    "employeeId",
  ]);
  assert.deepEqual(
    validateContact(
      { name: " Company ", phone: "", email: " person@example.com " },
      false,
    ),
    {},
  );
});
test("request requires type, location, maximum budget and correct finite ranges", () => {
  assert.deepEqual(
    validateRequest({ type: "Участок", budgetMax: "90000", areaMin: "400" }, [
      "Ачапняк",
    ]),
    {},
  );
  const errors = validateRequest(
    {
      type: "???",
      budgetMin: "200",
      budgetMax: "100",
      areaMin: "0",
      areaMax: "-5",
    },
    [],
  );
  for (const key of ["type", "districts", "budgetMin", "areaMin", "areaMax"])
    assert(errors[key]);
  assert(
    validateRequest({ type: "Квартира", budgetMax: "Infinity" }, ["Аван"])
      .budgetMax,
  );
});
test("property numeric, floor, publishing rules and safe empty preview values", () => {
  const valid = {
    type: "Квартира",
    district: "Арабкир",
    price: "150000",
    area: "75",
    floor: "5",
    floors: "12",
  };
  assert.deepEqual(validateProperty(valid, []), {});
  assert.equal(numeric(""), 0);
  assert.equal(numeric("2,5"), 2.5);
  const publish = validateProperty(valid, [], true);
  assert(publish.media);
  assert(publish.description);
  assert.deepEqual(
    validateProperty(
      { ...valid, description: "Светлая квартира" },
      ["/demo.webp"],
      true,
    ),
    {},
  );
  assert(validateProperty({ ...valid, floor: "15" }, []).floor);
  assert(validateProperty({ ...valid, area: "NaN" }, []).area);
  assert.deepEqual(
    validateProperty(
      { ...valid, type: "Участок", floor: "15", floors: "2" },
      [],
    ),
    {},
  );
});

test("sign-up accepts both broker roles, rejects admin and requires a company", () => {
  const valid = {
    role: "broker",
    name: "Анна Петрова",
    email: "anna@example.com",
    phone: "",
    companyName: "Дом Риэлт",
    password: "password1",
    confirmPassword: "password1",
  };
  assert.equal(signUpSchema.safeParse(valid).success, true);
  assert.equal(signUpSchema.safeParse({ ...valid, role: "partner" }).success, true);
  assert.equal(signUpSchema.safeParse({ ...valid, role: "admin" }).success, false);
  for (const role of ["broker", "partner"]) {
    const result = signUpSchema.safeParse({ ...valid, role, companyName: "  " });
    assert.equal(result.success, false);
    assert.deepEqual(result.error?.issues.map((i) => i.path.join(".")), ["companyName"]);
  }
  assert.equal("adminCode" in (signUpSchema.parse({ ...valid, adminCode: "x" }) as object), false);
});

test("reject and block reasons need 3–500 characters after trim", () => {
  for (const schema of [rejectSchema, blockSchema]) {
    assert.equal(schema.safeParse({ reason: "" }).success, false);
    assert.equal(schema.safeParse({ reason: "  ab  " }).success, false);
    assert.equal(schema.parse({ reason: "  abc  " }).reason, "abc");
    assert.equal(schema.safeParse({ reason: "x".repeat(500) }).success, true);
    assert.equal(schema.safeParse({ reason: "x".repeat(501) }).success, false);
  }
});
