export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-white/5">
      <div className="container py-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="font-black text-xl">MRZ Gang</div>
          <div className="text-white/60 text-sm">Business & collabs: mrzgang@example.com</div>
        </div>
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} MRZ Gang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
