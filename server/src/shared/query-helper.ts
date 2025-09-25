export async function findOne<T>(q: Promise<T[]>): Promise<T | undefined> {
  const [row] = await q
  return row
}
