// components/ContentRenderer.tsx

import React from 'react';
import pluginManager from '../utils/pluginManager';

const ContentRenderer: React.FC<{ content: any }> = ({ content }) => {
  const contentBlocks = pluginManager.getContentBlocks();

  return (
    <div>
      {content.map((block: any, index: number) => {
        const BlockComponent = contentBlocks[block.type];
        return BlockComponent ? (
          <BlockComponent key={index} {...block.props} />
        ) : null; // or a fallback component
      })}
    </div>
  );
};

export default ContentRenderer;
