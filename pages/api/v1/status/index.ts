import database from "infra/database";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const resultServerVersion = await database.query("SHOW server_version;");
  const resultMaxConnections = await database.query("SHOW max_connections;");
  const resultOpenedConnections = await database.query(
    "SELECT COUNT(*) used FROM pg_stat_activity;",
  );
  const serverVersion = resultServerVersion.rows[0].server_version;
  const maxConnections = resultMaxConnections.rows[0].max_connections;
  const OpenedConnections = resultOpenedConnections.rows[0].used;

  res.status(200).json({
    updated_at: updatedAt,
    database: {
      version: serverVersion,
      max_connections: maxConnections,
      opened_connections: OpenedConnections,
    },
  });
}
