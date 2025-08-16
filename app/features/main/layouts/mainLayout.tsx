import { CompactButton } from "@/common/ui/compact-button";
import { LargeButton } from "@/common/ui/large-button";
import { PrimaryButton } from "@/common/ui/primary-button";

export default function MainLayout() {
  return (
    <div className="w-full relative inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="pt-10 px-80 w-full h-1/6 bg-blue-600 flex flex-col justify-center items-center text-center">
        <div className="text-white text-6xl font-bold font-['Merriweather']">
          Learn Korean with Stories
          <br /> 
          You'll Actually Love
        </div>
        <div className="pt-8 text-white/70 text-2xl font-['Pretendard']">
        Interactive Reading. Meaningful Progress.
        <br />
        No more boring grammar drills. Just read, speak, and grow—naturally.  
        </div>
        
        <div className="py-8">
          <PrimaryButton 
            className="w-[253px] h-[40px] px-5 bg-orange-600 hover:bg-orange-500"
            textColor="#ffffff"
          >
            Start Your First Story Free 
          </PrimaryButton>
        </div>
        
        <div className="pb-4 text-center justify-start text-white/70 text-lg font-normal font-['Lato']">
          No signup needed. Read the story, arrange sentences, speak aloud.
        </div>
        {/* TODO:Wave divider using CSS clip-path
      <div className="w-full h-20 bg-blue-600">
        <div 
          className="w-full h-20 bg-amber-50"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 88%, 4% 82%, 8% 88%, 12% 82%, 16% 88%, 20% 82%, 24% 88%, 28% 82%, 32% 88%, 36% 82%, 40% 88%, 44% 82%, 48% 88%, 52% 82%, 56% 88%, 60% 82%, 64% 88%, 68% 82%, 72% 88%, 76% 82%, 80% 88%, 84% 82%, 88% 88%, 92% 82%, 96% 88%, 100% 82%, 100% 0)",
            transform: "translateY(1px)"
          }}
        />
      </div> */}
      </div>
      <div className="w-full h-3/6 px-10 flex flex-col justify-center items-center">
          <div className="w-full h-1/3 flex flex-row items-center justify-center">
            <img src="/images/color_heart_left.png" alt="color_heart_left" className="w-1/3 h-full" />
            {/* <div className="flex flex-col text-center justify-start">
              <div className="text-orange-600 text-5xl text-bold font-['Merriweather']">
                Three Simple Ways
              </div>
              <div className="text-stoen-950 text-4xl font-bold font-['Merriweather']">
                to Master Korean
              </div>
            </div> */}
            <div className="self-stretch text-center justify-center items-center">
              <span className="text-orange-600 text-5xl font-bold font-['Merriweather'] leading-[67.20px] tracking-wide">
                Three Simple Ways
                <br/>
                </span>
                <span className="text-orange-600 text-4xl font-bold font-['Merriweather'] leading-[56px] tracking-tight">
                </span>
                <span className="text-stone-950 text-4xl font-bold font-['Merriweather'] leading-[56px] tracking-tight">
                  to Master Korean
                </span>
                {/* Handwriting image centered */}
                <div className="flex justify-center items-center mt-8">
                  <img src="/images/handwriting.png" alt="handwriting" className="w-3xs h-16" />
                </div>
              </div>
              

            <img src="/images/color_heart_right.png" alt="color_heart_right" className="w-1/3 h-full" />

          </div>
      </div>
      <div>

    </div>
      

    </div>
  )
}