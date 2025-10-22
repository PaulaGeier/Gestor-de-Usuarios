// src/components/ui/Modals/ModalEditCreate/ModalEditCreate.tsx
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type { User } from '../../../../hooks/useUsers';
import styles from './ModalEditCreate.module.css';

type Props = {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
  mode?: "create" | "edit";
};

export const ModalEditCreate = ({ user, onClose, onSave, mode = "edit" }: Props) => {
  const [form, setForm] = useState<User>(user);
  useEffect(() => { setForm(user); }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(form); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerModal}>
        <div className={styles.containerTitle}>
          <h2>{mode === "edit" ? "Editar Usuario" : "Crear Usuario"}</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input name='username' type="text" value={form.username ?? ''} onChange={handleChange} placeholder='Usuario' />
          <input name='name'     type="text" value={form.name ?? ''}     onChange={handleChange} placeholder='Nombre y apellido' />
          <input name='email'    type="email"value={form.email ?? ''}    onChange={handleChange} placeholder='Correo' />
          <input name='phone'    type="text" value={form.phone ?? ''}    onChange={handleChange} placeholder='Telefono' />

          <div className={styles.containerButtons}>
            <button type="submit" style={{ background: "#daf3a1ff" }}>Guardar</button>
            <button type="button" style={{ background: "#f3a1a1ff" }} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
