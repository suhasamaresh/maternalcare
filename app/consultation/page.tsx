"use client";
import React, { useState, useEffect } from "react";
import { FadeText } from "@/components/magicui/fade-text";
import Filter from "@/components/filter";
import BlurFade from "@/components/magicui/blur-fade";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import idl from "../../idl.json";
import * as anchor from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";

// Your program ID
const PROGRAM_ID = new PublicKey(idl.metadata.address);

// Define the Doctor class and schema for Borsh deserialization
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
  experience: string; // Add the 'experience' property
  gender: any;
  constructor(fields: { name: string; qualification: string; image: string; specialization: string; description: string; address: string; rating: number; language: string; doctor_email: string; experience: string; }) {
    this.name = fields.name;
    this.qualification = fields.qualification;
    this.image = fields.image;
    this.specialization = fields.specialization;
    this.description = fields.description;
    this.address = fields.address;
    this.rating = fields.rating;
    this.language = fields.language;
    this.doctor_email = fields.doctor_email;
    this.experience = fields.experience; // Assign the 'experience' property
  }
}

const fetchDoctors = async (connection: anchor.web3.Connection, anchorWallet: Wallet) => {
  try {
    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet,
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);

    const accounts = await program.account.doctorState.all();

    const doctors = accounts.map((account) => {
      const doctor = new Doctor(account.account.data);
      return {
        pubkey: account.publicKey.toBase58(),
        ...doctor,
      };
    });

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

const BentoDemo = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  useEffect(() => {
    const getDoctors = async () => {
      if (anchorWallet) {
        const fetchedDoctors = await fetchDoctors(connection, anchorWallet);
        setFilteredDoctors(fetchedDoctors);
      }
    };

    getDoctors();
  }, [anchorWallet, connection]);

  const handleApplyFilters = (filters: any) => {
    const filtered = filteredDoctors.filter((doctor) => {
      return (
        (filters.gender ? doctor.gender === filters.gender : true) &&
        (filters.experience ? parseInt(doctor.experience) >= parseInt(filters.experience) : true) &&
        (filters.location ? doctor.specialization.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
        (filters.fee ? parseInt("500") <= parseInt(filters.fee) : true)
      );
    });
    setFilteredDoctors(filtered);
  };

  return (
    <div className="bg-[#faeee7] bg-cover bg-center min-h-[100vh] center">
      <div className="center m-[auto] w-[70%]">
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
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="relative col-span-2 lg:col-span-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 "
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                  <p className="text-sm text-gray-600">{doctor.address}</p>
                  <p className="text-sm text-gray-600">{doctor.language}</p>
                  <p className="text-sm text-gray-600">{doctor.doctor_email}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg">Learn more &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-[30px]"></div>
      </div>
    </div>
  );
};

export default BentoDemo;
