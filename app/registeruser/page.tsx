"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import idl from "@/idl.json";

const PROGRAM_ID = new PublicKey(
  idl.metadata.address // Replace with the address of the user registration program
);

export default function UserForm() {
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    firstname: "",
    lastname: "",
    age: "",
    image: "",
    address: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
    firstname: "",
    lastname: "",
    age: "",
    image: "",
    address: "",
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

  const registerUser = async (
    program: anchor.Program,
    payerPublicKey: PublicKey,
    formData: { [x: string]: string }
  ) => {
    try {
      // Find PDA
      const [userPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("user"), payerPublicKey.toBuffer()],
        program.programId
      );

      // Ensure age is an integer
      const age = parseInt(formData.age, 10);

      // Create the transaction
      const tx = await program.methods
        .registerUser(
          formData.firstname,
          formData.lastname,
          age,
          formData.image,
          formData.address
        )
        .accounts({
          userAccount: userPda,
          authority: payerPublicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success("User registered successfully!");
      console.log("Transaction successful! Signature:", tx);
    } catch (error) {
      toast.error("Error registering user. Please try again.");
      console.error("Error registering user:", error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!connected) {
      toast.error("Wallet not connected!");
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

        await registerUser(program, publicKey, formData);

        console.log("User registered successfully!");
      } catch (error) {
        if (error instanceof WalletNotConnectedError) {
          toast.error("Please connect your wallet first!");
        } else if ((error as Error).message.includes("Transaction simulation failed")) {
          toast.error(`Transaction simulation failed. Error: ${(error as Error).message}`);
        } else {
          toast.error(`Error registering user: ${(error as Error).message}`);
        }
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faeee7] flex items-center justify-center p-5">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          User Registration Form
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
              type={field === "age" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              min={field === "age" ? "0" : undefined}
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
        <p className="font-mono text-[#eed202] ">
          NOTE: Do not use wallet addresses which are already registered. This will result in an error.
        </p>

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

        <div className="mt-4">
          <p className="text-center text-gray-500 text-sm">
            Note: The wallet address connected on the main page will be used for transactions.
          </p>
        </div>
      </form>
    </div>
  );
}
