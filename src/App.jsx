import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Welcome to AquaScore 🌍</h2>
        <p>
          A dashboard visualizing the environmental impact of AI models —
          including water and energy use.
        </p>
      </main>
    </div>
  );
}
