import AuthLayout from "@/features/auth/layouts/AuthLayout";
import { SmallButton } from "@/common/ui/small-button";
import { useNavigate } from "react-router";

export default function RegistrationSuccess() {
    const navigate = useNavigate();

    const handleStartLearning = () => {
        navigate('/');
    };

    return (
        <AuthLayout
            title=""
            subtitle=""
            iconSrc="/images/camp_fire.svg"
            iconAlt="Registration Successful"
        >
            <div className="text-center flex flex-col items-center gap-6 p-7">
                <div className="text-stone-950 text-2xl font-normal font-['Lato'] leading-7">
                    Discover Korean through stories, <br/>at your own pace with KoreanMate
                </div>
                <SmallButton size="md" onClick={handleStartLearning}>
                    Start learning
                </SmallButton>
            </div>
        </AuthLayout>
    )
}


