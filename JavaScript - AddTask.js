import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const { addTask, editTask, tasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se existir

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find(t => t.id === Number(id));
      if (taskToEdit) {
        setTitle(taskToEdit.title);
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (id) {
      const taskOriginal = tasks.find(t => t.id === Number(id));
      editTask({ ...taskOriginal, title });
    } else {
      addTask(title);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que você precisa fazer?"
          autoFocus
        />
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            {id ? 'Salvar Alterações' : 'Criar Tarefa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
