"use client";

import { Sparkles, FileText, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Button from "./Button";

export default function AiPrompt() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0" dir={dir}>
      <div className="glass-card rounded-2xl p-1.5 sm:p-1 flex items-center border border-white/10 bg-white/5 backdrop-blur-lg min-h-[56px] sm:min-h-0">
        {/* Input Container */}
        <div className="flex-1 flex items-center min-w-0 px-2 sm:px-4">
          <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 text-brand-sky shrink-0 ${isRTL ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("tech_agency.ai_prompt.placeholder", "Ask The AI Anything")}
            className={`w-full bg-transparent text-white placeholder:text-white/60 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 outline-none min-w-0 ${isRTL ? 'text-right' : ''}`}
          />
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-1 sm:gap-2 px-1 sm:px-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* File Input (hidden) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />

          {/* Attach File Button */}
          <button
            onClick={handleFileUpload}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
            title={t("tech_agency.ai_prompt.attach_file", "Attach file")}
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white/80" />
          </button>

          <span className="text-white/20 hidden sm:inline">|</span>

          {/* Ask AI Button */}
          <Button
            variant="outline"
            color="sky"
            className="rounded-xl !px-3 sm:!px-5 !py-2 sm:!py-2.5 !min-h-0 !h-auto flex items-center gap-2"
          >
            <span className="hidden sm:inline text-xs sm:text-sm">
              {t("tech_agency.ai_prompt.button", "Ask Our AI")}
            </span>
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </Button>
        </div>
      </div>

      {/* Optional helper text */}
      <p className={`text-center text-[10px] sm:text-sm text-white/40 mt-2 sm:mt-3 ${isRTL ? 'text-right' : ''}`}>
        {t("tech_agency.ai_prompt.helper", "Attach file or ask anything about our services")}
      </p>
    </div>
  );
}