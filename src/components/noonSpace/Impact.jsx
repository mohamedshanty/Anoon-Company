import Impact from "@/components/common/Impact";
import { Users, TrendingUp, MapPin, Award } from "lucide-react";

const ImpactSection = () => {
  const impactStats = [
    {
      id: "freelancer-student",
      icon: <Users className="w-10 h-10 text-brand-orange" />,
      value: "11,000",
      label: "Freelancer & Student",
    },
    {
      id: "freelancer-success",
      icon: <TrendingUp className="w-10 h-10 text-brand-orange" />,
      value: "50%",
      label: "Freelancer Success",
    },
    {
      id: "roadmap-courses",
      icon: <MapPin className="w-10 h-10 text-brand-orange" />,
      value: "3",
      label: "Roadmap Courses",
    },
    {
      id: "yearly-student",
      icon: <Award className="w-10 h-10 text-brand-orange" />,
      value: "400",
      label: "Yearly Student",
    },
  ];

  return (
    <Impact
      title={{
        firstWord: "Our",
        secondWord: "Impact",
      }}
      additionalText="We Are Going To Be The Different"
      subtitle={{
        line1: "Our 2 years of",
        line2: {
          prefix: "",
          highlight: "Achievements",
        },
      }}
      description="With our super powers we have reached this. With our super powers we have reached this. With our super powers we have reached this."
      stats={impactStats}
      patternDirection="grid"
      patternOpacity="opacity-75"
    />
  );
};

export default ImpactSection;
