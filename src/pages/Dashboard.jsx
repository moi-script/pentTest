import { Auth } from "../auth";

export default function Dashboard() {
  const user = Auth.getUser();

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.nickname || user?.name} 👋</h1>
      <div className="card">
        <h3>Account Overview</h3>
        <p>Email: {user?.email}</p>
      </div>
      <div className="card">
        <h3>Recent Activity</h3>
        <p>No recent activity yet.</p>
      </div>
    </div>
  );
}
