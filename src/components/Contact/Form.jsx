import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

// ✅ Define schema with Zod (updated max length for message)
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  number: z
    .string()
    .min(10, "Number must be at least 10 digits")
    .regex(/^[0-9+\-\s]+$/, "Invalid number format"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(500, "Message must not exceed 500 characters"),
});

// ✅ Country codes data
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+58", country: "VE", flag: "🇻🇪" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
];

const Form = () => {
  // ✅ States with useState
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+1",
    number: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Character limit constant
  const MESSAGE_MAX_LENGTH = 500;

  // ✅ Function to update fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para el mensaje, limitar caracteres
    if (name === "message" && value.length > MESSAGE_MAX_LENGTH) {
      return; // No actualizar si excede el límite
    }

    // Update field
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ✅ Function to validate form
  const validateForm = () => {
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // ✅ Function to reset form
  const resetForm = () => {
    setFormData({
      name: "",
      countryCode: "+1",
      number: "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  // ✅ Function to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before sending
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading("Sending form...");

      await axios.post("https://diazconstructions.com/send-contact", formData);

      // Close loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Form sent successfully! ✅", {
        duration: 4000,
        icon: "🚀",
      });

      // Reset form after success
      resetForm();
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error("Error sending the form ❌", {
        duration: 4000,
        icon: "💔",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-background font-semibold text-sm uppercase tracking-wide">
                GET IN TOUCH
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                We are always ready to help you and answer your questions
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pacific hake false trevally queen parrotfish black prickleback
                mosshead warbonnet sweeper! Greenling sleeper.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Let's Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-200 focus:ring-background"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex">
                    {/* Country Code Selector */}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`px-3 py-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 bg-gray-50 text-sm transition-colors ${
                        errors.number
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-background"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="123 456 7890"
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-3 border rounded-r-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.number
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-200 focus:ring-background"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-background"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* ✅ Textarea with character counter */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Your Message"
                  rows={6}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${
                    errors.message
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-background"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                ></textarea>

                {/* ✅ Character Counter */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      formData.message.length > MESSAGE_MAX_LENGTH * 0.9
                        ? "text-red-600 bg-red-50"
                        : formData.message.length > MESSAGE_MAX_LENGTH * 0.8
                        ? "text-yellow-600 bg-yellow-50"
                        : "text-gray-500 bg-gray-50"
                    }`}
                  >
                    {formData.message.length}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Send Message"
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-background hover:bg-orange-600 hover:transform hover:scale-105"
                } text-white`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* ✅ Toaster Configuration */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                success: {
                  style: {
                    background: "#10B981",
                  },
                },
                error: {
                  style: {
                    background: "#EF4444",
                  },
                },
                loading: {
                  style: {
                    background: "#3B82F6",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
