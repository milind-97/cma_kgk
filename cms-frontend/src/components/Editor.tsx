// components/Editor.tsx
'use client';

import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the default styles

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const handleChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    // Optional: Perform any setup when content changes
  }, [content]);

  return (
    <div className="editor">
      <ReactQuill 
        value={content}
        onChange={handleChange}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder="Write your content here..."
      />
    </div>
  );
};

// You can customize toolbar options here
Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean'] // remove formatting button
  ],
};

Editor.formats = [
  'header', 'bold', 'italic', 'underline', 'link', 'image', 'list', 'bullet'
];

export default Editor;
