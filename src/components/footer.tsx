export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 font-sG">
      <div className="mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © 2025 Inventory & Order Fulfillment System. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

      </div>
    </footer>
  );
}
