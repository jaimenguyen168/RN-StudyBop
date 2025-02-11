import { Redirect } from "expo-router";
import { useAuthContext } from "@/contexts/firebase-auth";

export default function Index() {
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) return null;

  if (isLoggedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/onboarding" />;
}
