export default function Filter({ filter, handleChange }) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold text-purple-900 text-center mb-3">
        Filter by name
      </h2>
      <input
        type="text"
        name="filter"
        className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
        onChange={handleChange}
        value={filter}
        title="Filter by name"
        required
      />
    </section>
  );
}
