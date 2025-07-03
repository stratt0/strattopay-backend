import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Send, 
  Receipt, 
  User, 
  Settings,
  Wallet,
  Users,
  BarChart3,
  Shield,
  Moon,
  Sun
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Send Money",
    url: createPageUrl("SendMoney"),
    icon: Send,
  },
  {
    title: "Transactions",
    url: createPageUrl("Transactions"),
    icon: Receipt,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
  }
];

const adminItems = [
  {
    title: "Admin Dashboard",
    url: createPageUrl("AdminDashboard"),
    icon: BarChart3,
  },
  {
    title: "User Management",
    url: createPageUrl("UserManagement"),
    icon: Users,
  },
  {
    title: "KYC Verification",
    url: createPageUrl("KYCManagement"),
    icon: Shield,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    loadUser();
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('strattopay-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  React.useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('strattopay-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const loadUser = async () => {
    try {
      const { User } = await import('@/entities/User');
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --strattopay-primary: #1B6B5B;
          --strattopay-secondary: #2E8B7A;
          --strattopay-accent: #F7931E;
          --strattopay-light: #E8F5F3;
          --strattopay-dark: #0F4A3C;
        }
        
        .dark {
          --strattopay-primary: #2E8B7A;
          --strattopay-secondary: #4AA393;
          --strattopay-accent: #FFB347;
          --strattopay-light: #1A1A1A;
          --strattopay-dark: #0A0A0A;
        }
        
        .strattopay-gradient {
          background: linear-gradient(135deg, var(--strattopay-primary) 0%, var(--strattopay-secondary) 100%);
        }
        
        .strattopay-accent-gradient {
          background: linear-gradient(135deg, var(--strattopay-accent) 0%, #ff6b35 100%);
        }
        
        .strattopay-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(27, 107, 91, 0.1);
          transition: all 0.3s ease;
        }
        
        .dark .strattopay-card {
          background: rgba(26, 26, 26, 0.95);
          border: 1px solid rgba(74, 163, 147, 0.2);
        }
        
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(27, 107, 91, 0.15);
        }
        
        .dark .hover-lift:hover {
          box-shadow: 0 10px 25px rgba(74, 163, 147, 0.25);
        }
        
        .strattopay-logo {
          filter: brightness(1.1) contrast(1.05);
        }
        
        .dark .strattopay-logo {
          filter: brightness(1.3) contrast(1.1);
        }
        
        body {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .dark body {
          background-color: #0A0A0A;
          color: #F5F5F5;
        }
      `}</style>
      
      <div className={`min-h-screen flex w-full transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-green-50'
      }`}>
        <Sidebar className={`border-r transition-colors duration-300 ${
          isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-white/50'
        }`}>
          <SidebarHeader className={`border-b p-6 transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2423561c9_2CCAC964-9136-4C7F-AA0A-7B3387E32DB9.PNG"
                  alt="Strattopay Logo"
                  className="w-full h-full object-contain strattopay-logo"
                />
              </div>
              <div>
                <h2 className={`font-bold text-xl transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Strattopay</h2>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Cross-border remittance</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover-lift mb-2 rounded-xl transition-all duration-200 ${
                          location.pathname === item.url 
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-green-800 to-green-700 text-green-100 border border-green-600' 
                              : 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200'
                            : isDarkMode
                              ? 'hover:bg-gray-800 text-gray-300'
                              : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {isAdmin && (
              <SidebarGroup className="mt-8">
                <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Admin Tools
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover-lift mb-2 rounded-xl transition-all duration-200 ${
                            location.pathname === item.url 
                              ? isDarkMode
                                ? 'bg-gradient-to-r from-orange-800 to-orange-700 text-orange-100 border border-orange-600'
                                : 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200'
                              : isDarkMode
                                ? 'hover:bg-gray-800 text-gray-300'
                                : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Theme Toggle */}
            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className={`w-full justify-start rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 mr-3" />
                    <span className="font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-3" />
                    <span className="font-medium">Dark Mode</span>
                  </>
                )}
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className={`backdrop-blur-md border-b px-6 py-4 md:hidden transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/80 border-gray-700' 
              : 'bg-white/80 border-gray-100'
          }`}>
            <div className="flex items-center gap-4">
              <SidebarTrigger className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`} />
              <div className="flex items-center gap-2">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2423561c9_2CCAC964-9136-4C7F-AA0A-7B3387E32DB9.PNG"
                  alt="Strattopay Logo"
                  className="w-8 h-8 object-contain strattopay-logo"
                />
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Strattopay</h1>
              </div>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={`rounded-full transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
