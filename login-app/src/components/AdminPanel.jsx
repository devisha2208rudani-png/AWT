import UserProfile from "./UserProfile";

export default function AdminPanel({ user }) {
  return (
    <div className="page">
      <h1>Faculty Admin Panel</h1>
      <UserProfile user={user} />
    </div>
  );
}