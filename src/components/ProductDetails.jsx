import { FaStar, FaRegStar, FaShoppingCart, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const getProduct = () => {
        axios.get('https://dummyjson.com/products/' + productId).then(
            (response) => {
                setProduct(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }
    useEffect(
        () => {
            getProduct()
        }, []
    )
    
    

    const renderStars = (rating) => {
        const full = Math.floor(rating || 0);
        const empty = 5 - full;
        return (
            <div className="flex">
                {[...Array(full)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                ))}
                {[...Array(empty)].map((_, i) => (
                    <FaRegStar key={i} className="text-yellow-300" />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-screen-xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <Link to="/details">
                                <img
                                    src={product?.images?.[0]}
                                    alt={product.title}
                                    className="w-md h-auto rounded-2xl object-cover shadow-gray-300 bg-gray-100 shadow-xs"
                                />
                            </Link>

                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {product.discountPercentage}% OFF
                            </span>
                            {product.stock < 20 && (
                                <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Low Stock
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                        <div className="flex items-center gap-2">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-500">{product.rating?.toFixed(1)} / 5</span>
                        </div>
                        <p className="text-gray-600">{product.description}</p>

                        <div className="text-2xl font-semibold text-green-600">
                            ${product.price}
                            <span className="text-sm text-gray-400 line-through ml-3">
                                ${(product.price / (1 - product.discountPercentage / 100))}
                            </span>
                        </div>

                        <div className="text-sm text-gray-500">
                            <p>Brand: {product.brand}</p>
                            <p>SKU: {product.sku}</p>
                            <p>Availability: <span className="text-green-600">{product.availabilityStatus}</span></p>
                            <p>Minimum Order: {product.minimumOrderQuantity}</p>
                            <p>Warranty: {product.warrantyInformation}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaTruck className="text-lg" /> {product.shippingInformation}
                        </div>

                        <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200 shadow-lg">
                            <FaShoppingCart /> Add to Cart
                        </button>

                    </div>
                </div>

                <hr className="my-10" />

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product?.reviews?.map((r, i) => (
                            <div
                                key={i}
                                className="bg-gray-100 p-4 rounded-xl shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{r.reviewerName}</span>
                                    {renderStars(r.rating)}
                                </div>
                                <p className="text-gray-700 mt-2">{r.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
