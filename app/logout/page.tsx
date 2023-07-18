import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Cerrando sesión...",
}

async function logout() {
  const router = useRouter();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/logout`, {
    credentials: "include",
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.log("Error al cerrar sesión");
    return;
  }
  router.push("/");
}

export default async function Logout() {
  await logout();
  return <></>;
}
