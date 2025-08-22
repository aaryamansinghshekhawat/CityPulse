import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  try {
    console.log('Creating user with email:', email);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created successfully:', result.user.uid);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  try {
    console.log('Signing in with email:', email);
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully:', result.user.uid);
    return result;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const doSignInWithGoogle = async () => {
  try {
    console.log('Signing in with Google');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('Google sign-in successful:', result.user.uid);
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    console.log('Signing out user');
    await auth.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
