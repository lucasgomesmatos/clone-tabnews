test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  const VERSION_DATABASE = 16;
  const MAX_CONNECTIONS_DATABASE = 100;
  const OPENED_CONNECTIONS_DATABASE = 9;

  expect(responseBody.database).toBeDefined();
  expect(Number(responseBody.database.version)).toEqual(VERSION_DATABASE);
  expect(Number(responseBody.database.max_connections)).toEqual(
    MAX_CONNECTIONS_DATABASE,
  );
  expect(Number(responseBody.database.opened_connections)).toEqual(
    OPENED_CONNECTIONS_DATABASE,
  );

  console.log("responseBody", responseBody);
});
