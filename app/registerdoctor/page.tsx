"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "../../idl.json";

const publickey = process.env.PROGRAMID
const PROGRAM_ID = new PublicKey(
  idl.metadata.address
);

export default function DoctorForm() {
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    name: "",
    qualification: "",
    image: "",
    specialization: "",
    description: "",
    address: "",
    //This Rating is the fee of the doctor
    fee: "",
    language: "",
    doctor_email: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
    name: "",
    qualification: "",
    image: "",
    specialization: "",
    description: "",
    address: "",
    rating: "",
    language: "",
    doctor_email: "",
  });

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const registerDoctor = async (
    program: anchor.Program,
    payerPublicKey: PublicKey,
    formData: { [x: string]: string; name?: any; qualification?: any; image?: any; specialization?: any; description?: any; address?: any; rating?: any; language?: any; doctor_email?: any; }
  ) => {
    try {
      // Find PDA
      const [doctorPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("doctor"), payerPublicKey.toBuffer()],
        program.programId
      );

      // Create the transaction
      const tx = await program.methods
        .registerDoctor(
          formData.name,
          formData.qualification,
          formData.image,
          formData.specialization,
          formData.description,
          formData.address,
          //This Rating is the fee of the doctor
          parseInt(formData.rating),
          formData.language,
          formData.doctor_email
        )
        .accounts({
          doctorAccount: doctorPda,
          authority: payerPublicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction successful! Signature:", tx);
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected) {
      console.error("Wallet not connected!");
      return;
    }
    if (validateForm()) {
      try {
        if (!anchorWallet || !publicKey) throw new WalletNotConnectedError();

        const provider = new anchor.AnchorProvider(
          connection,
          anchorWallet,
          anchor.AnchorProvider.defaultOptions()
        );
        const program = new anchor.Program(
          idl as anchor.Idl,
          PROGRAM_ID,
          provider
        );
        console.log("Submitting transaction...");

        await registerDoctor(program, publicKey, formData);

        console.log("Doctor registered successfully!");
      } catch (error) {
        console.error("Error registering doctor:", error);
        if (error instanceof WalletNotConnectedError) {
          console.log("Please connect your wallet first!");
        } else if (error.message.includes("Transaction simulation failed")) {
          console.log(`Transaction simulation failed. Error: ${error.message}`);
        } else {
          console.log(`Error registering doctor: ${(error as Error).message}`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faeee7] flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Doctor Registration Form
        </h1>

        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)} *
            </label>
            <input
              type={field === "rating" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              min={field === "rating" ? "0" : undefined}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs italic">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#ff8ba7] hover:bg-[#ff6b85] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>

        <div className="mt-4">
          {!connected ? (
            <p className="text-center text-red-500 text-sm">
              Please connect your wallet
            </p>
          ) : (
            <p className="text-center text-green-500 text-sm">
              Wallet connected: {publicKey?.toString()}
            </p>
          )}
          <WalletMultiButton className="mt-2" />
        </div>
      </form>
    </div>
  );
}
