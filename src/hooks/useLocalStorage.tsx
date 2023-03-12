import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useLocalStorage(tokenName: string) {
  const [token, setToken] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const localtoken = localStorage.getItem(tokenName);
    if (localtoken) {
      setToken(localtoken);
    } else {
      router.replace("/login");
    }
  }, []);

  return token;
}
