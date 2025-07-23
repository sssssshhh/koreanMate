import { deleteUser } from 'aws-amplify/auth';

async function handleDeleteUser() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}