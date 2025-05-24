import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // 從 lucide-react 引入圖示

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false); // 用於控制移動端選單的開合狀態

  const navLinks = [
    { href: '/', label: '首頁' },
    { href: '/about', label: '關於我們' },
    { href: '/services', label: '服務項目' },
    { href: '/contact', label: '聯絡我們' },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              LOGO
            </a>
          </div>

          {/* 桌面端導航列 */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
              >
                {link.label}
              </a>
            ))}
            {/* 可選：額外按鈕或元件 */}
            {/* <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              註冊
            </button> */}
          </nav>

          {/* 移動端選單按鈕 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'} // 更新 aria-expanded
            >
              <span className="sr-only">開啟主選單</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" /> // 使用 Lucide 的 X 圖示
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" /> // 使用 Lucide 的 Menu 圖示
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移動端選單 */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
              >
                {link.label}
              </a>
            ))}
             {/* 可選：額外按鈕或元件 (移動端) */}
            {/* <button className="mt-2 w-full px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              註冊
            </button> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;