import React, { useState, useEffect } from "react";
import FilterSort from "../components/FilterSort";
import ProductList from "../components/ProductList";

const Home = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  products,
  addToCart,
  addToWishlist,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  return (
    <>
      {/* ✅ Full width banner */}
      <header
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: "url(/shopping.jpg)" }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Our Store
          </h1>
          <p className="mt-2 text-xl">Shop the latest products</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4">
        <FilterSort
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        <ProductList
          products={currentProducts}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />

        {/* ✅ Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">{currentPage}</span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastProduct >= products.length}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
