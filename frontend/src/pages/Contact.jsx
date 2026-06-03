import { useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Aapki Web3Forms Access Key yahan jodh di gayi hai
    formData.append("access_key", "9addbcfd-e979-4fa6-b969-b9f6fe2094a9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully! 🎉");
        setSuccess(true);
        event.target.reset();
      } else {
        setResult(data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setResult("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Contact Us</h2>
        <p className="text-slate-500 text-sm mb-6 text-center">Have questions about schemes? Drop us a message safely.</p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
            <input type="text" name="name" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Rahul Kumar" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="rahul@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
            <textarea name="message" required rows="4" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Write your query here..."></textarea>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2.5 rounded-lg shadow-lg hover:opacity-90 transition-all">
            Send Message
          </button>
        </form>
        
        {result && (
          <p className={`mt-4 text-center font-medium text-sm ${success ? 'text-green-600' : 'text-red-500'}`}>
            {result}
          </p>
        )}
      </div>
    </div>
  );
}