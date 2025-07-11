import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex flex-col items-center gap-2 mb-10'>
      
      <p className='text-3xl text-slate-600'>
        {text1}
        <span className='font-bold text-slate-900 ml-2'>{text2}</span>
      </p>
      
      <div className='w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full'></div>

    </div>
  );
};

export default Title;