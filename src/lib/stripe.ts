import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51Qm2q8L5zVECxFBqaUTceTFUneAYqjZV0NDVb7CY5Beivsmp3IYjZhYtpNK0EEQfyOqH0tFtHRs4NiJD2CY3ugCS00FtOBw2ku",
  {
    apiVersion: "2022-08-01",
    appInfo: {
      name: "ignite_shop",
    },
  }
);
