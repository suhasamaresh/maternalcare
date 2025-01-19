"use client";

import React, { useState, useEffect } from "react";
import { FadeText } from "@/components/magicui/fade-text";
import Filter from "@/components/filter";
import BlurFade from "@/components/magicui/blur-fade";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "@/public/idl.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Program ID
const PROGRAM_ID = new PublicKey(idl.metadata.address);

// Doctor Class
class Doctor {
  name: string;
  qualification: string;
  image: string;
  specialization: string;
  description: string;
  address: string;
  rating: number;
  language: string;
  doctor_email: string;
  authority: PublicKey;
  constructor(fields: any) {
    this.name = fields.name || "";
    this.qualification = fields.qualification || "";
    this.image = fields.image || "";
    this.specialization = fields.specialization || "";
    this.description = fields.description || "";
    this.address = fields.address || "";
    this.rating = fields.rating || 0;
    this.language = fields.language || "";
    this.doctor_email = fields.doctor_email || "";
    this.authority = fields.authority || new PublicKey("");
  }
}

const fetchDoctors = async (
  connection: anchor.web3.Connection,
  anchorWallet: anchor.Wallet
) => {
  try {
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet,
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);

    const accounts = await program.account.doctorState.all();
    console.log("Doctors fetched:", accounts);

    const doctors = accounts.map((account) => {
      return new Doctor({
        ...account.account,
        authority: account.account.authority,
      });
    });
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

const BentoDemo = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  useEffect(() => {
    const getDoctors = async () => {
      if (anchorWallet) {
        const fetchedDoctors = await fetchDoctors(connection, anchorWallet as anchor.Wallet);
        setDoctors(fetchedDoctors);
      }
    };

    getDoctors();
  }, [anchorWallet, connection]);

  const handleApplyFilters = (filters: any) => {
    // Handle filtering logic (if necessary) here
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleBookAppointment = async () => {
    if (!anchorWallet) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!selectedDoctor || !selectedDoctor.authority) {
      toast.error("Please select a doctor.");
      return;
    }

    setLoading(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: anchorWallet.publicKey,
          toPubkey: selectedDoctor.authority,
          lamports: 0.01 * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = anchorWallet.publicKey;

      const signedTransaction = await anchorWallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      console.log("Transaction signature:", signature);
      await connection.confirmTransaction(signature, "processed");

      toast.success(
        <div>
          Appointment booked successfully! View on
            <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'green',
              textDecoration: 'underline',
              marginLeft: '4px',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'darkgreen';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'green';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
            Solana Explorer
            </a>
        </div>,
        { autoClose: 15000, position: "bottom-right" }
      );
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book an appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#faeee7] bg-cover bg-center min-h-[100vh] center">
      <div className="center m-[auto] w-[70%]">
        <ToastContainer />
        <div className="pt-[100px] text-center">
          <FadeText
            className="text-[45px] text-center font-bold text-[#33272a] bg-clip-text"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.1 } },
            }}
            text="Where would you like to go for your consultation?"
          />
        </div>
        <div className="mt-[25px] text-center">
          <FadeText
            className="center info text-center text-[30px] text-[#706f6f]"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="Choose from our range of specialists and get the care you need."
          />
        </div>
        <BlurFade delay={0.25} inView>
          <div className="items-center mt-[50px]">
            <Filter onApplyFilters={handleApplyFilters} />
          </div>
        </BlurFade>
        <div className="items-center mt-[50px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="relative col-span-2 lg:col-span-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                    <p className="text-sm text-gray-600">{doctor.address}</p>
                    <p className="text-sm text-gray-600">{doctor.language}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg">Learn more &rarr;</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No doctors found.</p>
            )}
          </div>
        </div>

        {modalOpen && selectedDoctor && (
          <div className="fixed inset-0 bg-[#faeee7] bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg w-[80%] md:w-[60%] p-6">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white text-xl bg-[#faeee7] rounded-full p-2"
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-2xl font-bold text-[#33272a]">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.qualification}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.description}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.address}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.language}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.doctor_email}</p>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleBookAppointment}
                  className="bg-[#33272a] text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Book an Appointment"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pb-[30px]"></div>
      </div>
    </div>
  );
};

export default BentoDemo;
