import { deleteUser } from 'aws-amplify/auth';

export async function handleDeleteUser() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}