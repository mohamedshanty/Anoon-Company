"use client";
import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Plus,
  Pencil,
  Search,
  BookOpen,
  Loader2,
  ImageIcon,
  Link2,
} from "lucide-react";
import CourseEditor from "./CourseEditor";
import { usePrograms } from "@/hooks/usePrograms";
import { useCourses } from "@/hooks/useCourses";

// ── Per-program expanded courses panel ───────────────────────────────────────
function ProgramCourses({ programId }) {
  const { courses, isLoading, deleteCourse } = useCourses(programId);
  const [courseEditor, setCourseEditor] = useState(null);

  async function handleDelete(courseId) {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    await deleteCourse(courseId);
  }

  return (
    <tr>
      <td colSpan={5} className="px-0 pb-0">
        {courseEditor && (
          <CourseEditor
            course={courseEditor.course}
            programId={courseEditor.programId}
            onSave={() => setCourseEditor(null)}
            onClose={() => setCourseEditor(null)}
          />
        )}
      </td>
    </tr>
  );
}

// ── Main list ─────────────────────────────────────────────────────────────────
export default function TrainingProgramsList({ onEdit }) {
  const { programs, isLoading, deleteProgram } = usePrograms();
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [search, setSearch] = useState("");

  function toggleExpand(programId) {
    setExpandedProgram((prev) => (prev === programId ? null : programId));
  }

  const filtered = programs.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.title_ar?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  async function handleDelete(program) {
    if (!confirm(`Delete "${program.title}"? This cannot be undone.`)) return;
    try {
      await deleteProgram(program.id);
    } catch (err) {
      alert(err.message);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar — mirrors ArticlesTable */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search programs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium">
                  Program
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden md:table-cell">
                  Button
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden lg:table-cell">
                  Link
                </th>
                <th className="text-right px-6 py-4 text-white/30 text-xs uppercase tracking-widest font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-white/20">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No programs found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((program) => (
                  <React.Fragment key={program.id}>
                    <tr
                      className={`border-b border-white/5 transition-colors ${
                        expandedProgram === program.id
                          ? "bg-white/[0.04] border-white/0"
                          : "hover:bg-white/[0.03] last:border-0"
                      }`}
                    >
                      {/* Program info */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {program.image_url ? (
                            <img
                              src={program.image_url}
                              alt={program.title}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-4 h-4 text-white/20" />
                            </div>
                          )}
                          <div>
                            <p className="text-white/80 font-medium text-sm line-clamp-1 max-w-[220px]">
                              {program.title}
                            </p>
                            {program.title_ar && (
                              <p
                                className="text-white/30 text-xs mt-0.5 line-clamp-1 max-w-[220px]"
                                dir="rtl"
                              >
                                {program.title_ar}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Button text */}
                      <td className="px-4 py-4 hidden md:table-cell">
                        {program.button_text ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 rounded-full text-xs inline-block w-fit">
                              {program.button_text}
                            </span>
                            {program.button_text_ar && (
                              <span className="text-white/25 text-xs" dir="rtl">
                                {program.button_text_ar}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-white/20 text-xs">—</span>
                        )}
                      </td>

                      {/* Link */}
                      <td className="px-4 py-4 hidden lg:table-cell">
                        {program.button_href ? (
                          <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono">
                            <Link2 className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[160px]">
                              {program.button_href}
                            </span>
                          </span>
                        ) : (
                          <span className="text-white/20 text-xs">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEdit && onEdit(program)}
                            className="p-2 rounded-lg text-white/30 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
                            title="Edit program"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(program)}
                            className="p-2 rounded-lg text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all"
                            title="Delete program"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Inline courses expansion row */}
                    {expandedProgram === program.id && (
                      <ProgramCourses
                        key={`courses-${program.id}`}
                        programId={program.id}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-white/20 text-xs text-right">
        Showing {filtered.length} of {programs.length} programs
      </p>
    </div>
  );
}
