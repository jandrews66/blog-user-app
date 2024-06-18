import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { formatDate } from '../utils/formatDate'

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://dazzling-elemental-airplane.glitch.me/posts", {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPosts(data)
            })
            .catch((error) => console.error(error));
    }, []);

return (
     <div className="flex justify-center">
        <ul className="flex flex-col justify-center items-center gap-5 max-w-screen-xl">
            {posts.map((post) => (
                <li key={post._id} className="shadow-md py-5 px-5 w-1/2">
                    <p className="text-xs text-right mb-1">{formatDate(post.timestamp)}</p>
                    <Link to={`/posts/${post._id}`} className="text-3xl text-blue-700 hover:text-blue-800">{post.title}</Link>
                    <img 
                        src={`https://dazzling-elemental-airplane.glitch.me/public/images/${post.img}`} 
                        alt={post.title} 
                        className="w-full mt-4 rounded-md mb-4"
                    />
                    <p className="line-clamp-5 mb-3">{post.content}</p>
                    <p className="italic mb-1">by {post.user.username}</p>
                    <div className="flex place-content-between items-end">
                        <p className="font-semibold">{post.commentCount} Comment{post.commentCount == 1 ? `` : `s`}</p>
                        <Link to={`/posts/${post._id}`} className="bg-emerald-600 hover:bg-emerald-800 text-white px-2 py-1 rounded">Continue reading</Link>
                    </div>

                </li>
            ))}
        </ul>
    </div> 
)
}
