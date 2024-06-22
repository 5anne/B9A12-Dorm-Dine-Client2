import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";


const Meals = () => {
    const [mealsData, setMealsData] = useState([]);
    const [displayMealsData, setDisplayMealsData] = useState([]);

    useEffect(() => {
        fetch('https://dorm-dine-server-site.vercel.app/allMeals')
            .then(res => res.json())
            .then(data => {
                setMealsData(data);
                setDisplayMealsData(data);
            })
    }, [])

    const handleSearch = e => {
        e.preventDefault();
        console.log(e.target);
        const form = e.target;
        const search = form.search.value;

        const filteredMeals = mealsData?.filter((data) => {
            const value = data.category;
            return value.toUpperCase() === search.toUpperCase();
        })
        setDisplayMealsData(filteredMeals);
    }

    const handleFilter = e => {
        const filter = e.target.value;
        if (filter === 'All') {
            setDisplayMealsData(mealsData);
        }
        else if (filter === 'Breakfast') {
            const filteredMeals = mealsData?.filter(mealData => mealData.category === filter);
            setDisplayMealsData(filteredMeals);
        }
        else if (filter === 'Lunch') {
            const filteredMeals = mealsData?.filter(mealData => mealData.category === filter);
            setDisplayMealsData(filteredMeals);
        }
        else if (filter === 'Dinner') {
            const filteredMeals = mealsData?.filter(mealData => mealData.category === filter);
            setDisplayMealsData(filteredMeals);
        }
    }

    return (
        <div className="">
            <Helmet>
                <title>Dorm Dine ~ Meals</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="pt-36">
                <form onSubmit={handleSearch} action="">
                    <label className="input input-bordered flex items-center gap-2 md:w-1/2 mx-auto">
                        <input type="text" name="search" className="grow" placeholder="Search By Category: Breakfast, Lunch, Dinner,  etc..." />
                        <button className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
                    </label>
                </form>
            </div>
            <div className="flex gap-4 w-20 mx-auto text-gray-500 mt-14 border-2 p-1 border-teal-900">
                <p>Filter</p>
                <select onChange={handleFilter} className="text-black" name="" id="">
                    <option value="All">All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-32">
                {
                    displayMealsData?.map(mealData => <div key={mealData._id} className="p-10 shadow-2xl rounded-2xl border-2 border-red-300">
                        <div className="flex justify-center"><img className="w-full h-60 rounded-2xl" src={mealData.image} alt="" /></div>
                        <h1 className="font-bold text-blue-950 font-display text-xl mt-4">{mealData.title}</h1>
                        <p><span className="font-semibold text-gray-950">Desciption:</span> {mealData.description}</p>
                        <p><span className="font-semibold text-gray-950">Category:</span> {mealData.category}</p>
                        <p><span className="font-semibold text-gray-950">Price:</span> ${mealData.price}</p>
                        <div className="flex justify-between">
                            <p><span className="font-semibold text-gray-950">Likes:</span> {mealData.likes}</p>
                            <p className="flex gap-2 items-center"><span className="font-semibold text-gray-950">Rating: </span>{mealData.rating}<FaStar /></p>
                        </div>
                        <h2 className="font-semibold text-gray-950">Reviews:</h2>
                        {
                            mealData?.reviews?.map((review, idx) => <div key={idx} className="text-gray-600">
                                <p>#{review.author}</p>
                                <p className="font-semibold">{review.content}</p>
                            </div>)
                        }
                        <p className="font-bold">#admin: {mealData.admin_name}</p>
                    </div>)
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Meals;