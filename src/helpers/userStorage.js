import { useEffect, useState } from 'react';

function useUserStorage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return user;
}

export default useUserStorage;
