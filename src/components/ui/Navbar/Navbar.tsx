import { GrAdd } from "react-icons/gr";
import styles from "./Navbar.module.css";


type Props = {
  onAdd: () => void;
  search: string;                           
  onSearchChange: (value: string) => void;  
};

export const Navbar = ({onAdd,search, onSearchChange}:Props) => {

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>USUARIOS</h1>
        <div className={styles.containerButtons}>
          <input type="text" placeholder="Buscar usuario" className={styles.seachUser} value={search}                               // 👈 controlado
          onChange={(e) => onSearchChange(e.target.value)} />
          <button className={styles.addUser} title="Añadir usuario" onClick={onAdd}><GrAdd /></button>
        </div>
    </div>
  )
}
