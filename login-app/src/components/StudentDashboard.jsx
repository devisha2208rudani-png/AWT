import UserProfile from "./UserProfile";

export default function StudentDashboard({ user }) {
  return (
    <div className="page">
      <h1>Student Dashboard</h1>
      <UserProfile user={user} />
    </div>
  );
}