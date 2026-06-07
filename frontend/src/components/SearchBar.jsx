function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <h3>Search Leads</h3>

      <input
        type="text"
        placeholder="Search by name, email, company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
