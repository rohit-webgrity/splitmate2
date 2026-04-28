import { auth } from './firebase.js';

console.log("Auth module loaded", auth);

export const signIn = () => {
    console.log("Sign In clicked");
    // Placeholder sign in workflow
    alert("Sign In functionality coming soon!");
};

document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', signIn);
    }
});
