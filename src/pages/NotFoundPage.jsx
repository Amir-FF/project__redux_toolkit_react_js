import { Link } from "react-router";
import { ROUTES } from "../constants/routes";
import PageTitle from "../components/common/PageTitle";

const NotFoundPage = () => (
  <>
    <PageTitle>Not Found: error 404</PageTitle>
    <Link to={ROUTES.home} className="text-blue-600 underline">
      Back to Home
    </Link>
  </>
);

export default NotFoundPage;
