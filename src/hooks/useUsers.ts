// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export type NewUser = Omit<User, "id">;

interface UseUsersResult {
  users: User[];
  error: Error | null;
  fetchUsers: () => Promise<void>;
  createUser: (user: NewUser) => Promise<User | null>;
  updateUser: (id: number, user: Partial<User>) => Promise<User | null>;
  deleteUser: (id: number) => Promise<boolean>;
}

const API = "https://jsonplaceholder.typicode.com/users";

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(API);
      const normalized = data.map((u: any): User => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone,
      }));
      setUsers(normalized);
    } catch (err: any) {
      setError(err);
    }
  };

  const createUser = async (user: NewUser) => {
    try {
      const { data } = await axios.post<User>(API, user);
      const created: User = { ...user, id: data.id ?? Date.now() };
      setUsers((prev) => [...prev, created]);
      return created;
    } catch (err: any) {
      setError(err);
      return null;
    }
  };

  const updateUser = async (id: number, user: Partial<User>) => {
    try {
      const { data } = await axios.put<User>(`${API}/${id}`, user);
      const updated: User = { ...(users.find((u) => u.id === id) as User), ...user, ...data };
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      return updated;
    } catch (err: any) {
      setError(err);
      return null;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, error, fetchUsers, createUser, updateUser, deleteUser };
};
