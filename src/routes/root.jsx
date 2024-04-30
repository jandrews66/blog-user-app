import {Outlet, Link } from "react-router-dom"

export default function Root() {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`/posts`}>All Posts</Link>
                    </li>                    
                    <li>
                        <Link to={`/`}>Login</Link>
                    </li>                
                </ul>
            </nav>
        </>
    )
}