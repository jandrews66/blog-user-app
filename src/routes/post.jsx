import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CommentForm from './components/CommentForm'
import { formatDate } from '../utils/formatDate'; 

export default function Post() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    let { postId } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`, {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPost(data)
            })
            .catch((error) => console.error(error));
    }, [postId]);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}/comments`, {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setComments(data)
            })
            .catch((error) => console.error(error));
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

return (
    <div className="container mx-auto px-4 py-8 max-w-prose">
        <div className="bg-white shadow-md rounded p-6 mb-6">
            <div className="flex place-content-between mb-6">
                <p className="text-sm text-gray-500">by {post.user && post.user.username}</p>
                <p className="text-sm text-gray-500">{formatDate(post.timestamp)}</p>
            </div>
            <h3 className="text-3xl font-semibold mb-12">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
        </div>
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        <ul className="space-y-4">
            {comments.map((comment) => (
                <li key={comment._id} className="bg-gray-100 p-4 rounded shadow">
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-gray-700">{comment.message}</p>
                </li>
            ))}
        </ul>
        <div className="mt-8">
            <CommentForm postId={postId} setComments={setComments} />
        </div>
    </div>
);
}