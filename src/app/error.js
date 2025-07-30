"use client";
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Link from 'next/link'

export default function ErrorSnackbar({ error, reset }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <h1 className="text-6xl font-extrabold text-red-500">500</h1>
          <p className="mt-4 text-xl text-gray-700">
           The something wrong with server
          </p>
          <p className="mt-2 text-gray-500">
            Please reload or click below
          </p>

          <div className="mt-6">
            <Link href="/"> Go Back Home</Link>
          </div>
        </div>
      </div>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000} // Duration for how long the Snackbar is shown
          onClose={handleClose}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Something went wrong! Please try again later.
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
