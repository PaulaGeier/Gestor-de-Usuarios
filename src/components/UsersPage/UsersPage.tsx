import { useMemo, useState } from "react";
import { useUsers, type User } from "../../hooks/useUsers";
import { Navbar } from "../ui/Navbar/Navbar";
import { UsersList } from "../ui/UsersList/UsersList";
import { ModalEditCreate } from "../ui/Modals/ModalEditCreate/ModalEditCreate";

const EMPTY_USER: User = { id: 0, name: "", username: "", email: "", phone: "" };

export const UsersPage = () => {
  const { users, error, createUser, updateUser, deleteUser } = useUsers();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");

  const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const filteredUsers = useMemo(() => {
    const q = normalize(search.trim());
    if (!q) return users;
      return users.filter((u) => {
        const haystack =
          `${u.name} ${u.username} ${u.email} ${u.phone}`; 
      return normalize(haystack).includes(q);
    });
   }, [users, search]);
  return (
    <div>
       <Navbar
        onAdd={() => setShowCreate(true)}
        search={search}
        onSearchChange={setSearch}
      />

      <UsersList
        users={filteredUsers}         
        error={error}
        onUpdate={updateUser}
        onDelete={deleteUser}
      />

      {showCreate && (
        <ModalEditCreate
          user={EMPTY_USER}
          mode="create"
          onClose={() => setShowCreate(false)}
          onSave={async (u) => {
            const { id, ...payload } = u; 
            await createUser(payload);
            setShowCreate(false);
          }}
        />
      )}
    </div>
  );
};