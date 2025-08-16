export default function footer() {
    return (
        <div className="h-auto lg:h-28 bg-white flex px-4 lg:px-28 pt-11 pb-24">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 lg:gap-0 py-6 lg:py-0">
                {/* Logo */}
                <img src="/images/logo.svg" alt="logo" className="w-36 h-8" />
                
                {/* About us, Plans, Grammar, Video Lessons */}
                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start w-full gap-4 lg:gap-12">
                        <div className="grid grid-cols-2 lg:flex lg:flex-row justify-center lg:justify-start items-center lg:items-start gap-4 lg:gap-12">
                            <div className="flex justify-center lg:justify-start items-center">
                                <div className="text-center lg:text-start text-black text-base font-bold font-merriweather">About us</div>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center">
                                <div className="text-center lg:text-start text-black text-base font-bold font-merriweather">Plans</div>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center">
                                <div className="text-center lg:text-start text-black text-base font-bold font-merriweather">Grammar</div>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center">
                                <div className="text-center lg:text-start text-black text-base font-bold font-merriweather">Video Lessons</div>
                            </div>
                        </div>
                    </div>
                    { /* Terms of Use, Privacy Policy, Contact Us - closer together */}
                    <div className="flex flex-row justify-center lg:justify-start items-center lg:items-start gap-4 lg:gap-8 pt-4">
                        <div className="flex justify-center lg:justify-start items-center gap-2.5">
                            <div className="text-center lg:text-start text-neutral-400 text-sm font-semibold font-lato leading-tight tracking-tight">Terms of Use</div>
                        </div>
                        <div className="flex justify-center lg:justify-start items-center gap-2.5">
                            <div className="text-center lg:text-start text-neutral-400 text-sm font-semibold font-lato leading-tight tracking-tight">Privacy Policy</div>
                        </div>
                        <div className="flex justify-center lg:justify-start items-center gap-2.5">
                            <div className="text-center lg:text-start text-neutral-400 text-sm font-semibold font-lato leading-tight tracking-tight">Contact Us</div>
                        </div>
                    </div>
                </div>
                
                {/* Social Media Icons - moved to far right on desktop, below content on mobile */}
                <div className="flex gap-3 order-2 lg:order-none">
                    <img 
                        src="/images/instagram.svg" 
                        alt="Instagram"
                        className="w-4 h-4"
                    />
                    <img 
                        src="/images/facebook.svg" 
                        alt="Facebook" 
                        className="w-4 h-4"
                    />
                    <img 
                        src="/images/sopra_books.png" 
                        alt="sopra_books" 
                        className="w-4 h-4"
                    />
                    <img 
                        src="/images/tiktok.svg" 
                        alt="tikcok" 
                        className="w-4 h-4"
                    />
                </div>
            </div>
        </div>
    )
}