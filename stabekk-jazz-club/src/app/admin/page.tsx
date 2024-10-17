"use client"; // Making sure it's a client-side component

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase"; // Import Firebase instance
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import AdminEvents from "../components/AdminEvents";

// Component for editing events
const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
        console.log(currentUser);
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle user login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      setError("Invalid login credentials.");
      const firebaseError = error as { code: string; message: string };
      console.error(
        "Error signing in:",
        firebaseError.code,
        firebaseError.message
      );
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div>
        <div className="bg-gray-4 dark:bg-sky-950 rounded-xl flex flex-wrap justify-between sm:w-max">
          <p className="p-4">{user.email}</p>
          <button className="btn1" onClick={handleLogout}>
            Logg ut
          </button>
        </div>
        <br />
        <section>
          <AdminEvents />
        </section>
      </div>
    );
  }

  // Display login form if the user is not logged in
  return (
    <div className="grid gap-2 max-w-sm bg-gray-4 dark:bg-sky-950 p-4 rounded-lg">
      <h1>Logg inn</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-post"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passord"
      />

      <button className="btn1" onClick={handleLogin}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminPage;
