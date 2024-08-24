"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "../../idl.json";

const PROGRAM_ID = new PublicKey("F56z9E7gPrvD95Z2WTfSPrFuhdEyqcLoXcwpsvvck77P");

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
    rating: "",
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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const registerDoctor = async (
    program: anchor.Program,
    payerPublicKey: PublicKey,
    formData: { 
      name: string;
      qualification: string;
      image: string;
      specialization: string;
      description: string;
      address: string;
      rating: string; // Note: It's a string here, but needs to be converted to u8
      language: string;
      doctor_email: string;
    }
  ) => {
    try {
      // Derive the doctor PDA
      const [doctorPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("doctor"), payerPublicKey.toBuffer()],
        program.programId
      );

      // Derive the registry PDA
      const [registryPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("registry")],
        program.programId
      );

      // Prepare the transaction
      const tx = await program.methods
        .registerDoctor(
          formData.name,
          formData.qualification,
          formData.image,
          formData.specialization,
          formData.description,
          formData.address,
          parseInt(formData.rating), // Convert rating to u8
          formData.language,
          formData.doctor_email
        )
        .accounts({
          doctorAccount: doctorPda,
          authority: payerPublicKey,
          registryAccount: registryPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction successful! Signature:", tx);
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
        console.log(program);
        console.log(program.account.doctorState.all())

        await registerDoctor(program, publicKey, {
          name: formData.name,
          qualification: formData.qualification,
          image: formData.image,
          specialization: formData.specialization,
          description: formData.description,
          address: formData.address,
          rating: formData.rating,
          language: formData.language,
          doctor_email: formData.doctor_email,
        });

        console.log("Doctor registered successfully!");
      } catch (error) {
        console.error("Error registering doctor:", error);
        if (error instanceof WalletNotConnectedError) {
          console.log("Please connect your wallet first!");
        } else if ((error as Error).message.includes("Transaction simulation failed")) {
          console.log(`Transaction simulation failed. Error: ${(error as Error).message}`);
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
          <p className="text-center text-yellow-500 text-sm">
            Note: The default wallet address is the one you selected on the main page. 
            If you wish to use a different wallet address, please use the button below to switch your wallet.
          </p>
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
