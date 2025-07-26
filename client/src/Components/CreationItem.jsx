import React, { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className='p-4 max-w-5xl text-sm border border-gray-200 rounded-lg cursor-pointer bg-white text-black'
    >
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='font-semibold text-base'>{item.prompt || 'No prompt provided'}</h2>
          <p className='text-gray-500 text-sm'>
            {item.type} - {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
          </p>
        </div>
        <button
          className='bg-[#EFF6FF] border border-[#bfdbfe] text-[#1E40AF] px-4 py-1 rounded-full text-sm'
        >
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className='mt-3'>
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt='Generated'
              className='w-full max-w-md rounded-lg'
            />
          ) : (
            <div className='text-sm text-slate-700 whitespace-pre-line'>
              <div className='reset-tw'>
                <Markdown>{item.content || 'No content available'}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
