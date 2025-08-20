import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="font-semibold text-brand-700">🩺 Medical Bot</div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={logout}
              className="text-sm rounded border px-3 py-1 hover:bg-gray-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
