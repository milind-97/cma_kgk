// pages/posts/new.tsx or pages/posts/edit/[id].tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, getPostById, updatePost } from '../../../utils/api';
import Editor from '../../../components/Editor';

const NewPostPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    try {
      await createPost({ title, slug, content });
      router.push('/posts');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <Editor content={content} setContent={setContent} />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default NewPostPage;
