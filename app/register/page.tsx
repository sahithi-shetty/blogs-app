import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "24px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Register</h2>
      <form action={registerUser} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Username</label>
          <input 
            type="text" 
            name="username" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Password</label>
          <input 
            type="password" 
            name="password" 
            required 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ padding: "10px", marginTop: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Register
        </button>
      </form>
    </div>
  );
}