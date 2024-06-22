import { Link } from "react-router-dom";

// import styles from './NotFound.module.scss';
export function NotFound() {
  return (
    <div
      className="is-flex is-flex-direction-column is-justify-content-center"
      style={{ height: "100vh", width: "100vw"}}
    >
      <div className="is-flex is-flex-direction-column is-align-items-center ">
        <div
          className="title is-1 has-text-danger"
          style={{ fontSize: "150px" }}
        >
          404
        </div>
        <div className="subtitle is-1 has-text-warning	">Page Not Found</div>
        <p>The page you are looking for does not exist.</p>
        <Link className="has-text-success" to="/">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
