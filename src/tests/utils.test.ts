import {
  cleanKey,
  getAllDataSetKeys,
  getYAxisDomain,
  hasValue,
} from "../common/utils";

describe("Chart Utility tests", () => {
  test("cleanKey strips invalid chars from string", () => {
    expect(cleanKey("Name with spaces")).toEqual("name_with_spaces");
    expect(cleanKey("Name with 'invalid chars': Test")).toEqual(
      "name_with__invalid_chars___test"
    );
    expect(`${cleanKey(undefined as unknown as string)}`).toEqual("undefined");
  });

  test("getAllDataSetKeys returns all unique keys found in dataset", () => {
    const data = [
      { a: "Hello", b: "World" },
      { a: "Foo", b: "Bar" },
      { b: "Farm", c: "Table" },
      { a: "qux", d: "quux" },
    ];

    expect(getAllDataSetKeys(data)).toEqual(["a", "b", "c", "d"]);
  });

  test('hasValue should return true when value is not undefined | null | ""', () => {
    expect(hasValue(null)).toEqual(false);
    expect(hasValue("")).toEqual(false);
    expect(hasValue(undefined)).toEqual(false);
    expect(hasValue(0)).toEqual(true);
    expect(hasValue("Hello")).toEqual(true);
  });

  test("getYAxisDomain should return minimum and maximum values from dataset between specific x-axis values", () => {
    const data = [
      {
        time: 0,
        value: 1,
      },
      {
        time: 1,
        value: 2,
      },
      {
        time: 2,
        value: 3,
      },
      {
        time: 3,
        value: 0,
      },
      {
        time: 4,
        value: 2,
      },
      {
        time: 4.5,
        value: 6,
      },
      {
        time: 5,
        value: 4,
      },
    ];
    const domain = getYAxisDomain(data, 3, 5, "time", "value");
    expect(domain).toEqual([0, 6]);
  });
});
