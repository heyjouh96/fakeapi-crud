import React from 'react';

function BlogHeader({ title, status }) {

  const renderStatus = {
    1: 'carregando...',
    2: 'posts carregados',
    3: 'post adicionado com sucesso',
    4: 'post deltado com sucesso',
    5: 'post editado com sucesso'
  }[status] || '';

  return (
    <div className="BlogHeader">
      <h1>{title}</h1>

      <span>Status: {renderStatus}</span>
    </div>
  );
}

export default BlogHeader;
