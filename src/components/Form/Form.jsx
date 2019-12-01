import React, { useState, useEffect } from 'react';
import './Form.css';

function Form({ propagateAdd, propagateUpdate, editingMode }) {

  const [form, setForm] = useState({
    userId: 1,
    id: null,
    title: '',
    body: ''
  });

  useEffect(() => {
    if (editingMode.isEditing) {
      setForm(editingMode.editingPost);
    }
  }, [editingMode]);

  const formHandler = (key, value) => setForm({ ...form, [key]: value });

  const submitForm = () => {
    if (form.title !== '' && form.body !== '') {
      if (!editingMode.isEditing) {
        propagateAdd(form);
      } else {
        propagateUpdate(form);
      }
      setForm({ userId: 1, id: null, title: '', body: '' });
    }
  }

  return (
    <div className="Form">
      <h2>Poste algo</h2>
      <input
        type="text"
        placeholder="Título..."
        onChange={(e) => formHandler('title', e.target.value)}
        value={form.title}
      /> <br /> <br />

      <textarea
        placeholder="Conteudo..."
        onChange={(e) => formHandler('body', e.target.value)}
        value={form.body}
      ></textarea> <br />

      <button onClick={() => submitForm()}>{!editingMode.isEditing ? 'Postar' : 'Editar'}</button>
      {/* <button onClick={() => submitForm()}>Postar</button> */}
    </div>
  );
}

export default Form;
