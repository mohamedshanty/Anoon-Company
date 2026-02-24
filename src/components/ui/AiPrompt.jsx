"use client";

import { Sparkles, FileText, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export default function AiPrompt() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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
    <div className="w-full max-w-3xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="glass-card rounded-2xl p-1 flex items-center border border-white/10 bg-white/5 backdrop-blur-lg">
        {/* Input Container */}
        <div className="flex-1 flex items-center gap-3 px-4">
          <Sparkles className={`w-5 h-5 text-brand-sky flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("tech_agency.ai_prompt.placeholder", "Ask The AI Anything")}
            className={`w-full bg-transparent text-white placeholder:text-white/60 text-sm md:text-base py-3 outline-none ${isRTL ? 'text-right' : ''}`}
          />
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-2 px-2 ${isRTL ? 'flex-row' : ''}`}>
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
            className="p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
            title={t("tech_agency.ai_prompt.attach_file", "Attach file")}
          >
            <FileText className="w-5 h-5 text-white/60 group-hover:text-white/80" />
          </button>

          <span className="text-white/20">|</span>

          {/* Ask AI Button */}
          <Button
            size="sm"
            variant="outline"
            color="sky"
            className="rounded-xl px-5 py-2.5"
          >
            {t("tech_agency.ai_prompt.button", "Ask Our AI")}
            <Send className={`w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>
      </div>

      {/* Optional helper text */}
      <p className={`text-center text-sm text-white/40 mt-3 ${isRTL ? 'text-right' : ''}`}>
        {t("tech_agency.ai_prompt.helper", "Attach file or ask anything about our services")}
      </p>
    </div>
  );
}