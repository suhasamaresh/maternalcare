import { useState } from "react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive maternal care services including prenatal care, postnatal care, and childbirth education classes.",
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment through our website by navigating to the appointments section and selecting a suitable time slot.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring your ID, insurance information, and any previous medical records related to your pregnancy.",
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes, we offer online consultations for our patients. You can schedule an online consultation through our website.",
  },
  {
    question: "Are transactions only done through solana?",
    answer: "Yeah this application uses solana blockchain for transactions. So you need to have a solana wallet to make transactions.",
  },
];

const FaqCard = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-[#33272a] bg-[#ff8ba7] rounded-xl shadow-sm xl:ml-28 xl:mr-28">
      <div
        className="flex justify-between transition-all duration-1000 ease-in-out items-center p-4 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">Q:{question}</h3>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </div>
      <div
        className={`transition-all duration-1000 ease-in-out overflow-hidden  ${
          isOpen ? "max-h-96 opacity-100 " : "max-h-0 opacity-0"
        }`}
      >
        <p className="p-4 text-[#33272a]">{answer}</p>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      

      <section>
        <h2 className="text-2xl font-bold text-center text-[#33272a] mb-6">FAQs</h2>
        <div>
          {faqs.map((faq, index) => (
            <FaqCard key={index} {...faq} />
          ))}
        </div>
      </section>
    </div>
  );
}
