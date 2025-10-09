// components/Footer.jsx
export default function Footer(){
  return (
    <footer className="border-t border-zinc-800 mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-400">
            © {new Date().getFullYear()} EazyEat. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}