import { useRouteError } from "react-router-dom";
import AppLinks from "./AppLinks";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <AppLinks />
      <main id="error-content">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
