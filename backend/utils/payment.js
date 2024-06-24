import Flutterwave from "flutterwave-node-v3";
import dotenv from "dotenv";
dotenv.config();

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
async function processPayment({
  phoneNumber,
  amount,
  currency,
  appointmentId,
  email,
  req,
}) {
  const protocol = req.protocol;
  const host = req.get("host");

  const txRef = `appointment-${appointmentId}-${Date.now()}`;
  const redirect_url = `${protocol}://${host}/api/v1/payment-success`;

  console.log("Redirect URL:", redirect_url);

  const payload = {
    tx_ref: txRef,
    amount,
    currency,
    redirect_url: redirect_url,
    phone_number: phoneNumber,
    email: email,
    order_id: appointmentId.toString(),
  };

  try {
    const response = await flw.MobileMoney.rwanda(payload);
    console.log("Payment initiation response:", response);
    return response;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw new Error("Payment initiation failed");
  }
}

export default processPayment;
