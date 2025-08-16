import React from 'react';

const testimonials = [
    {
        quote: "The AI tutor is amazing! It explains difficult concepts in Telugu so well. My son's confidence has skyrocketed.",
        name: 'S. Rao',
        title: 'Parent from Andhra Pradesh',
        avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
        quote: "I love the mock tests. They feel just like the real exam, and the performance analysis helps me know exactly where to improve.",
        name: 'Priya K.',
        title: 'Class 5 Student, Telangana',
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        quote: "This platform made studying fun. The leaderboards motivated me to practice every day. I finally feel ready for the exam!",
        name: 'Amit Singh',
        title: 'Class 5 Student, Uttar Pradesh',
        avatar: 'https://i.pravatar.cc/150?img=7'
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 sm:py-32 section-bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by Students and Parents</h2>
                    <p className="mt-4 text-lg text-slate-400">Hear what our users have to say about their success.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="glass-effect rounded-2xl p-8 flex flex-col">
                            <p className="text-slate-300 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-6">
                                <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                                <div className="ml-4">
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-slate-400">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;