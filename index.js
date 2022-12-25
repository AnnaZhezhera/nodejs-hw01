const argv = require("yargs").argv;
const {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("list");
      const listofContacts = await listContacts();
      console.table(listofContacts);
      break;

    case "get":
      console.log("id", id);
      await getContactById(id);
      break;

    case "add":
      console.log("name email phone", name, email, phone);
      await addContact(name, email, phone);
      break;

    case "remove":
      console.log("id", id);
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
