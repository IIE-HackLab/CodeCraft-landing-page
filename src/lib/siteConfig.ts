export const siteUrl = "https://codecraft2k26.vercel.app";
export const siteName = "CODECRAFT";
export const pageTitle = "CODECRAFT 2026 | Hackathon by IIE Tech Club";
export const pageDescription =
  "Register for CODECRAFT 2026, the IIE Tech Club hackathon at Ideal Institute of Engineering where student teams build software and hardware prototypes with live demos, prizes, and certificates.";
export const pageKeywords =
  "CODECRAFT, CODECRAFT 2026, IIE Tech Club, Ideal Institute of Engineering hackathon, hardware hackathon, software hardware project competition, student hackathon, software hackathon";
export const socialImage = `${siteUrl}/CodeCraft.png`;

export const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "CODECRAFT 2026",
  description: pageDescription,
  url: siteUrl,
  image: [socialImage],
  startDate: "2026-09-26T09:00:00+05:30",
  endDate: "2026-09-28T18:00:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  keywords: pageKeywords,
  location: {
    "@type": "Place",
    name: "Ideal Institute of Engineering",
    address: "Ideal Institute of Engineering campus",
  },
  organizer: { "@type": "Organization", name: "IIE Tech Club", url: siteUrl },
};
