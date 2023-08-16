import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckSubscription } from "../../Services/Profile";
import {
  MakeStripePurchase,
  PurchaseSubscription,
} from "../../Services/Profile";

import { TextField } from "@mui/material";
import Button from "@material-ui/core/Button";

const stripePromise = loadStripe(
  "pk_test_51NG3fqKsOuXXDZeSK4rQR8uSvzphBgQq8tdBvTRItLZdFZzqCHpK8BYtUYgclbPuMvdyq5vBEWBQB02agpwpFeNW00dcKfmEO3"
);

export const PaymentMethodComponent = () => {
  const location = useLocation();
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const searchParams = new URLSearchParams(location.search);
  const packageId = searchParams.get("packageId");
  const amount = parseInt(searchParams.get("price"));
  const userId = searchParams.get("user_id");
  const body = {
    amount,
    packageId,
  };

  const checkSubscription = async () => {
    try {
      const res = await CheckSubscription(userId);
      if (+res?.code === 200) {
        if (res.data.available_storage > 0) {
          setSubscribed(true);
          setShowModal(true); // Show the modal
        }
      }
    } catch (error) {
      // Handle error
    }
  };
  const navigationURL = useNavigate();
  const navigateToHome = () => {
    setShowModal(false);
    navigationURL("/home");
  };
  checkSubscription();

  return (
    <>
      <div className="body-wrapper">
        <div className="content">
          {!subscribed ? (
            <section className="section-padding">
              <Elements stripe={stripePromise}>
                <PaymentForm body={body} />
              </Elements>
            </section>
          ) : null}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-xl font-semibold mb-4">
                  User Already Subscribed
                </p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={navigateToHome}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ... (rest of the code remains the same)

const PaymentForm = ({ body }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // Your code for handling the payment result and showing snackbar message goes here

    // For example:
    if (error) {
      setError(error.message);
    } else {
      // Make the API call for payment and subscription
      // You can use MakeStripePurchase and PurchaseSubscription functions here
      // ...

      // Show the success snackbar message
      setSnackbarSeverity("success");
      setSnackbarMessage("Payment successful!");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <p>Payment details</p>
        </div>
        <div className="form-container">
          <div className="card-container">
            <label>Card Details</label>
            <div className="card-element-container">
              <CardElement />
            </div>
          </div>
          {error && <div>{error}</div>}
          {
            <div className="linkbtn">
              <Button
                style={{
                  borderRadius: "50px",
                  padding: "22.5px",
                  width: "55%",
                  marginLeft: 0,
                }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                className="btn btn-primary"
              >
                <span className="login-text">Pay Now</span>
              </Button>
            </div>
          }
        </div>
      </form>
    </>
  );
};
