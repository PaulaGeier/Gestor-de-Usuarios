// src/components/ui/UsersList/UsersList.tsx
import { useState } from "react";
import type { User } from "../../../hooks/useUsers";
import { UserCard } from "../UserCard/UserCard";
import { ModalDetails } from "../Modals/ModalDetails/ModalDetails";
import { ModalEditCreate } from "../Modals/ModalEditCreate/ModalEditCreate";
import styles from "./UsersList.module.css";

type Props = {
  users: User[];
  error: Error | null;
  onUpdate: (id: number, user: Partial<User>) => Promise<User | null>;
  onDelete: (id: number) => Promise<boolean>;
};

export const UsersList = ({ users, error, onUpdate, onDelete }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className={styles.containerCards}>
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onView={(user: User) => {           
              setSelectedUser(user);
              setIsEditMode(false);
              setShowDetails(true); 
            }}
            onEdit={(user: User) => {            
              setSelectedUser(user);
              setIsEditMode(true);
            }}
            onDelete={async (user: User) => {         
              await onDelete(user.id);
            }}
          />
        ))}
      </div>

      <ModalDetails
        user={showDetails ? selectedUser : null}
        onClose={() => {
          setShowDetails(false);
          setSelectedUser(null);
        }}
      />

      {isEditMode && selectedUser && (
        <ModalEditCreate
          user={selectedUser}
          mode="edit"
          onClose={() => {
            setIsEditMode(false);
            setSelectedUser(null);
          }}
          onSave={async (form) => {
            await onUpdate(form.id, form);
            setIsEditMode(false);
            setSelectedUser(null);
          }}
        />
      )}
    </>
  );
};
