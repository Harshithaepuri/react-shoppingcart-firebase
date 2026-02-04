import React, { useState, useEffect } from "react";
import FilterSort from "../components/FilterSort";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";

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
     <header className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
  
  {/* Soft glowing shapes */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute top-1/3 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

  {/* Content */}
  <motion.div
    className="relative z-10 text-center text-white px-6"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className="text-4xl md:text-6xl font-extrabold tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      Elevate Your Shopping
    </motion.h1>

    <motion.p
      className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      Discover premium products curated for modern lifestyles
    </motion.p>

    <motion.button
  onClick={() =>
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="mt-8 px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:shadow-2xl transition"
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
>
  Explore Products
</motion.button>

  </motion.div>
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

<div id="products">
  <ProductList
    products={currentProducts}
    addToCart={addToCart}
    addToWishlist={addToWishlist}
  />
</div>


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
