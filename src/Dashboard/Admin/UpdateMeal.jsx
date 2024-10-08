import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMeal = () => {
    const { _id, title, ingredients, description, price, rating, post_time, likes, reviews } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const result = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const mealData = {

            title: data.title,
            category: data.category,
            image: result.data.data.url,
            ingredients: data.ingredients,
            description: data.description,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            post_time: data.postTime,
            likes: parseInt(data.likes),
            reviews: parseInt(data.reviews),
            reviewText: data.reviewText,
            status: data.status,
            admin_name: data.adminName,
            admin_email: data.adminEmail
        }

        const res = await axiosSecure.patch(`/allMeals/${_id}`, mealData);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is updated to the All Meals.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="flex flex-col pt-16 w-10/12 md:w-9/12 mx-auto">
            <h1 className="text-center font-semibold md:text-4xl border-y-2 border-teal-900 border-dashed p-6 md:w-96 mx-auto">Update Meal</h1>
            <div className="mt-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:flex justify-center gap-10">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("title")} type="text" defaultValue={title} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category <span className="text-red-700">*</span></span>
                                </label>
                                <select {...register("category")} type="text" className="input input-bordered rounded-none border-teal-900">
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("image", { required: true })} type="file" className="input input-bordered rounded-none border-teal-900 pt-2" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Ingredients <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("ingredients")} type="text" defaultValue={ingredients} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("description")} type="text" defaultValue={description} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price ($)<span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("price")} type="number" defaultValue={price} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("rating")} type="number" defaultValue={rating} className="input input-bordered rounded-none border-teal-900" />
                            </div>
                        </div>

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Time <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("postTime")} type="datetime-local" defaultValue={post_time} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Likes <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("likes")} type="number" defaultValue={likes} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Reviews <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("reviews")} type="number" defaultValue={reviews} className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Write Review</span>
                                </label>
                                <input {...register("reviewText")} type="text" placeholder="Write reviews" className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <input {...register("status")} type="text" placeholder="Added/Upcoming/Requested/Served" className="input input-bordered rounded-none border-teal-900" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Name <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("adminName")} defaultValue={users?.displayName} className="input input-bordered rounded-none border-teal-900" readOnly />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Email <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("adminEmail")} defaultValue={users?.email} className="input input-bordered rounded-none border-teal-900" readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center my-8">
                        <input type="submit" className="btn  bg-teal-950 text-white" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;