import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import PawIcon from "@/components/PawIcon";


const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#FFFBF5] font-sans selection:bg-primary/20">
            {/* Custom Simple Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-2">
                        <div className="bg-orange-100 p-2 rounded-xl group-hover:bg-orange-200 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-orange-700" />
                        </div>
                        <span className="font-bold text-gray-700 group-hover:text-primary transition-colors">Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <PawIcon size="sm" variant="brown" />
                        <span className="font-extrabold text-xl tracking-tight text-gray-800">PawNote <span className="text-primary">Blog</span></span>
                    </div>
                </div>
            </header>

            <main className="pt-16 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>The Pet Parent Library</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Expert Advice for <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Panic-Free Pet Parenting</span>
                    </h1>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Recovering from the vet doesn't have to be scary. Read our guides on post-op care, health tracking, and anxiety management.
                    </p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 pt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedCategory === cat
                                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredPosts.map((post, index) => (
                            <Link to={`/blog/${post.slug}`} key={post.id} className="block h-full group">
                                <motion.article
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 h-full flex flex-col"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-900 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-500 text-base leading-relaxed mb-6 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-sm font-bold">
                                            <span className="text-amber-600 group-hover:underline decoration-2 underline-offset-4">Read Article</span>
                                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-amber-600 transform group-hover:translate-x-1 transition-transform">
                                                <ArrowLeft className="w-4 h-4 rotate-180" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200"
                    >
                        <PawIcon size="lg" className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
                        <p className="text-gray-500 mb-6">We couldn't find any articles in this category.</p>
                        <Button variant="outline" onClick={() => setSelectedCategory("All")} className="rounded-full">View all posts</Button>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
