import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
    // This code runs on your server before upload
          const session = await auth();
    
          if (!session?.user) {
            return redirect("/login");
          }

          return session.user;
}  