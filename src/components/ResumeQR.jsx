import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { profile } from "../content";

/** Scannable QR pointing at the live CV PDF, built from the current origin. */
export default function ResumeQR() {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const url = new URL(profile.resume, window.location.href).href;
    QRCode.toString(url, {
      type: "svg",
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a0a0a", light: "#f5f1e8" },
    }).then(setSvg);
  }, []);

  return (
    <figure className="flex items-center gap-5">
      <a
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open résumé PDF"
        className="block h-28 w-28 shrink-0 overflow-hidden rounded-sm bg-ivory-100 p-1 [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-ivory-500">
        Scan for the résumé
        <br />
        <a
          href={profile.resume}
          download
          className="text-gold-400 transition-colors hover:text-gold-300"
        >
          Download PDF
        </a>
      </figcaption>
    </figure>
  );
}
