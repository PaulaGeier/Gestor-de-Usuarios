import styles from './ModalDetails.module.css';
import type { User } from "../../../../hooks/useUsers";

type Props = {
  user: User | null;
  onClose: () => void;
};

export const ModalDetails = ({ user, onClose }: Props) => {
  if (!user) return null;
  return (
    <div className={styles.container}>
        <div className={styles.containerModal}>
          <h2>Detalles de usuario</h2>
        <div className={styles.userInfo}>
            <p><strong>Usuario:</strong>{user.username}</p>
            <p><strong>Nombre y apellido:</strong>{user.name}</p>
            <p><strong>Email:</strong>{user.email}</p>
            <p><strong>Telefono:</strong>{user.phone}</p>
        </div>
        <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
  )
}
