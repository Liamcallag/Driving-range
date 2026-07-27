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

      {/* Dark hero */}
      <div className="bg-slate-900 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">Contact Us</h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            Choose a reason below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
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
        <div className="bg-slate-900 px-6 py-8 text-center">
          <p className="text-slate-400 text-sm mb-2">Prefer to write your own email?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-white font-bold text-base hover:text-green-400 transition-colors underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

      </main>
    </div>
  );
}
