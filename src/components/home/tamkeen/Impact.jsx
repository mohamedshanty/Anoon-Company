import Impact from "@/components/common/Impact";
import { Briefcase } from "lucide-react";
import { LineChart } from "lucide-react";
import { Star } from "lucide-react";
import { User } from "lucide-react";

const ImpactSection = () => {
  const secondPageStats = [
    {
      id: "freelancers",
      icon: <User className="w-10 h-10 text-brand-orange" />,
      value: "11,000",
      label: "Freelancer & Student",
    },
    {
      id: "success",
      icon: <Star className="w-10 h-10 text-brand-orange" />,
      value: "50 %",
      label: "Freelancer Success",
    },
    {
      id: "courses",
      icon: <LineChart className="w-10 h-10 text-brand-orange" />,
      value: "3 Roadmap",
      label: "Technical Courses",
    },
    {
      id: "workspace",
      icon: <Briefcase className="w-10 h-10 text-brand-orange" />,
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
      subtitle={{
        line1: "Our 2 years of",
        line2: {
          prefix: "",
          highlight: "Achievements",
        },
      }}
      description="Fly So High, We Reach The Sky and now its time to go beyond. We are, we help, we care and we are proud of that."
      stats={secondPageStats}
      patternDirection="grid"
      patternOpacity="opacity-75"
    />
  );
};

export default ImpactSection;
