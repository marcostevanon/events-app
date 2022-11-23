import { useBoolean, useToast } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db, logout, signInWithGoogle } from '../../app/firebase';

interface LoginControllerHook {
  loginFunction: () => void;
  isLoading: boolean;
}

export const useLoginController = (): LoginControllerHook => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setLoading] = useBoolean();

  const loginFunction = React.useCallback(async () => {
    setLoading.on();
    try {
      const user = await signInWithGoogle();
      console.log('signInWithGoogleWrapper ~ user', user);

      if (!user || !user.email) {
        toast({
          title: `Semething went wrong, try again!`,
          position: 'top-right',
          status: 'error',
          isClosable: false,
        });
        setLoading.off();
        return;
      }

      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // doc.data() will be undefined in this case
        throw new Error('No such document!');
      }

      navigate('/dashboard/cities');
    } catch (err) {
      await logout();
      setLoading.off();
      navigate('/unauthorized');
      console.error(err);
    }
  }, [navigate, setLoading, toast]);

  return { loginFunction, isLoading };
};
