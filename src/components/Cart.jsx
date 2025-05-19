import React, { useContext } from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { context } from '../Store';

const Cart = () => {
    const { cart, qtyHandler } = useContext(context)
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
                {/* Header */}
                <div className="flex items-center mb-8 space-x-2">
                    <FiChevronLeft className="text-2xl text-gray-600 cursor-pointer" />
                    <h1 className="text-3xl font-semibold text-gray-800">Shopping Cart</h1>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                    {
                        cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-2xl p-4 shadow-sm"
                            >
                                {/* Left: Product Info */}
                                <div className="flex items-center space-x-5 w-full md:w-2/3">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                        <p className="text-sm text-gray-500">Size: M</p>
                                        <p className="text-sm text-gray-500">Color: Black</p>
                                    </div>
                                </div>

                                {/* Right: Quantity & Price */}
                                <div className="flex items-center justify-between md:justify-end w-full md:w-1/3 mt-4 md:mt-0 space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
                                            <FaMinus onClick={() => qtyHandler(item.id,1)} className="text-sm text-gray-700" />
                                        </button>
                                        <input
                                            type="number"
                                            value={item.qty}
                                            readOnly
                                            className="w-12 text-center border border-gray-300 rounded-md px-2 py-1"
                                        />
                                        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
                                            <FaPlus onClick={() => qtyHandler(item.id,2)} className="text-sm text-gray-700" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-800">{item.price}</p>
                                    </div>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Summary */}
                <div className="mt-10 bg-white border-t pt-6">
                    <div className="max-w-md ml-auto space-y-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>$99.98</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between text-xl font-semibold text-gray-800">
                            <span>Total</span>
                            <span>$104.98</span>
                        </div>
                        <button className="w-full bg-blue-700 text-white py-3 mt-4 rounded-xl hover:bg-blue-600 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
