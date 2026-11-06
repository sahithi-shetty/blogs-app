export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "60px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#2563eb", fontSize: "40px" }}>
        Welcome to Blogs App
      </h1>

      <p style={{ color: "#555", fontSize: "18px" }}>
        Share your thoughts and explore interesting blogs.
      </p>

      <a
        href="/blogs"
        style={{
          display: "inline-block",
          marginTop: "25px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px"
        }}
      >
        Explore Blogs
      </a>
    </main>
  )
}