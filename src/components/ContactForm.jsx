import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "../redux/slice";

export default function ContactForm({ handleSubmit }) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.contacts.name);
  const number = useSelector((state) => state.contacts.number);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ field: name, value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, number });
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col space-y-4 items-stretch flex-1"
    >
      <h2 className="text-3xl font-extrabold text-purple-900 text-center">
        Add contact
      </h2>
      <div className="w-full">
        <label
          htmlFor="personName"
          className="block text-lg font-semibold text-purple-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="personName"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          required
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="personNumber"
          className="block text-lg font-semibold text-purple-700 mb-1"
        >
          Number
        </label>
        <input
          type="tel"
          id="personNumber"
          name="number"
          value={number}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
      >
        Add contact
      </button>
    </form>
  );
}
