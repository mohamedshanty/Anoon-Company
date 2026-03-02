"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit, ExternalLink, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Loader from '@/components/ui/Loader';

export default function AdminDashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/articles');
            const data = await res.json();
            if (data.success) {
                setArticles(data.data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    const deleteArticle = async (id) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setArticles(articles.filter(a => a._id !== id));
            } else {
                alert('Delete failed: ' + data.error);
            }
        } catch (err) {
            alert('Delete error: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-brand-blue/95 py-32 px-4">
            <div className="main-container">
                <Reveal type="slide-up">
                    <SectionHeader
                        title="Admin Dashboard"
                        subtitle="Manage your articles and blog posts"
                        align="left"
                        starsCount={10}
                    />
                </Reveal>

                <div className="mt-8 flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
                    <Link href="/admin/new">
                        <Button variant="premium" color="orange" className="gap-2">
                            <Plus size={20} />
                            New Article
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader />
                        <p className="text-brand-sky mt-4 animate-pulse">Loading your articles...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl flex items-center gap-4">
                        <AlertTriangle size={32} />
                        <div>
                            <p className="font-bold">Error loading database</p>
                            <p className="text-sm opacity-80">{error}</p>
                        </div>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 glass-card bg-white/5 border-white/10 rounded-2xl">
                        <p className="text-white/60 text-lg mb-6">No articles found in the database.</p>
                        <Link href="/admin/new">
                            <Button variant="outline" color="sky">Build Your First Content</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article, idx) => (
                            <Reveal key={article._id} type="fade" delay={idx * 0.1}>
                                <div className="glass-card bg-white/5 border border-white/10 overflow-hidden rounded-2xl transition-all duration-300 hover:border-brand-sky/50 hover:bg-white/10 group h-full flex flex-col">
                                    {article.image && (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-brand-sky text-white text-xs font-bold rounded-full">
                                                {article.category}
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                                        <p className="text-white/60 text-sm line-clamp-3 mb-6 flex-1">
                                            {article.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-white/40 text-xs">
                                                {new Date(article.createdAt).toLocaleDateString()}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => deleteArticle(article._id)}
                                                    className="p-2 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <Link href={`/techBlog/${article._id}`} target="_blank">
                                                    <button className="p-2 text-white/40 hover:text-brand-sky hover:bg-brand-sky/10 rounded-lg transition-all">
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
