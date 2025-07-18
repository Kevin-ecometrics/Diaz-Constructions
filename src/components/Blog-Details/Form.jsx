import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="flex-1 px-4 py-3 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent"
        />
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="number"
          className="flex-1 px-4 py-3 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent"
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address..."
        className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Type Your Message"
        rows={6}
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent resize-none"
      ></textarea>

      <button
        onClick={handleSubmit}
        aria-label="Send Message"
        className="w-full bg-background hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Send Message
      </button>
    </div>
  );
};

export default Form;
