const FilterSort = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  return (
    <div className="flex flex-row gap-4 p-6 mb-6">
      <input
        type="text"
        placeholder="enter any search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // ✅ Pass e here
        className="border-2 p-2 rounded-lg"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)} // ✅ Pass e here
        className="border-2 p-2 rounded"
      >
        <option value="all">All</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="men's clothing">men's clothing</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)} // ✅ Pass e here
        className="border-2 p-2 rounded mx-4"
      >
        <option value="">Apply filter</option>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default FilterSort;
