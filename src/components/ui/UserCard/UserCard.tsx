import { MdDelete, MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import styles from "./UserCard.module.css";
import type { User } from "../../../hooks/useUsers";

type Props = {
  user: User;
  onView: (user: User) => void;  
  onEdit: (user: User) => void;  
  onDelete?: (user: User) => void | Promise<void>;
};

export const UserCard=({ user,onView,onEdit, onDelete  }: Props) => {


  return (
    <div className={styles.container}>
      <div className={styles.containerInfo}>
        <strong><p>{user.username}</p></strong>
        <p>{user.name}</p>
      </div>
      <div className={styles.containerActions}>
        <button title="Ver usuario" style={{backgroundColor:"#a1b4f3ff"}} onClick={() => onView(user)}><MdOutlineRemoveRedEye /></button>
        <button title="Editar usuario" style={{backgroundColor:"#daf3a1ff"}}  onClick={() => onEdit(user)}><MdEdit /></button>
        <button title="Eliminar usuario" style={{backgroundColor:"#f3a1a1ff"}}onClick={() => onDelete?.(user)} ><MdDelete /></button>
      </div>
    </div>
  )
}
