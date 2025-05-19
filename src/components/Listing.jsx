import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { context } from "../Store";

export default function Listing() {
  const { categorySlug } = useParams()
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const limit = 30;
  const { addToCart } = useContext(context)

  const getCategory = () => {
    axios.get('https://dummyjson.com/products/categories').then(
      (response) => {
        setCategory(response.data)

      }
    ).catch(
      (error) => {
        setCategory([])
      }
    )
  }

  useEffect(
    () => {
      getCategory()
    }, []
  )

  useEffect(
    () => {
      let API = null;
      if (categorySlug == null) {
        API = "https://dummyjson.com/products";
      } else {
        API = "https://dummyjson.com/products/category/" + categorySlug;
      }
      setLoading(true)
      axios.get(API).then(
        (response) => {
          setProducts(response.data.products)
          setTotalPage(Math.ceil(response.data.total / limit))

        }
      ).catch(
        (error) => {
          setProducts([])
        }
      ).finally(
        () => {
          setLoading(false)
        }
      )
    }, [categorySlug]
  )
  const pagination = [];
  for (let i = 0; i < totalPage; i++) {
    pagination.push(
      <button key={i} onClick={() => setCurrentPage(i)} className="px-4 py-2 text-sm rounded font-medium text-gray-700 me-1 ms-1 bg-gray-100 hover:bg-gray-700 hover:text-white duration-200">
        {i + 1}
      </button>
    )

  }

  useEffect(
    () => {
      axios.get(`https://dummyjson.com/products?skip=${currentPage * limit}`).then(
        (response) => {
          setProducts(response.data.products)
        }
      ).catch(
        (error) => {
          setProducts([])
        }
      ).finally(
        () => {
          setLoading(false)
        }
      )
    }, [currentPage]
  )

  return (
    <section className="max-w-full mx-auto px-4 py-5">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Products</h2>

      <div className="grid grid-cols-5 gap-5">
        <ul className="col-span-1">
          <Link to="/">
            <li className="grid-cols-1 w-full p-2 mb-2  shadow font-bold cursor-pointer">All</li>
          </Link>

          {
            category.map(
              (cat, index) => {
                return (
                  <Link to={`/${cat.slug}`} key={index}>
                    <li className="grid-cols-1 w-full p-2 mb-2 shadow cursor-pointer">{cat.name}</li>
                  </Link>

                )
              }

            )
          }
        </ul>

        <div className="grid col-span-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-start gap-5">
          <div className="flex border col-span-full rounded-lg shadow-sm overflow-hidden p-1 border-gray-300">
            {
              pagination
            }
          </div>
          {
            loading ?
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (d, i) => {
                  return (
                    <div key={i} className="bg-white rounded-2xl shadow-gray-300 shadow-sm p-4 flex flex-col animate-pulse">
                      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-4"></div>
                      <div className="mt-auto h-10 bg-gray-300 rounded-md w-full"></div>
                    </div>
                  )
                }
              )

              :
              products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-gray-500 shadow-sm transition p-4 flex flex-col"
                >
                  <Link to={`/details/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  </Link>

                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-blue-600 font-bold text-md mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <button onClick={() => addToCart(product.id)} className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                </div>
              ))
          }



        </div>
      </div>


    </section>
  );
}
