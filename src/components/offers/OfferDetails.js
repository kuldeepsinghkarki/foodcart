import { useLoaderData, useParams } from "react-router-dom";
import { fetchDataByParams } from "../../utils/DataUtils";

import classes from "./OfferDetails.module.css";

const backendURL = process.env.REACT_APP_DB_HOST + process.env.REACT_APP_OFFERS;

const OfferDetails = () => {
  const offerDetails = useLoaderData();
  const params = useParams();

  return (
    <section className={classes.offer}>
      <div>
        <div className={classes.description}>
          {offerDetails.name} via {params.offer}
        </div>
        <div className={classes.description}>{offerDetails.description}</div>
        <div className={classes.discount}>Discount {offerDetails.amount}%</div>
      </div>
    </section>
  );
};

export default OfferDetails;

export function offerDetailsLoader({ params }) {
  return fetchDataByParams(backendURL, params.offer);
}
