import { onAuthStateChanged, User } from "@firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/configs/firebase";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
