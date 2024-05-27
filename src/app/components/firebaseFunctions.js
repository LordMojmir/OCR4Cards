import { collection, addDoc, Timestamp, getDoc , getDocs} from 'firebase/firestore';
import { db, app } from '@/lib/firebase';
import 'firebaseui/dist/firebaseui.css'

async function saveOcrDataToFirebase(userId, data) {
    console.log("UserID", userId, "data", data)
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
    console.log("UserID", userId);
    
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

async function getAllUserContacts(userId) {
    const contactsCollectionRef = collection(db, "users", userId, "contacts");

    try {
        const querySnapshot = await getDocs(contactsCollectionRef);
        const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Contacts retrieved:", contacts);
        return contacts;
    } catch (error) {
        console.error("Error retrieving contacts:", error);
        return [];
    }
}

export { saveOcrDataToFirebase, getAllUserContacts};

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


getAllUserContacts("oq6e7XMHmZ5liQafLjf8");
