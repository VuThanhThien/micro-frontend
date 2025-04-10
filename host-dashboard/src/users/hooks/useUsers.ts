import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../types/user';

const fetchUsers = async (): Promise<User[]> => {
  //TODO: replace by import from "core/lib/axios"
  const { data } = await axios.get('/api/users');
  return data;
};

export function useUsers() {
  return useQuery('users', () => fetchUsers());
}
