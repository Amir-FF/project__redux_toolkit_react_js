let lastId = 0;

export function generateId() {
  lastId += 1;
  return lastId;
}
