import React from "react";
import Link from "next/link";
import Embed from "./embed";

const ConsultationCard: React.FC = () => {
  return (
    <div className="bg-[#faeee7] h-[450px] flex items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-20 gap-1">
        {Array.from({ length: 20 * 12 }, (_, index) => (
          <Embed key={index} />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="relative w-full p-10 bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gradient-to-r from-[#ff8ba7] to-[#ff718c]">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-2 pointer-events-none">
            {[...Array(25)].map((_, index) => (
              <div
                key={index}
                className="bg-[#ff8ba7] rounded-lg opacity-0 group-hover:opacity-50 transition-opacity"
              />
            ))}
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0 md:space-x-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-[#33272a] mb-4">
                Book a Consultation
              </h2>
              <p className="text-[#594a4e] mb-6">
                Book a consultation with our experienced doctors to discuss your
                health concerns.
              </p>
              <Link href="/consultation">
                <div className="block w-full bg-[#ff8ba7] text-white text-center py-3 rounded-md hover:bg-[#ff718c] transition-colors cursor-pointer">
                  Book Now
                </div>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold text-[#33272a] mb-4">
                Consultation Description
              </h2>
              <p className="text-[#594a4e] mb-6">
                Our consultation service offers personalized sessions with expert
                doctors to address your health needs. Whether it's a routine
                check-up or a specific health concern, our team is here to assist
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
