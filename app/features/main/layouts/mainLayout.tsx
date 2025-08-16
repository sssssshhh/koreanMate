import { MediumButton } from "@/common/ui/medium-button";
import { Link } from "react-router";

export default function MainLayout() {
  return (
    <div className="w-full relative inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="pt-10 px-80 w-full h-1/6 bg-blue-600 flex flex-col justify-center items-center text-center">
        <div className="text-white text-6xl font-bold font-merriweather">
          Learn Korean with Stories
          <br /> 
          You'll Actually Love
        </div>
        <div className="pt-8 text-white/70 text-1xl font-pretendard">
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
        
        <div className="pb-4 text-center justify-start text-white/70 text-lg font-normal font-lato">
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
          {/* title */}
          <div className="w-full h-1/6 flex flex-row items-center justify-center">
              <img src="/images/color_heart_left.png" alt="color_heart_left" className="w-1/3 h-full" />
              <div className="w-full flex flex-col text-center justify-center items-center">
                <span className="text-orange-600 text-5xl font-bold font-merriweather leading-[67.20px] tracking-wide">
                Three Simple Ways
                <br/>
                </span>
                <span className="text-stone-950 text-4xl font-bold font-merriweather leading-[56px] tracking-tight">
                  to Master Korean
                </span>
                <div className="flex justify-center items-center mt-8">
                  <img src="/images/handwriting.png" alt="handwriting" className="w-3xs h-16" />
                </div>
              </div>
            <img src="/images/color_heart_right.png" alt="color_heart_right" className="w-1/3 h-full" />
          </div>
          { /* introduction */}
          <div className="w-full h-2/3 flex flex-col px-7">
            {/* 1/3 main */}
            <div className="h-1/3 flex flex-row items-center justify-center">
              <div className="w-1/3 h-1/3 flex flex-col items-start justify-start">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-blue-600 text-4xl font-bold font-merriweather leading-[49px] tracking-tight">
                      01
                    </span>
                    <span className="text-stone-950 text-4xl font-bold font-merriweather leading-[49px] tracking-tight">
                    Interactive Stories
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-xl font-normal font-lato tracking-tight">
                  Level-based stories you actually enjoy. 
                  <br/>
                  Tap for meanings, pronunciations, and grammar notes.
                </div>
                <div className="w-full flex flex-col pt-5 text-stone-950 text-2xl font-normal font-handlee">
                  <div className="w-2/3">Read more naturally</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
                <div className="pt-2 text-yellow-600 text-lg font-normal font-handlee">
                  With guided pronunciation
                </div>
                <div className="w-full pt-8 text-stone-950 text-2xl font-normal font-handlee">
                  <div className="w-2/3">Understand deeply</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
                <div className="pt-2 text-yellow-600 text-lg font-normal font-handlee">
                  With word-by-word breakdowns
                </div>
              </div>
              <div className="w-2/3 flex justify-center items-center">
                <img src="/images/main1.png" alt="main1" />
              </div>
            </div>
            {/* 2/3 main */}
            <div className="h-1/3 flex flex-row items-center justify-center">
              <div className="w-2/3 flex justify-center items-center">
                  <img src="/images/main2.png" alt="main2" />
              </div>
              <div className="w-1/3 flex flex-col items-start justify-start">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-blue-600 text-4xl font-bold font-merriweather">
                    02
                  </span>
                  <span className="text-stone-950 text-4xl font-bold font-merriweather leading-[49px]">
                    Korean Constellation
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-xl font-normal font-lato">
                  Every time you finish a story, a new star appears.
                  <br/>
                  Your constellation grows with each step you take in Korean.<br/>Visualize your progress — and stay motivated to keep going.
                </div>
                <div className="w-full pt-8 text-stone-950 text-2xl font-normal font-handlee">
                  <div className="w-2/3">Your stars are growing</div>
                  <div className="w-fit">
                    <img src="/images/underline.svg" alt="underline" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* 3/3 main */}
            <div className="h-1/3 flex flex-row items-center justify-center">
              <div className="w-1/3 flex flex-col items-start justify-start">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-blue-600 text-4xl font-bold font-merriweather">
                    03
                  </span>
                  <span className="text-stone-950 text-4xl font-bold font-merriweather whitespace-nowrap">
                    Learning with Impact
                  </span>
                </div>
                <div className="pt-5 text-neutral-400 text-xl font-normal font-lato">
                  Earn points, collect stars, and unlock donations.
                  <br/>
                  Each month, KoreanMate donates to real-world causes — powered by your progress.<br/>Study with purpose. Make a difference.
                </div>
              </div>
              <div className="w-2/3 flex justify-center items-center">
                <img src="/images/main3.png" alt="main3" />
              </div>
            </div>
          </div>
          { /* what learners say */}
          {/* <div></div> */}
          {/* lets start */}
          <div className="w-full h-1/6 flex flex-col items-center justify-center">
            <div className="h-16 text-center text-stone-950 text-5xl font-bold font-merriweather">
              Ready to begin your story?
            </div>
            <div className="text-center text-yellow-600 text-2xl font-normal font-pretendard">
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