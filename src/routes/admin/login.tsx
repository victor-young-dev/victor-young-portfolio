import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { adminLogin } from "@/lib/admin/auth-actions";
import { Button } from "@/components/ui/button";
import { fieldLabelClass, inputClass } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/login")({ component: AdminLoginPage });

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { password } });
      if (!result.ok) {
        setError("Wrong password.");
        setPending(false);
        return;
      }
      navigate({ to: "/admin" });
    } catch {
      setError("Something went wrong. Try again.");
      setPending(false);
    }
  };

  return (
    <div className="bg-bg text-fg flex min-h-svh items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl bg-bg-elevated p-8 shadow-[var(--shadow-border)]"
      >
        <span className="bg-accent/10 text-accent mb-5 grid size-11 place-items-center rounded-full">
          <Lock className="size-5" />
        </span>
        <p className="text-subtle font-mono text-2xs tracking-[0.2em] uppercase">Admin</p>
        <h1 className="font-display mt-2 text-3xl tracking-tight">Enter the password</h1>
        <label className="mt-6 block">
          <span className={fieldLabelClass}>Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} h-11`}
          />
        </label>
        {error ? <p className="text-danger mt-3 text-sm">{error}</p> : null}
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={pending || !password}>
          {pending ? "Checking…" : "Enter"}
        </Button>
      </form>
    </div>
  );
}
