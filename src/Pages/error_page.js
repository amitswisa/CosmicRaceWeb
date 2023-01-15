import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>404</h1>
      <p>
        <i>
          Oops! The page that you looking for{" "}
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}
