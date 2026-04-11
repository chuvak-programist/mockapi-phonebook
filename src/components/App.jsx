import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, addContact, deleteContact } from "../redux/operations";
import { setFilter } from "../redux/slice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { selectFilteredContacts } from "../redux/slice.js"

export default function App() {
  const items = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    if (items.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact({ name, number }));
  };

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <section className="min-h-screen bg-purple-100 p-8 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-5xl space-y-8">
        <h1 className="text-4xl font-extrabold text-purple-900 text-center">Phonebook</h1>
        {isLoading && <p className="text-center text-purple-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="flex w-full gap-10">
          <div className="space-y-8 flex-1">
            <ContactForm handleSubmit={handleAddContact} />
            <Filter
              filter={filter}
              handleChange={(e) => dispatch(setFilter(e.target.value))}
            />
          </div>
          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-extrabold text-purple-900 text-center">Contacts</h2>
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