const { getLastId, getSchemas, isCamelCase } = require("../utils");

describe("Utils", () => {
  test("getLastId should get lst Id from te list of items", () => {
    expect(getLastId).toBeDefined();
    expect(getLastId()).toBeUndefined();
    expect(getLastId([])).toBeUndefined();
    expect(getLastId([{ id: 1 }, { id: 8 }])).toEqual(8);
    expect(getLastId([{ id: 600 }, { id: 2 }])).toEqual(2);
  });

  test("isCamelCase should work", () => {
    expect(isCamelCase("")).toEqual(false);
    expect(isCamelCase("int")).toEqual(false);
    expect(isCamelCase("Int")).toEqual(true);
    expect(isCamelCase("BigInt")).toEqual(true);
    expect(isCamelCase("string")).toEqual(false);
    expect(isCamelCase({})).toEqual(false);
  });

  test("getSchemas should work", () => {
    const tablesData = {
      table1: {
        schema: {
          name: "SchemaOne",
          properties: {
            id: "int"
          }
        }
      },
      table2: {
        schema: {
          name: "SchemaTwo",
          properties: {
            id: "int",
            three: "SchemaThree"
          }
        }
      },
      table3: {
        schema: {
          name: "SchemaThree",
          properties: {
            id: "int",
            four: "SchemaFour"
          }
        }
      },
      table4: {
        schema: {
          name: "SchemaFour",
          properties: {
            id: "int",
            two: "SchemaTwo"
          }
        }
      }
    };

    expect(getSchemas(tablesData, tablesData.table1.schema)).toMatchObject([
      tablesData.table1.schema
    ]);
    expect(getSchemas(tablesData, tablesData.table2.schema)).toMatchObject([
      tablesData.table2.schema,
      tablesData.table3.schema,
      tablesData.table4.schema
    ]);
  });
});
