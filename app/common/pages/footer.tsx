export default function footer() {
    return (
        <div className="h-28 bg-white flex px-28 pt-11 pb-24">
            <div className="w-full flex justify-between">
                {/* Logo */}
                <div className="flex justify-center pr-12">
                    <div className="justify-start text-blue-600 text-2xl font-black font-['Merriweather']">Korean Mate</div>
                </div>
                
                {/* About us, Plans, Grammar, Video Lessons */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start items-center gap-12">
                            <div className="flex justify-center items-center">
                                <div className="justify-start text-black text-base font-bold tracking-tight">About us</div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Plans</div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Grammar</div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Video Lessons</div>
                            </div>
                        </div>
                    </div>
                    { /* Terms of Use, Privacy Policy, Contact Us - closer together */}
                    <div className="flex justify-start items-center gap-8 pt-4">
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Terms of Use</div>
                        </div>
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Privacy Policy</div>
                        </div>
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Contact Us</div>
                        </div>
                    </div>
                </div>
                {/* Social Media Icons - moved to far right */}
                <div className="flex gap-3">
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