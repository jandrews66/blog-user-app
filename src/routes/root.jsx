import {Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
import '../index.css'

export default function Root() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:3000/posts", {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPosts(data)
            })
            .catch((error) => console.error(error));
    }, []);

    const getRanPost = () => {
        let ranNum = Math.floor(Math.random() * posts.length);
        let ranId = posts[ranNum]._id;
        navigate(`/posts/${ranId}`)
    }

    return (
        <>
            <nav className="bg-emerald-600 shadow-md mb-5" >
                <ul className="mx-auto flex justify-center gap-4 p-6 px-8">
                    <li className="text-white hover:underline">
                        <Link to={`/`}>The Blog</Link>
                    </li>
                    <li > 
                        <button 
                        className="hover:underline text-white"
                        onClick={getRanPost}>Random Post
                        </button>
                    </li>              
            
                </ul>
            </nav>
            {/* Use location as a key to force the Outlet to re-render when the URL changes (when a new Ran Post is created) */}
            <main key={location.pathname}>
                <Outlet />
            </main>
            <footer className="bg-zinc-100 text-center h-20 flex items-center justify-center shadow-inner mt-5">
                <p className="">Blog Copyright 2024</p>
            </footer>
        </>
    )
}