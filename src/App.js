import React, { useCallback, useEffect, useState } from 'react';
import { db, auth } from './firebase/config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

const App = () => {
  const [name, setName] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [address, setAddress] = useState('');
  const [customers, setCustomers] = useState([]);
  const customersCollectionRef = collection(db, 'customers');

  onAuthStateChanged(auth, (createUser) => {
    setIsAuth(createUser);
  });
  const provider = new GoogleAuthProvider();

  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        setIsAuth(true);
        // const token = credential.accessToken;
        // const user = result.user;
      })
      .catch((error) => {
        console.log(error.message);
        // const errorCode = error.code;
        // const errorMessage = error.message;

        // const email = error.email;

        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCustomers = useCallback(async () => {
    try {
      const data = await getDocs(customersCollectionRef);
      const mapData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCustomers(mapData);
    } catch (error) {
      console.log(error.message);
    }
  }, [customersCollectionRef]);

  const createCustomer = async () => {
    try {
      await addDoc(customersCollectionRef, { name, address });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCustomer = async (id, address, name) => {
    try {
      const customerDoc = doc(db, 'customers', id);
      const updatedData = { address, name };
      await updateDoc(customerDoc, updatedData);
    } catch (error) {
      console.log(error.messCustomer);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const customerDoc = doc(db, 'customer', id);
      await deleteDoc(customerDoc);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
      <div>
        {isAuth ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
      {isAuth ? (
        <>
          <div>
            <h1>Create Customer</h1>
            <form onSubmit={createCustomer}>
              <input
                placeholder="Enter Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Enter Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit">Create Customer</button>
            </form>
          </div>

          <div>
            <h1>Customers</h1>
            {customers
              ? customers?.map((user) => (
                  <div key={user.id}>
                    <span>{user.name}</span>
                    <span>{user.age}</span>
                    <button
                      onClick={updateCustomer(user.id, user.age, user.name)}
                    >
                      Edit User
                    </button>
                    <button onClick={deleteCustomer(user.id)}>
                      Delete User
                    </button>
                  </div>
                ))
              : 'No user yet'}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default App;
