import { Link, Outlet } from "react-router-dom";

const Offers = () => {
  return (
    <>
      <p>Available Offers</p>
      <ul>
        <li>
          <Link to="/offers/p1">Debit Card Offers</Link>
        </li>
        <li>
          <Link to="/offers/p2">UPI Offers</Link>
        </li>
        <li>
          <Link to="/offers/p3">EMI Offers</Link>
        </li>
        <li>
          <Link to="/offers/p4">Credit Card Offers</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Offers;
