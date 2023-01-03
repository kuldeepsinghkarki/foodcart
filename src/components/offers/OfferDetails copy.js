import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./OfferDetails.module.css";

const backendURL = process.env.REACT_APP_DB_HOST + process.env.REACT_APP_OFFERS;

const OfferDetailsCopy = () => {
  const location = useLocation();
  const params = useParams();
  const [offerDetails, setOfferDetails] = useState({ name: "", description: "", amount: "" });
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let myOfferDetails;
    setSpinner(true);
    fetch(backendURL).then((response) => {
      response
        .json()
        .then((data) => {
          let id = params.offer;
          myOfferDetails = data[id];
          setOfferDetails(myOfferDetails);
          setSpinner(false);
        })
        .catch((err) => {
          console.log("Got exception while fetching Offer details", err);
        });
    });
  }, [params]);

  const clearDetails = () => {
    navigate(-1);
  };

  return (
    <section className={classes.offer}>
      {offerDetails && (
        <div>
          <div>{spinner && <LoadingSpinner />}</div>
          <h3>
            {offerDetails.name} : {location.pathname}
          </h3>
          <h5>Offer ID : {params.offer}</h5>
          <div className={classes.description}>{offerDetails.description}</div>
          <div className={classes.discount}>Discount {offerDetails.amount}</div>
          <button onClick={clearDetails}>Clear Details</button>
        </div>
      )}
      {!offerDetails && <h3>Offer not found</h3>}
    </section>
  );
};

export default OfferDetailsCopy;
