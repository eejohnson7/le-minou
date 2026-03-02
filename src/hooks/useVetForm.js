import { useState, useCallback, useMemo } from "react";

export function useVetForm() {
  const [vetName, setVetName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const reset = useCallback(() => {
    setVetName("");
    setClinicName("");
    setStreet1("");
    setStreet2("");
    setCity("");
    setState("");
    setPostalCode("");
    setPhone("");
  }, []);

  const newVet = useMemo(() => ({
    vet_name: vetName,
    clinic_name: clinicName,
    street_line_1: street1,
    street_line_2: street2 || null,
    city,
    state,
    postal_code: postalCode,
    phone
  }), [
    vetName,
    clinicName,
    street1,
    street2,
    city,
    state,
    postalCode,
    phone
  ]);

  return {
    fields: {
      vetName,
      clinicName,
      street1,
      street2,
      city,
      state,
      postalCode,
      phone
    },
    setters: {
      setVetName,
      setClinicName,
      setStreet1,
      setStreet2,
      setCity,
      setState,
      setPostalCode,
      setPhone
    },
    newVet,
    reset
  };
}