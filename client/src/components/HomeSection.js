import React from "react";
import { Link } from "react-router-dom";

const HomeSection = () => {
    return (
        <section id="home-section" className="home-section bg-gray-900 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full md:w-full text-center">
                        <div className="home-content">
                            <h1 className="home-title text-4xl md:text-6xl font-bold mb-4">
                                Library System
                            </h1>
                            <p className="home-text text-lg md:text-xl mb-8">
                                This is a library system
                            </p>
                            <Link to="/books" className="mr-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                                Get Started
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
