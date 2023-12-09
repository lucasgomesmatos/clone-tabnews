import database from "infra/database";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const resultOpenedConnections = await database.query(
    "SELECT COUNT(*) used FROM pg_stat_activity;",
  );

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const OpenedConnections = resultOpenedConnections.rows[0].used;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: OpenedConnections,
      },
    },
  });
}
