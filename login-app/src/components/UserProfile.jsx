export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="profile">
      <h3>User Profile</h3>

      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <p>College: {user.college || "N/A"}</p>
    </div>
  );
}