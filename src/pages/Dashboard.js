import "../styles/pages.css";

function Dashboard() {
  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Repuesto 1</td>
              <td>$20.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
