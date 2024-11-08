import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { formatDate } from '../utils/formatDate'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [dots, setDots] = useState('');

    useEffect(() => {
        fetch("https://dazzling-elemental-airplane.glitch.me/posts", {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPosts(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)

            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500); // Change every 500ms
    
        return () => clearInterval(interval);
      }, []);

return (
     <div className="flex justify-center">
        <ul className="flex flex-col justify-center items-center gap-5 max-w-screen-xl">
            {loading &&
                <div className="text-center">    
                <p className="text-gray-700">
                    Fetching posts<span className="inline-block w-4 text-left">{dots}</span>
                </p>
                <p className="text-gray-600 text-sm mt-1">(This may take a minute)</p>
                </div> 
            }
            {posts.map((post) => (
                <li key={post._id} className="shadow-md py-5 px-5 w-1/2">
                    <p className="text-xs text-right mb-1">{formatDate(post.timestamp)}</p>
                    <Link to={`/posts/${post._id}`} className="text-3xl text-blue-700 hover:text-blue-800">{post.title}</Link>
                    <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full max-h-72 object-cover mt-4 rounded-md mb-4"
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
