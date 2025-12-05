import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const user = auth.currentUser;

  const saveCartToFirestore = async (cart) => {
    if (user) {
      try {
        await setDoc(doc(firestore, 'users', user.uid), { cart });
        console.log('Cart saved to Firestore!');
      } catch (error) {
        console.error('Error saving cart:', error.message);
      }
    }
  };

  const fetchCartFromFirestore = async () => {
    if (user) {
      try {
        const docSnap = await getDoc(doc(firestore, 'users', user.uid));
        if (docSnap.exists()) {
          setCart(docSnap.data().cart || []);
        } else {
          console.log('No cart found');
        }
      } catch (error) {
        console.error('Error fetching cart:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchCartFromFirestore();
  }, [user]);

  useEffect(() => {
    saveCartToFirestore(cart);
  }, [cart]);

  return [cart, setCart];
};

export default useCart;
