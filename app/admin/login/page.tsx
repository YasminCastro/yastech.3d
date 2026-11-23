import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Window } from "@/components/site/window"
import { adminConfigurado, sessaoValida } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Admin", robots: { index: false } }

export default async function LoginPage() {
  if (await sessaoValida()) redirect("/admin")
  return (
    <main className="bg-checker flex flex-1 items-center justify-center px-4 py-16">
      <Window title="admin.exe" controls="min-close" className="w-full max-w-sm drop-md" bodyClassName="p-5">
        {adminConfigurado() ? (
          <LoginForm />
        ) : (
          <p className="text-ink-soft">
            Defina a variável <b>ADMIN_PASSWORD</b> no arquivo <b>.env.local</b> e reinicie o servidor para liberar o acesso.
          </p>
        )}
      </Window>
    </main>
  )
}
