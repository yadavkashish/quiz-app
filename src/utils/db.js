import { openDB } from "idb";

// 🎯 Open Database & Upgrade if Needed
async function getDB() {
  return openDB("quizDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("attempts")) {
        db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

// 🔹 Save Attempt
export async function saveAttempt(score) {
  const db = await getDB();
  const tx = db.transaction("attempts", "readwrite");
  const store = tx.objectStore("attempts");

  await store.add({ id: Date.now(), score, date: new Date().toISOString() }); // Unique ID
  await tx.done;
}

// 🔹 Retrieve All Attempts
export async function getAttempts() {
  const db = await getDB();
  const tx = db.transaction("attempts", "readonly");
  const store = tx.objectStore("attempts");

  const attempts = await store.getAll();
  await tx.done;
  return attempts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest first
}

