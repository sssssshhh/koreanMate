import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string | React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  iconSrc = "/images/book.svg", 
  iconAlt = "Auth icon" 
}: AuthLayoutProps) {
  const renderSubtitle = () => {
    if (typeof subtitle === 'string') {
      // Split by \n and map to JSX with <br /> tags
      const lines = subtitle.split('\n');
      return lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return subtitle;
  };

  return (
    <div className="h-full bg-amber-50 flex items-center justify-center px-4 lg:pt-[100px] lg:pl-[116px] lg:pr-[116px] lg:pb-[100px]">
      <div className="relative bg-white rounded-[10px] lg:rounded-lg shadow-lg lg:shadow-none w-full max-w-md lg:max-w-none lg:w-full lg:h-full lg:mx-0 mx-auto px-4 lg:px-0 lg:border-l lg:border-r lg:border-t lg:pt-8 pb-8 lg:border-amber-200 lg:flex lg:flex-col lg:justify-center lg:items-center lg:overflow-hidden">
        {/* Left side vector image - positioned near form bottom-left */}
        <img
          src="/images/signin_left.svg" 
          alt="Sign in decoration" 
          className="hidden lg:block absolute -left-1 bottom-20 z-10"
        />
        
        {/* Right side vector image - positioned near form bottom-right */}
        <img
          src="/images/signin_right.svg" 
          alt="Sign in decoration" 
          className="hidden lg:block absolute -right-1 bottom-20 z-10"
        />
        
        {/* Header section with icon, title, and subtitle */}
        <div className="flex flex-col justify-start items-center">
          <img 
            src={iconSrc} 
            alt={iconAlt} 
            className="pb-4"
          />
          <div className="text-stone-950 text-4xl font-normal pb-2 text-center font-merriweather">{title}</div>
          <div className="text-neutral-400 text-base font-normal font-lato text-center">
            {renderSubtitle()}
          </div>
        </div>
        
        {/* Form content - passed as children */}
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
} 