import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addContact, deleteContact, setFilter } from "../redux/slice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

export default function App() {
  const items = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    if (items.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact({ id: nanoid(), name, number }));
  };

  const filteredContacts = items.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <section className="min-h-screen bg-purple-100 p-8 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-5xl space-y-8">
        <h1 className="text-4xl font-extrabold text-purple-900 text-center">
          Phonebook
        </h1>
        <div className="flex w-full gap-10">
          <div className="space-y-8 flex-1">
            <ContactForm handleSubmit={handleAddContact} />
            <Filter
              filter={filter}
              handleChange={(e) => dispatch(setFilter(e.target.value))}
            />
          </div>
          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-extrabold text-purple-900 text-center">
              Contacts
            </h2>
            <ContactList
              contacts={filteredContacts}
              deleteContact={(id) => dispatch(deleteContact(id))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
