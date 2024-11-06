'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts, deletePost } from '../../utils/api';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null); // State to hold any error messages
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      // Check for HTTP status codes
      if (response.data.status === true) {
        setPosts(response.data.data.rows);
        setError(null); // Clear any previous errors
      } else if (response.data.status === false) {
        setPosts([]); // Ensure posts are cleared
        setError(response.data.message); // Set an error message for no posts
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('An error occurred while fetching posts.'); // Generic error message
      setPosts([]); // Ensure posts are cleared
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      fetchPosts(); // Refresh the posts after deletion
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('An error occurred while deleting the post.'); // Set error for delete failure
    }
  };

  const handleEdit = (post: Post) => {
    // Use the post id to construct the URL
    router.push(`/posts/${post.id}`); // Ensure this is a string URL
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
       <div className="flex justify-end mb-4">
        <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Post
        </Link>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {posts.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left">Sr.</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">title</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Content</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">
                 
                    {post.id}
                 
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                 
                 {post.title}
              
             </td>
             <td className="py-2 px-4 border-b border-gray-300">
                 
                 {post.content}
              
             </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="mt-4">No posts available.</p> // Show this message only if there's no error
      )}
    </div>
  );
};

export default PostsPage;
