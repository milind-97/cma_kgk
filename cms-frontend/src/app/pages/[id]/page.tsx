'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost } from '../../../utils/api';
import Editor from '../../../components/Editor';

interface EditPostPageProps {
  params: {
    id: string; // Assuming your route is set up to pass the id parameter
  };
}

const EditPostPage: React.FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Directly destructuring from params
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) fetchPost(id);
  }, [id]);

  const fetchPost = async (id: string) => {
    try {
      const response = await getPostById(id);
      console.log(response, '=============');
      if (response.data.status === true) {
        setTitle(response.data.data.title);
        setSlug(response.data.data.slug);
        setContent(response.data.data.content);
      } else {
        console.error('Error fetching post:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(id, { title, slug, content });
      router.push('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          id="slug"
          type="text"
          placeholder="Enter post slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <Editor content={content} setContent={setContent} />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
};

export default EditPostPage;
