export const DB_CONFIG = () => {
  const db_username = process.env.db_username;
  const db_password = process.env.db_password;
  const db_cluster = process.env.db_cluster;
  const db_name = process.env.db_name;
  const url = `mongodb+srv://${db_username}:${db_password}@${db_cluster}.mongodb.net/${db_name}?retryWrites=true&w=majority`;
  return url;
};
