export default function footer() {
    return (
        <div className="self-stretch h-80 px-28 bg-white inline-flex justify-start items-center gap-48">
            <div className="flex-1 flex justify-start items-start gap-48">
                <div className="pt-2.5 flex justify-center items-center gap-2.5">
                    <div className="justify-start text-blue-600 text-2xl font-black font-['Merriweather']">Korean Mate</div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-12">
                            <div className="p-2.5 flex justify-center items-center gap-2.5">
                                <div className="justify-start text-black text-base font-bold tracking-tight">About us</div>
                            </div>
                            <div className="p-2.5 flex justify-center items-center gap-2.5">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Plans</div>
                            </div>
                            <div className="p-2.5 flex justify-center items-center gap-2.5">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Grammar</div>
                            </div>
                            <div className="p-2.5 flex justify-center items-center gap-2.5">
                                <div className="justify-start text-black text-base font-bold tracking-tight">Video Lessons</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-7">
                            <div className="size-6 relative">
                                <div className="size-6 left-0 top-0 absolute bg-radial-[at_27%_108%] from-amber-300 via-amber-300 via 10% to-pink-500"></div>
                                <div className="size-6 left-0 top-0 absolute bg-radial-[at_-17%_7%] from-blue-600 via-blue-600 via 13% to-violet-700/0"></div>
                                <div className="size-5 left-[2.62px] top-[2.62px] absolute bg-white"></div>
                            </div>
                            <div data-svg-wrapper className="relative">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.8086 12C24.8086 5.37262 19.436 0 12.8086 0C6.18122 0 0.808594 5.37262 0.808594 12C0.808594 17.9895 5.19684 22.954 10.9336 23.8542V15.4688H7.88672V12H10.9336V9.35625C10.9336 6.34875 12.7252 4.6875 15.4662 4.6875C16.7791 4.6875 18.1523 4.92188 18.1523 4.92188V7.875H16.6392C15.1485 7.875 14.6836 8.80003 14.6836 9.74906V12H18.0117L17.4797 15.4688H14.6836V23.8542C20.4203 22.954 24.8086 17.9896 24.8086 12Z" fill="#1877F2"/>
                                <path d="M17.4797 15.4688L18.0117 12H14.6836V9.74906C14.6836 8.79994 15.1485 7.875 16.6392 7.875H18.1523V4.92188C18.1523 4.92188 16.7791 4.6875 15.4661 4.6875C12.7252 4.6875 10.9336 6.34875 10.9336 9.35625V12H7.88672V15.4688H10.9336V23.8542C11.5539 23.9514 12.1808 24.0001 12.8086 24C13.4364 24.0001 14.0633 23.9514 14.6836 23.8542V15.4688H17.4797Z" fill="white"/>
                                </svg>
                            </div>
                            <div data-svg-wrapper>
                                {/* <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect x="0.808594" width="35" height="28" fill="url(#pattern0_350_3876)"/> */}
                            
                                <pattern id="pattern0_350_3876" patternContentUnits="objectBoundingBox" width="1" height="1">
                                {/* <use xlink:href="#image0_350_3876" transform="matrix(0.0040404 0 0 0.00505051 -0.0010101 0)"/> */}
                                </pattern>
                            </div>
                            <div data-svg-wrapper data-importance="true" className="relative">
                                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5111 8.64178C18.0569 9.74619 19.9505 10.396 21.9958 10.396V6.4625C21.6087 6.46265 21.2226 6.42226 20.8439 6.342V9.43825C18.7989 9.43825 16.9054 8.78851 15.3593 7.68418V15.7114C15.3593 19.7271 12.1023 22.9822 8.08487 22.9822C6.58586 22.9822 5.19254 22.5293 4.03516 21.7524C5.35615 23.1024 7.19836 23.9399 9.23637 23.9399C13.2541 23.9399 16.5113 20.6848 16.5113 16.669V8.64178H16.5111ZM17.9321 4.67334C17.1421 3.81075 16.6233 2.69599 16.5111 1.46355V0.957642H15.4196C15.6944 2.52401 16.6316 3.86222 17.9321 4.67334ZM6.57618 18.671C6.13477 18.0926 5.89619 17.385 5.89731 16.6574C5.89731 14.8209 7.38705 13.3317 9.22503 13.3317C9.56751 13.3315 9.90797 13.3841 10.2344 13.4875V9.46605C9.85292 9.41383 9.46793 9.39157 9.0831 9.39977V12.5299C8.75646 12.4264 8.41583 12.3738 8.0732 12.3741C6.23529 12.3741 4.74564 13.8631 4.74564 15.6999C4.74564 16.9987 5.49022 18.1232 6.57618 18.671Z" fill="#FF004F"/>
                                <path d="M15.3584 7.6841C16.9046 8.78843 18.7978 9.43817 20.843 9.43817V6.34192C19.7014 6.09886 18.6908 5.50266 17.931 4.67334C16.6305 3.86214 15.6934 2.52393 15.4186 0.957642H12.5516V16.6688C12.5451 18.5004 11.0579 19.9834 9.22392 19.9834C8.14325 19.9834 7.18309 19.4686 6.57506 18.6709C5.48927 18.1232 4.74461 16.9987 4.74461 15.7C4.74461 13.8634 6.23426 12.3742 8.07217 12.3742C8.4243 12.3742 8.7637 12.429 9.08207 12.5299V9.39985C5.13514 9.48137 1.96094 12.7046 1.96094 16.6689C1.96094 18.6478 2.75137 20.4418 4.03429 21.7526C5.19167 22.5293 6.58491 22.9824 8.084 22.9824C12.1015 22.9824 15.3585 19.727 15.3585 15.7114L15.3584 7.6841Z" fill="black"/>
                                <path d="M20.8424 6.34179V5.50477C19.813 5.50627 18.8039 5.21813 17.9304 4.6733C18.7036 5.51927 19.7216 6.10265 20.8424 6.34196M15.418 0.957517C15.3918 0.807854 15.3717 0.657193 15.3577 0.505903V0H11.399V15.7113C11.3928 17.5428 9.90559 19.0258 8.07149 19.0258C7.55154 19.0266 7.0387 18.905 6.57439 18.671C7.18241 19.4686 8.14258 19.9833 9.22324 19.9833C11.0572 19.9833 12.5445 18.5004 12.551 16.6688V0.9576L15.418 0.957517ZM9.08164 9.39972V8.5085C8.75084 8.46333 8.41736 8.44072 8.08349 8.4408C4.06556 8.4408 0.808594 11.696 0.808594 15.7113C0.808594 18.2287 2.08862 20.4473 4.03378 21.7524C2.75086 20.4416 1.96043 18.6476 1.96043 16.6687C1.96043 12.7046 5.13455 9.48124 9.08164 9.39972Z" fill="#00F2EA"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-14">
                        <div className="p-2.5 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Terms of Use</div>
                        </div>
                        <div className="p-2.5 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Privacy Policy</div>
                        </div>
                        <div className="p-2.5 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Contact Us</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}