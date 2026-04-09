import { useState } from 'react';

// API base URL - must match backend
const API_BASE = import.meta.env.DEV
  ? 'http://localhost:8080'
  : import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    orgType: '',
    organization: '',
    specialty: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const summaryParts = [
      formData.orgType && `Profile: ${formData.orgType}`,
      formData.organization && `Org: ${formData.organization}`,
      formData.specialty && `Specialty: ${formData.specialty}`,
      formData.message && `Message: ${formData.message}`,
    ].filter(Boolean);

    try {
      const response = await fetch(`${API_BASE}/api/landing/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName || 'Unknown',
          email: formData.email,
          conversation: [
            {
              role: 'user',
              content:
                summaryParts.length > 0
                  ? `Contact form submission – ${summaryParts.join(' | ')}`
                  : 'Contact form submission – no additional details provided.',
            },
          ],
          source: 'contact_form',
          metadata: {
            orgType: formData.orgType,
            organization: formData.organization,
            specialty: formData.specialty,
            formMessage: formData.message,
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          orgType: '',
          organization: '',
          specialty: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to See MedGuide AI in Your Clinic or CME Program?
        </h2>
        <p className="mb-12 text-gray-600">
          Tell us a bit about your setup—clinic, hospital, or MedEd/CME team—
          and we&apos;ll show you how MedGuide AI can plug into your intake,
          triage and education workflows.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-8 text-left shadow-lg"
        >
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-center">
              <div className="mb-1 font-semibold text-green-800">
                🎉 Thank you!
              </div>
              <div className="text-sm text-green-700">
                We&apos;ve received your message and will get back to you within
                24 hours.
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-center">
              <div className="mb-1 font-semibold text-red-800">⚠️ Oops!</div>
              <div className="text-sm text-red-700">
                Something went wrong. Please try again or email us directly at{' '}
                <a
                  href="mailto:ashishsharmastudio@gmail.com"
                  className="font-semibold underline"
                >
                  ashishsharmastudio@gmail.com
                </a>
                .
              </div>
            </div>
          )}

          {/* Name fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
                placeholder="Taylor"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
                placeholder="Long"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
              placeholder="you@organisation.com"
            />
          </div>

          {/* Org type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              What best describes you? <span className="text-red-500">*</span>
            </label>
            <select
              name="orgType"
              value={formData.orgType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            >
              <option value="">Select an option</option>
              <option value="Clinic / Private Practice">
                🏥 Clinic / Private Practice
              </option>
              <option value="Hospital / Health System">
                🏨 Hospital / Health System
              </option>
              <option value="CME / MedEd / Conference">
                🎓 CME / MedEd / Conference Team
              </option>
              <option value="Other / Industry / Startup">
                💼 Other / Industry / Startup
              </option>
            </select>
          </div>

          {/* Organisation */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organisation (Optional)
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
              placeholder="e.g., PeerView, HealthFirst Clinic"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Primary Specialty <span className="text-red-500">*</span>
            </label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            >
              <option value="">Select your specialty</option>
              <option value="Dental">🦷 Dental</option>
              <option value="Surgery">🔪 Surgery</option>
              <option value="Orthopaedic">🦴 Orthopaedic</option>
              <option value="Hematology / Oncology">🩸 Hematology / Oncology</option>
              <option value="CME / MedEd">🎓 CME / MedEd (multi-disease)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
              placeholder="Tell us about your needs—e.g., triage for a dental group, CME-linked assistant for ASH sessions, intake for ortho rehab, etc."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
