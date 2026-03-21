import { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | Florida Driving Ranges',
  description: 'Get in touch with Florida Driving Ranges — report errors, claim a listing, or suggest a range we\'ve missed.',
};

const reasons = [
  {
    icon: '📝',
    title: 'Claim your listing',
    description: 'Own a driving range? Claim your listing to update hours, add details, or correct information.',
    subject: 'Claim a Listing',
    body: 'Hi,\n\nI would like to claim the listing for my driving range.\n\nRange name:\nAddress:\nWebsite:\n\nPlease contact me to verify ownership.\n\nThanks',
  },
  {
    icon: '🔧',
    title: 'Report an error',
    description: 'Spotted incorrect hours, a wrong address, or outdated information on a listing?',
    subject: 'Report an Error',
    body: 'Hi,\n\nI noticed an error on the following listing:\n\nRange name:\nWhat is incorrect:\nCorrect information:\n\nThanks',
  },
  {
    icon: '📍',
    title: 'Suggest a range',
    description: 'Know a Florida driving range that isn\'t listed? Let us know and we\'ll add it.',
    subject: 'Suggest a Range',
    body: 'Hi,\n\nI\'d like to suggest the following driving range for inclusion:\n\nRange name:\nAddress:\nWebsite:\n\nThanks',
  },
  {
    icon: '💬',
    title: 'General enquiry',
    description: 'Anything else — partnerships, advertising, or general questions about the directory.',
    subject: 'General Enquiry',
    body: 'Hi,\n\n',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">Get in touch</p>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">Contact Us</h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We'd love to hear from you. Choose a reason below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {reasons.map((r) => (
            <a
              key={r.title}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`}
              className="group bg-white border border-slate-200 hover:border-green-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-3">{r.icon}</div>
              <h2 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors mb-1">{r.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{r.description}</p>
              <p className="text-xs text-green-700 font-medium mt-3 group-hover:underline">
                Send email →
              </p>
            </a>
          ))}
        </div>

        {/* Direct email */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 text-center">
          <p className="text-sm text-slate-500 mb-1">Prefer to write your own email?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-green-700 hover:text-green-800 font-semibold text-base underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

      </main>
    </div>
  );
}
