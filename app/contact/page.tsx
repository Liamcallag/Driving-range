import { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | Florida Driving Ranges',
  description: 'Get in touch with Florida Driving Ranges — report errors, claim a listing, or suggest a range we\'ve missed.',
};

const GREEN = '#1B3A2B';

const reasons = [
  {
    title: 'Claim your listing',
    description: 'Own a driving range? Claim your listing to update hours, add details, or correct information.',
    subject: 'Claim a Listing',
    body: 'Hi,\n\nI would like to claim the listing for my driving range.\n\nRange name:\nAddress:\nWebsite:\n\nPlease contact me to verify ownership.\n\nThanks',
  },
  {
    title: 'Report an error',
    description: 'Spotted incorrect hours, a wrong address, or outdated information on a listing?',
    subject: 'Report an Error',
    body: 'Hi,\n\nI noticed an error on the following listing:\n\nRange name:\nWhat is incorrect:\nCorrect information:\n\nThanks',
  },
  {
    title: 'Suggest a range',
    description: 'Know a Florida driving range that isn\'t listed? Let us know and we\'ll add it.',
    subject: 'Suggest a Range',
    body: 'Hi,\n\nI\'d like to suggest the following driving range for inclusion:\n\nRange name:\nAddress:\nWebsite:\n\nThanks',
  },
  {
    title: 'General enquiry',
    description: 'Anything else — partnerships, advertising, or general questions about the directory.',
    subject: 'General Enquiry',
    body: 'Hi,\n\n',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GREEN }}>
            Get in touch
          </p>
          <h1 className="text-3xl font-bold leading-tight mb-3" style={{ color: GREEN }}>
            Contact Us
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            Choose a reason below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="border-t border-slate-100 mb-8" />

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {reasons.map((r) => (
            <a
              key={r.title}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`}
              className="group block border border-slate-200 hover:border-slate-300 p-5 transition-all"
            >
              <h2
                className="text-sm font-semibold mb-1.5 group-hover:opacity-70 transition-opacity"
                style={{ color: GREEN }}
              >
                {r.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{r.description}</p>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>
                Send email →
              </p>
            </a>
          ))}
        </div>

        {/* Direct email */}
        <div className="border-t border-slate-100 pt-6 text-center">
          <p className="text-xs text-slate-400 mb-1">Prefer to write your own email?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: GREEN }}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

      </main>
    </div>
  );
}
