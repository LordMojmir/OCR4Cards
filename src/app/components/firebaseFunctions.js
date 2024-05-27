import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, app } from '@/lib/firebase';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


 async function firebaseFunctions(userId, data) {
    const contactsCollectionRef = collection(db, "users", userId, "contacts");
     console.log(data)
    try {
        // Loop through each contact data and add to Firestore
        for (const contact of data) {
            await addDoc(contactsCollectionRef, {
                ...contact,
                createdAt: Timestamp.now()
            });
        }
        console.log("OCR result saved to Firestore");
        return true
        } catch (error) {
        console.error("Error saving to Firestore:", error);
        return false
    }
}


async function getAllContacts(userId) {
    const contactsCollectionRef = collection(db, "users", userId, "contacts");

    try {
        const querySnapshot = await getDocs(contactsCollectionRef);
        const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Contacts retrieved from Firestore:", contacts);
        return contacts;
    } catch (error) {
        console.error("Error retrieving contacts from Firestore:", error);
        return [];
    }
}

function getAuthentication(){

    var uiConfig = {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: './',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
            window.location.assign('./accounts');
        }
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());



}
export default {getAllContacts, firebaseFunctions}

// users.oq6e7XMHmZ5liQafLjf8.contacts

// [{
//     'firstname': 'Lukas',
//     'lastname': 'Fischer',
//     'company': 'AI RESEARCH AND FUNDING',
//     'phone': ['+43 676 852 488 828'],
//     'email': ['lukas.fischer@annotation.at', 'verein@annotation.at']
// }, {
//     'firstname': 'Michael',
//     'lastname': 'Sattler',
//     'company': 'OMNINET SOFTWARE SOLUTIONS',
//     'phone': ['+43 (1) 8903900 901', '+43 664 4528350'],
//     'email': ['michael.sattler@omninet.at']
// }]
