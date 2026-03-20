import ContactEl from "./ContactEl";

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className="space-y-4 w-full">
      {contacts.map((el) => (
        <ContactEl
          key={el.id}
          id={el.id}
          name={el.name}
          number={el.number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}
