import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
    const { users, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error);
            })
    }

    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/meals">Meals</NavLink>
        <NavLink to="/upcomingMeals">Upcoming Meals</NavLink>

    </>
    return (
        <div>
            <div className="navbar fixed z-10 opacity-70 text-white justify-between bg-[#480607]">
                <div className="">
                    <img className="w-12 rounded-full" src="https://i.postimg.cc/8cp7fDtp/baking-bread-abstract-concept-illustration-quarantine-cooking-family-recipe-baking-yeast-335657-1062.jpg" alt="" />
                    <a className="btn btn-ghost text-2xl font-display">Dorm Dine</a>
                </div>
                <div className="gap-6">
                    {links}
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        users ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={users?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-rose-100 rounded-box w-52">
                                    <li><a className="text-black text-lg font-semibold hover:underline px-4">{users?.displayName}</a></li>
                                    <Link to="/dashboard/userProfile"><a className="text-black text-lg font-semibold hover:underline px-4">Dashboard</a></Link>
                                    <Link to="/login"><button onClick={handleLogOut} className="text-black px-4 font-bold text-lg">Logout</button></Link>
                                </ul>
                            </div> :
                            <Link to="/login"><button className="border-2 bg-slate-300 px-3 py-2 text-black rounded-xl ml-4">Join Us</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;