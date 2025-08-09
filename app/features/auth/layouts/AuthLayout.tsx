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
    <div className="h-full bg-[#FFFDD0] pt-[100px] pl-[116px] pr-[116px] pb-[100px]">
      <div className="w-full h-full bg-white rounded-lg border-l border-r border-t pt-8 pb-8 border-amber-200 flex flex-col justify-center items-center overflow-hidden relative">
        {/* Left side vector image - positioned near form bottom-left */}
        <img
          src="/images/signin_left.svg" 
          alt="Sign in decoration" 
          className="absolute -left-1 bottom-20 z-10"
        />
        
        {/* Right side vector image - positioned near form bottom-right */}
        <img
          src="/images/signin_right.svg" 
          alt="Sign in decoration" 
          className="absolute -right-1 bottom-20 z-10"
        />
        
        {/* Header section with icon, title, and subtitle */}
        <div className="flex flex-col justify-start items-center">
          <img 
            src={iconSrc} 
            alt={iconAlt} 
            className="pb-4"
          />
          <div className="text-stone-950 text-4xl font-normal pb-2">{title}</div>
          <div className="text-neutral-400 text-base font-normal font-['Lato'] text-center">
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