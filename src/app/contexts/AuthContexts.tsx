import { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../services/storage";
import { User } from "../types/auth";

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(token: string, user: User): Promise<void>;
  signOut(): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = await storage.getUser();
      const storagedToken = await storage.getUser();

      if (storagedToken && storagedUser) {
        setUser(storagedUser);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signIn(token: string, user: User) {
    setUser(user);
    await storage.saveAuthData(token, user);
  }

  async function signOut() {
    await storage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
