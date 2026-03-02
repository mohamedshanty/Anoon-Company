"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, Layout, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function NewArticle() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: 'AI',
        image: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const categories = ['Tech', 'News', 'AI', 'Tips', 'Other'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1500);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Network Error: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (success) {
        return (
            <div className="min-h-screen bg-brand-blue flex items-center justify-center p-4">
                <div className="glass-card p-10 max-w-md w-full text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Article Published!</h2>
                    <p className="text-white/60">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-blue/95 py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <Reveal type="slide-up">
                    <div className="flex items-center gap-4 mb-10">
                        <Link href="/admin/dashboard" className="text-white/60 hover:text-white transition-all">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-4xl font-bold text-white">Share Your Insights</h1>
                    </div>
                </Reveal>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Reveal type="fade" delay={0.1}>
                            <div className="glass-card p-6 border-white/10">
                                <label className="flex items-center gap-2 text-brand-sky font-semibold mb-3">
                                    <Layout size={18} />
                                    Article Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="The Future of Agentic AI..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all"
                                />
                            </div>
                        </Reveal>

                        <Reveal type="fade" delay={0.2}>
                            <div className="glass-card p-6 border-white/10">
                                <label className="flex items-center gap-2 text-brand-sky font-semibold mb-3">
                                    <Layout size={18} />
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all appearance-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-brand-blue">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </Reveal>
                    </div>

                    {/* Banner Image */}
                    <Reveal type="fade" delay={0.3}>
                        <div className="glass-card p-6 border-white/10">
                            <label className="flex items-center gap-2 text-brand-sky font-semibold mb-3">
                                <ImageIcon size={18} />
                                Banner Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/photo..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all"
                            />
                            <p className="text-white/40 text-xs mt-2 italic">Tip: Use Unsplash or Pixabay for high-quality tech images.</p>

                            {form.image && (
                                <div className="mt-4 rounded-xl overflow-hidden h-40 border border-white/5">
                                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Content area */}
                    <Reveal type="fade" delay={0.4}>
                        <div className="glass-card p-6 border-white/10">
                            <label className="flex items-center gap-2 text-brand-sky font-semibold mb-3">
                                <FileText size={18} />
                                Main Content
                            </label>
                            <textarea
                                required
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                rows={12}
                                placeholder="Write your article here... Markdown or plain text works best."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all h-[400px]"
                            ></textarea>
                        </div>
                    </Reveal>

                    {/* Submission Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            variant="premium"
                            color="orange"
                            className="px-12 py-4 h-auto text-lg gap-2"
                            disabled={isSubmitting}
                        >
                            <Save size={24} />
                            {isSubmitting ? 'Publishing...' : 'Publish Article'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
