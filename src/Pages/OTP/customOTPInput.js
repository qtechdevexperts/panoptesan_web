import React from "react";
import { styled } from "@mui/system";
import { MuiOtpInput } from "mui-one-time-password-input";

export const RoundedInput = styled("input")({
  borderRadius: "50%", // Set the border radius to 50% for a circular appearance
  backgroundColor: "white", // Set the background color to white
  color: "rgba(0, 0, 0, 0.5)",
  font: "normal normal 600 30px/38px Quicksand",
  fontWeight: "bold",
  fontSize: "40px",
  border: "none",
  width: "100%",
  textAlign: "center",
  padding: "10px 0",
  height: "50px", // Set the desired height for the input
  lineHeight: "50px", // Set the lineHeight equal to the height for a circular appearance
});

export const CustomOTPInput = styled(MuiOtpInput)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  overflow: "hidden", // Hide the inner inputs that extend beyond the container
  "& .MuiOutlinedInput-root": {
    flex: 1,
    "&:not(:first-child)": {
      marginLeft: theme.spacing(15),
    },
    "& .MuiOutlinedInput-input": {
      padding: 0,
      "&::selection": {
        // Set the desired opacity for the selected/highlighted text
      },
    },
    "& input": {
      backgroundColor: "white", // Set the background color of the input to white
      borderRadius: "50%", // Set the border radius to 50% for a circular appearance
      height: "50px", // Set the desired height for the input
      lineHeight: "50px", // Set the lineHeight equal to the height for a circular appearance
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Remove the border from the div encapsulating the input
  },
}));
