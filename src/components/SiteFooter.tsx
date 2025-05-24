const SiteFooter = () => {
  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">© 2025 Your Company. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                隱私政策
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                使用條款
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                聯絡我們
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
