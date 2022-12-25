const fs = require("fs/promises");
const path = require("node:path");
const contactsPath = path.resolve(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const dbRawBufer = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRawBufer);
  return db;
}

async function getContactById(contactId) {
  const dbRawBufer = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRawBufer);
  const updatedDb = db.find(
    (contact) =>
      contact.id == contactId &&
      console.log(
        "\n",
        "name:",
        contact.name,
        "\n",
        "email:",
        contact.email,
        "\n",
        "phone:",
        contact.phone
      )
  );
}

async function removeContact(contactId) {
  const dbRawBufer = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRawBufer);
  const updatedDb = db.filter((contact) => contact.id != contactId);

  await fs.writeFile(contactsPath, JSON.stringify(updatedDb, null, 2));
}

async function addContact(name, email, phone) {
  const id = nanoid();

  const dbRawBufer = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRawBufer);
  db.push({ id, name, email, phone });

  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

module.exports = { listContacts, getContactById, addContact, removeContact };
