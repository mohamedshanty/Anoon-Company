import { LineChart, Briefcase, Star, User } from "lucide-react";
import Impact from "@/components/common/Impact";

const mainPageStats = [
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
    value: "11",
    label: "Work Space",
  },
];

export default function ImpactSection() {
  return <Impact stats={mainPageStats} />;
}
