import React, { useState } from "react";

function Card() {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    {
      title: "WHAT'S INCLUDED:",
      content: [
        {
          title: "Personalized Design Consultation:",
          description:
            "Our team of architects and designers collaborate with you to conceptualize a layout that suits your preferences, lifestyle, and budget. From layout to finishing touches, every detail is customized.",
        },
        {
          title: "High-Quality Materials & Craftsmanship:",
          description:
            "We prioritize quality in every aspect of your home. With carefully sourced materials and skilled professionals, we ensure that each element, from foundation to finishing, meets our high standards.",
        },
        {
          title: "Project Management & Updates:",
          description:
            "We take the stress out of building with a dedicated project manager, providing regular updates and transparent timelines so you're informed at every stage.",
        },
      ],
    },
    {
      title: "NO COMPROMISES ON QUALITY",
      content: [
        {
          title: "Premium Materials Selection:",
          description:
            "We source only the finest materials from trusted suppliers, ensuring durability and aesthetic excellence that stands the test of time.",
        },
        {
          title: "Expert Craftsmanship:",
          description:
            "Our skilled artisans and contractors bring decades of experience to every project, delivering workmanship that exceeds industry standards.",
        },
        {
          title: "Quality Assurance Process:",
          description:
            "Every phase undergoes rigorous quality checks and inspections to guarantee that your home meets our exacting standards before completion.",
        },
      ],
    },
    {
      title: "CUSTOMIZED SOLUTIONS",
      content: [
        {
          title: "Tailored Design Approach:",
          description:
            "Every home is designed specifically for your unique needs, lifestyle, and vision. We don't believe in one-size-fits-all solutions.",
        },
        {
          title: "Flexible Planning Options:",
          description:
            "From initial concept to final details, we adapt our services to match your budget, timeline, and specific requirements.",
        },
        {
          title: "Personal Style Integration:",
          description:
            "We work closely with you to incorporate your personal taste and preferences into every aspect of the design and construction process.",
        },
      ],
    },
  ];

  return (
    <section className="mx-auto container mt-10 text-black bg-white rounded-3xl shadow-lg overflow-hidden  ">
      {/* Header Tabs */}
      <header>
        <ul className="flex flex-col md:flex-row justify-around items-start p-4 md:p-0 md:items-center">
          {tabData.map((tab, index) => (
            <li key={index} className="flex-1">
              <button
                onClick={() => setActiveTab(index)}
                className={`w-full text-lg md:text-xl font-bold hover:cursor-pointer hover:text-orange-600 text-center py-4 md:py-6 transition-all duration-300 rounded-t-3xl ${
                  activeTab === index
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </header>

      {/* Tab Content */}
      <div className="p-8 md:p-12 border-t-2">
        <div className="space-y-8">
          {tabData[activeTab].content.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Card;
