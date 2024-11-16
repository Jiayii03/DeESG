"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-left text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "What is DeESG?",
      answer:
        "DeESG is a revolutionary decentralized ESG reporting platform that leverages blockchain technology to enable transparent, verifiable, and standardized Environmental, Social, and Governance reporting for organizations of all sizes. Our platform ensures data integrity and builds trust in ESG reporting through decentralized verification mechanisms.",
    },
    {
      question: "How does it work?",
      answer:
        "DeESG utilizes blockchain technology and smart contracts to create immutable, transparent records of ESG metrics. Organizations can securely input their sustainability data, which is then verified through our decentralized network of validators. This creates a trustless system where all stakeholders can access reliable, verified ESG information.",
    },
    {
      question: "How do you use DeESG?",
      answer:
        "Getting started with DeESG is simple: connect your wallet, input your organization's ESG metrics through our intuitive dashboard, and let our platform handle the verification process. You can track progress in real-time, generate comprehensive reports, and share verified ESG credentials with stakeholders, investors, and regulatory bodies.",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-left mb-12">
        <span className="bg-green-100 px-4 py-2 rounded">FAQ</span>
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
        <div className="h-[10vh]" />
      </div>
    </section>
  );
}
