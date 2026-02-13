import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Linkedin, Home, Copy, Check } from "lucide-react";
import PawIcon from "@/components/PawIcon";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const BlogPostPage = () => {
    const { slug } = useParams();
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
                <Link to="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    // Related posts
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    // Fallback if no related in category, just pick others
    const finalRelatedPosts = relatedPosts.length > 0
        ? relatedPosts
        : blogPosts.filter(p => p.id !== post.id).slice(0, 3);

    const handleShare = (platformUrl: string, shouldCopy: boolean = false) => {
        // Only copy link if it's the copy button
        if (shouldCopy) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast({
                title: "Link Copied!",
                description: "Article link copied to clipboard.",
            });

            setTimeout(() => setCopied(false), 2000);
        }

        // Open platform
        if (platformUrl) {
            window.open(platformUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF5] font-sans selection:bg-orange-200">
            {/* Custom Sticky Header */}
            <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-orange-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-orange-50 rounded-full transition-colors text-gray-500 hover:text-orange-600" title="Back to Home">
                            <Home className="w-5 h-5" />
                        </Link>
                        <div className="h-6 w-px bg-gray-200" />
                        <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <PawIcon size="sm" variant="brown" />
                        <span className="font-bold text-gray-800 text-lg hidden sm:block">PawNote</span>
                    </div>
                </div>
            </header>

            <main className="pb-24">
                {/* Hero / Header */}
                <div className="relative py-16 md:py-24 bg-white border-b border-orange-50">
                    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 mb-8 font-medium">
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                {post.category}
                            </span>
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5 text-orange-400" /> {post.date}
                            </span>
                            <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-orange-400" /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl md:leading-[1.15] font-extrabold text-gray-900 mb-8 max-w-3xl mx-auto">
                            {post.title}
                        </h1>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 relative z-10">
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/10 border-4 border-white">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <article className="max-w-3xl mx-auto px-4 md:px-8 mt-16">
                    {/* Main Content Body */}
                    <div
                        className="prose prose-lg prose-orange hover:prose-a:text-orange-600 max-w-none text-gray-700 leading-relaxed mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* FAQs Section */}
                    {post.faqs && post.faqs.length > 0 && (
                        <div className="bg-orange-50/50 rounded-3xl p-8 md:p-10 border border-orange-100 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="bg-orange-200 text-orange-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">?</span>
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-6">
                                {post.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.question}</h4>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200 pt-10 mb-20">
                        <span className="font-bold text-gray-900 text-lg">Share this article</span>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all" onClick={() => handleShare("https://www.instagram.com/entrext.labs", false)}>
                                <div className="w-4 h-4"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></div>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all" onClick={() => handleShare("https://discord.com/invite/ZZx3cBrx2", false)}>
                                <div className="w-4 h-4"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M18.93 5.34a16.89 16.89 0 0 0-4.07-1.23.06.06 0 0 0-.07.03c-.18.31-.38.72-.52 1.04a15.72 15.72 0 0 0-4.54 0c-.14-.32-.35-.73-.53-1.04a.06.06 0 0 0-.07-.03 16.84 16.84 0 0 0-4.07 1.23.06.06 0 0 0-.03.02C2.1 9.42 1.26 13.38 1.68 17.29a.07.07 0 0 0 .03.05 16.94 16.94 0 0 0 5.02 2.47.06.06 0 0 0 .07-.02c.39-.52.74-1.06 1.04-1.64a.06.06 0 0 0-.03-.09 11.12 11.12 0 0 1-1.56-.73.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .07-.01c3.27 1.46 6.81 1.46 10.04 0a.06.06 0 0 1 .07.01c.1.08.21.16.31.24a.06.06 0 0 1 0 .1c-.5.28-1.02.53-1.56.73a.06.06 0 0 0-.04.09c.3.58.66 1.12 1.04 1.64a.06.06 0 0 0 .07.02 16.9 16.9 0 0 0 5.02-2.47.06.06 0 0 0 .03-.05c.5-5.05-.84-9.44-3.55-13.32a.05.05 0 0 0-.02-.03zM8.68 14.56c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.95 2.36-2.15 2.36zm7.94 0c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.94 2.36-2.15 2.36z" /></svg></div>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all" onClick={() => handleShare("https://www.linkedin.com/company/entrext/", false)}>
                                <Linkedin className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all" onClick={() => handleShare("", true)}>
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {finalRelatedPosts.length > 0 && (
                    <div className="bg-white py-20 border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 md:px-8">
                            <h2 className="text-3xl font-bold mb-10 text-gray-900">Keep Reading</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {finalRelatedPosts.map((related, idx) => (
                                    <Link to={`/blog/${related.slug}`} key={idx} className="group">
                                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-all duration-300">
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <span className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">{related.category}</span>
                                                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                                                    {related.title}
                                                </h3>
                                                <div className="mt-auto text-sm font-semibold text-gray-500 flex items-center group-hover:translate-x-1 transition-transform">
                                                    Read Now <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default BlogPostPage;
