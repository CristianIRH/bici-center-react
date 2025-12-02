import "../assets/css/home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a BiciCenter</h1>
        <p>La mejor tienda de bicicletas, repuestos y accesorios.</p>
      </header>

      <section className="home-seccion">
        <h2>Nuestros productos</h2>
        <p>Explora nuestro catálogo completo.</p>

        <div className="home-buttons">
          <a href="/bicicletas" className="btn-home">Bicicletas</a>
          <a href="/repuestos" className="btn-home">Repuestos</a>
          <a href="/accesorios" className="btn-home">Accesorios</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
