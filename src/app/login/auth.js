// auth.js
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Function to handle user registration
const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User registered successfully:", user);
        // Additional user setup can go here
        return user
    } catch (error) {
        console.error("Error registering user:", error.message);
        return ""
    }
};

// Function to handle user login
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in successfully:", user);
        return user

        // Additional login setup can go here
    } catch (error) {
        console.error("Error logging in:", error.message);
        return ""
    }
};

// Function to handle user logout
const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
};

// Export functions
export { registerUser, loginUser, logoutUser };
