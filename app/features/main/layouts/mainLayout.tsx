import { MediumButton } from "@/common/ui/medium-button";
import { Link } from "react-router";

export default function MainLayout() {
  return (
    <div className="w-full relative inline-flex flex-col justify-start items-center overflow-hidden">
      {/* Header Section */}
      <div className="pt-10 px-10 lg:px-80 w-full h-1/6 bg-blue-600 flex flex-col justify-center items-center text-center">
        <div className="text-white text-3xl lg:text-6xl font-bold font-merriweather px-4">
          Learn Korean with Stories
          <br /> 
          You'll Actually Love
        </div>
        <div className="pt-8 text-white/70 text-lg lg:text-xl font-pretendard px-4">
        Interactive Reading. Meaningful Progress.
        <br />
        No more boring grammar drills. Just read, speak, and grow—naturally.  
        </div>
        
        <div className="py-8">
          <Link to="/stories">
            <MediumButton 
              className="w-[253px] h-[40px] px-5 bg-orange-600 hover:bg-orange-500"
              textColor="#ffffff"
            >
              Start Your First Story Free 
            </MediumButton>
          </Link>
        </div>
        
        <div className="pb-4 text-center justify-start text-white/70 text-base lg:text-lg font-normal font-lato px-4">
          No signup needed. Read the story, arrange sentences, speak aloud.
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-3/6 px-4 lg:px-10 flex flex-col justify-center items-center">
          {/* title */}
          <div className="w-full h-1/6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
              <img src="/images/color_heart_left.png" alt="color_heart_left" className="w-1/2 lg:w-1/3 h-auto" />
              <div className="w-full flex flex-col text-center justify-center items-center">
                <span className="text-orange-600 text-3xl lg:text-5xl font-bold font-merriweather leading-tight lg:leading-[67.20px] tracking-wide">
                Three Simple Ways
                <br/>
                </span>
                <span className="text-stone-950 text-2xl lg:text-4xl font-bold font-merriweather leading-tight lg:leading-[56px] tracking-tight">
                  to Master Korean
                </span>
                <div className="flex justify-center items-center mt-8">
                  <img src="/images/handwriting.png" alt="handwriting" className="w-3xs h-16" />
                </div>
              </div>
            <img src="/images/color_heart_right.png" alt="color_heart_right" className="w-1/2 lg:w-1/3 h-auto" />
          </div>
          
          {/* introduction */}
          <div className="w-full h-2/3 flex flex-col px-2 lg:px-7 gap-8 lg:gap-0">
            {/* 1/3 main */}
            <div className="h-auto lg:h-1/3 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
              <div className="w-full lg:w-1/3 h-auto lg:h-1/3 flex flex-col items-center lg:items-start justify-start text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-1">
                  <span className="text-blue-600 text-3xl lg:text-4xl font-bold font-merriweather leading-tight lg:leading-[49px] tracking-tight">
                      01
                    </span>
                    <span className="text-stone-950 text-2xl lg:text-4xl font-bold font-merriweather leading-tight lg:leading-[49px] tracking-tight">
                    Interactive Stories
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-lg lg:text-xl font-normal font-lato tracking-tight">
                  Level-based stories you actually enjoy. 
                  <br/>
                  Tap for meanings, pronunciations, and grammar notes.
                </div>
                <div className="w-full flex flex-col pt-5 justify-center items-center lg:items-start text-stone-950 text-xl lg:text-2xl font-normal font-handlee">
                  <div className="w-fit">Read more naturally</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
                <div className="pt-2 text-yellow-600 text-base lg:text-lg font-normal font-handlee text-center lg:text-left">
                  With guided pronunciation
                </div>
                <div className="w-full pt-8 flex flex-col justify-center items-center lg:items-start text-stone-950 text-xl lg:text-2xl font-normal font-handlee text-center lg:text-left">
                  <div className="w-fit">Understand deeply</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
                <div className="pt-2 text-yellow-600 text-base lg:text-lg font-normal font-handlee text-center lg:text-left">
                  With word-by-word breakdowns
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex justify-center items-center">
                <img src="/images/main1.png" alt="main1" className="w-full lg:w-auto max-w-md" />
              </div>
            </div>
            
            {/* 2/3 main */}
            <div className="h-auto lg:h-1/3 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
              <div className="w-full lg:w-2/3 flex justify-center items-center order-2 lg:order-1">
                  <img src="/images/main2.png" alt="main2" className="w-full lg:w-auto max-w-md" />
              </div>
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-start text-center lg:text-left order-1 lg:order-2">
                <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-1">
                  <span className="text-blue-600 text-3xl lg:text-4xl font-bold font-merriweather">
                    02
                  </span>
                  <span className="text-stone-950 text-2xl lg:text-4xl font-bold font-merriweather leading-tight lg:leading-[49px]">
                    Korean Constellation
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-lg lg:text-xl font-normal font-lato">
                  Every time you finish a story, a new star appears.
                  <br/>
                  Your constellation grows with each step you take in Korean.<br/>Visualize your progress — and stay motivated to keep going.
                </div>
                <div className="w-full pt-8 flex flex-col justify-center items-center lg:items-start text-stone-950 text-xl lg:text-2xl font-normal font-handlee text-center lg:text-left">
                  <div className="w-fit">Your stars are growing</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3/3 main */}
            <div className="h-auto lg:h-1/3 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-start text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-1">
                  <span className="text-blue-600 text-3xl lg:text-4xl font-bold font-merriweather">
                    03
                  </span>
                  <span className="text-stone-950 text-2xl lg:text-4xl font-bold font-merriweather whitespace-nowrap">
                    Learning with Impact
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-lg lg:text-xl font-normal font-lato">
                  Earn points, collect stars, and unlock donations.
                  <br/>
                  Each month, KoreanMate donates to real-world causes — powered by your progress.<br/>Study with purpose. Make a difference.
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex justify-center items-center">
                <img src="/images/main3.png" alt="main3" className="w-full lg:w-auto max-w-md" />
              </div>
            </div>
          </div>
          
          {/* lets start */}
          <div className="w-full h-1/6 flex flex-col items-center justify-center px-4">
            <div className="h-16 text-center text-stone-950 text-3xl lg:text-5xl font-bold font-merriweather">
              Ready to begin your story?
            </div>
            <div className="text-center text-yellow-600 text-xl lg:text-2xl font-normal font-pretendard">
              Start reading right away. Earn stars as you go.
              <br/>
              No signup needed — just explore and learn.
            </div>
            <div className="py-8">
              <Link to="/stories">
                <MediumButton 
                  className="w-[253px] h-[40px] px-5 bg-orange-600 hover:bg-orange-500"
                  textColor="#ffffff"
                >
                  Start Your First Story Free 
                </MediumButton>
              </Link>
            </div>
      </div>

      </div>
      <div>

      </div>
      

    </div>
  )
}