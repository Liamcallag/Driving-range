import { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | Florida Driving Ranges',
  description: 'Get in touch with Florida Driving Ranges — report errors, claim a listing, or suggest a range we\'ve missed.',
};

const reasons = [
  {
    icon: '📝',
    color: 'bg-green-100 text-green-700',
    title: 'Claim your listing',
    description: 'Own a driving range? Claim your listing to update hours, add details, or correct information.',
    subject: 'Claim a Listing',
    body: 'Hi,\n\nI would like to claim the listing for my driving range.\n\nRange name:\nAddress:\nWebsite:\n\nPlease contact me to verify ownership.\n\nThanks',
  },
  {
    icon: '🔧',
    color: 'bg-blue-100 text-blue-700',
    title: 'Report an error',
    description: 'Spotted incorrect hours, a wrong address, or outdated information on a listing?',
    subject: 'Report an Error',
    body: 'Hi,\n\nI noticed an error on the following listing:\n\nRange name:\nWhat is incorrect:\nCorrect information:\n\nThanks',
  },
  {
    icon: '📍',
    color: 'bg-orange-100 text-orange-700',
    title: 'Suggest a range',
    description: 'Know a Florida driving range that isn\'t listed? Let us know and we\'ll add it.',
    subject: 'Suggest a Range',
    body: 'Hi,\n\nI\'d like to suggest the following driving range for inclusion:\n\nRange name:\nAddress:\nWebsite:\n\nThanks',
  },
  {
    icon: '💬',
    color: 'bg-purple-100 text-purple-700',
    title: 'General enquiry',
    description: 'Anything else — partnerships, advertising, or general questions about the directory.',
    subject: 'General Enquiry',
    body: 'Hi,\n\n',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-green-900 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-green-100/80 leading-relaxed max-w-xl mx-auto">
            We'd love to hear from you. Choose a reason below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {reasons.map((r) => (
            <a
              key={r.title}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`}
              className="group bg-white border border-slate-200 hover:border-green-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${r.color} flex items-center justify-center text-xl mb-4`} aria-hidden="true">
                {r.icon}
              </div>
              <h2 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors mb-1.5">{r.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{r.description}</p>
              <p className="text-xs text-green-700 font-medium mt-4 group-hover:underline">
                Send email →
              </p>
            </a>
          ))}
        </div>

        {/* Direct email */}
        <div className="bg-green-900 rounded-xl p-6 text-center">
          <p className="text-green-100/70 text-sm mb-2">Prefer to write your own email?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-white hover:text-green-300 font-semibold text-base underline underline-offset-2 transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

      </main>
    </div>
  );
}
