const FilterSort = ({ search, setSearch, category, setCategory, sort, setSort }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-6 mb-6 bg-white shadow rounded-lg items-stretch md:items-center">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All Categories</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="men's clothing">Men's Clothing</option>
      </select>

      {/* Sort Select */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default FilterSort;
