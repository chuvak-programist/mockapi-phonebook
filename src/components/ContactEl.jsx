export default function ContactEl({ id, name, number, deleteContact }) {
  const handleDelete = () => {
    deleteContact(id);
  };

  return (
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex-1 mr-4">
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">{number}</p>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
        data-id={id}
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
}
