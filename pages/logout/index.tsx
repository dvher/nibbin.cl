import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  if (typeof window !== "undefined") document.title = "Cerrando sesión...";

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/logout`, {
      credentials: "include",
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        console.log("Error al cerrar sesión");
        return;
      }
      router.push("/");
    });
  }, []);

  return <></>;
}
