"use client";

import { ProjectStartForm } from '@/components/forms/project-start-form';
import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Github,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Rocket,
    Star,
    Twitter,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
            
            {/* Back Button */}
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
            >
            <Button variant="outline" asChild className="group">
                <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Ana Sayfaya Dön
                </Link>
            </Button>
            </motion.div>

            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
            >
            <Badge variant="secondary" className="mb-4">
                <MessageCircle className="w-4 h-4 mr-2" />
                İletişim
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Haydi <span className="text-primary">Konuşalım</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Projeniz hakkında konuşmak, teknik danışmanlık almak veya sadece 
                merhaba demek için benimle iletişime geçebilirsiniz.
            </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Content - Contact Info & Social */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 space-y-8"
            >
                {/* Contact Methods */}
                <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">E-posta</div>
                        <a 
                        href="mailto:barismercan53@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        >
                        barismercan53@gmail.com
                        </a>
                        <p className="text-xs text-gray-500">En hızlı iletişim yolu</p>
                    </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">Telefon</div>
                        <a 
                        href="tel:+905435535310"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        >
                        +90 543 553 5310
                        </a>
                        <p className="text-xs text-gray-500">WhatsApp mevcut</p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">Lokasyon</div>
                        <div className="text-muted-foreground">İstanbul, Türkiye</div>
                        <p className="text-xs text-gray-500">GMT+3 saat dilimi</p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Availability Status */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Müsaitlik Durumu</h3>
                
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium text-green-700">Yeni projeler için müsait</span>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Yanıt Süresi
                    </span>
                    <span className="font-semibold text-green-600">24 saat içinde</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Çalışma Saatleri
                    </span>
                    <span className="font-semibold">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Proje Kapasitesi
                    </span>
                    <span className="font-semibold text-orange-500">1/3 dolu</span>
                    </div>
                </div>
                </div>

                {/* Social Media */}
                <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold mb-4 text-gray-900">Sosyal Medya</h4>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild className="hover:bg-gray-900 hover:text-white transition-colors">
                    <a href="https://github.com/barismercann" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                    </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-600 hover:text-white transition-colors">
                    <a href="https://www.linkedin.com/in/bar%C4%B1%C5%9F-mercan-28786b27a/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                    </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-400 hover:text-white transition-colors">
                    <a href="https://x.com/Barismercan_" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                    </a>
                    </Button>
                </div>
                </div>

                {/* Testimonial Preview */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-sm text-blue-800 italic mb-3">
                    &apos;Barış ile çalışmak harika bir deneyimdi. Projemizi zamanında ve beklentilerimizin üzerinde teslim etti.&apos;
                </p>
                <div className="text-xs text-blue-600 font-medium">
                    - Ahmet K., Fabrikam Corp CEO
                </div>
                </div>
            </motion.div>

            {/* Right Content - Project Start Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-8"
            >
                {/* Form Container with Dark Theme */}
                <div className="bg-dark rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-4">
                    <Rocket className="w-4 h-4 mr-2" />
                    Proje Başlat
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Projenizi Hayata Geçirelim</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Proje bilgilerinizi paylaşın, size özel çözüm önerisi hazırlayalım ve kısa sürede başlayalım.
                    </p>
                </div>

                {/* Project Start Form */}
                <ProjectStartForm />

                {/* Benefits Section */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-center">✨ Neden Benimle Çalışmalısınız?</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                        <div className="font-medium text-sm">İlk 30 dakika ücretsiz</div>
                        <div className="text-xs text-gray-400">Proje değerlendirmesi</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                        <div className="font-medium text-sm">24 saat içinde yanıt</div>
                        <div className="text-xs text-gray-400">Hızlı iletişim garantisi</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                        <div className="font-medium text-sm">Modern teknolojiler</div>
                        <div className="text-xs text-gray-400">En son framework&apos;ler</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                        <div className="font-medium text-sm">3 ay ücretsiz destek</div>
                        <div className="text-xs text-gray-400">Teslim sonrası bakım</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </motion.div>
            </div>

            {/* FAQ Section */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
            >
            <h2 className="text-3xl font-bold text-center mb-12">Sık Sorulan Sorular</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                {
                    question: "Ne kadar sürede proje teslim ediyorsunuz?",
                    answer: "Projenin kapsamına bağlı olarak 2-12 hafta arasında değişiyor. İlk görüşmede kesin süre belirleyebiliriz."
                },
                {
                    question: "Hangi teknolojileri kullanıyorsunuz?",
                    answer: "Next.js, React, TypeScript, Node.js, PostgreSQL, MongoDB gibi modern teknolojilerle çalışıyorum."
                },
                {
                    question: "Proje sonrası destek veriyor musunuz?",
                    answer: "Evet, teslim sonrası 3 ay ücretsiz destek ve bakım hizmeti sunuyorum."
                },
                {
                    question: "Ödeme koşullarınız nedir?",
                    answer: "Genellikle Peşin yada %40 başlangıç, %30 ara ödeme, %30 teslim şeklinde çalışıyorum."
                }
                ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-3 text-gray-900">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
                ))}
            </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white"
            >
            <h2 className="text-3xl font-bold mb-4">Hala Kararsız mısınız?</h2>
            <p className="text-xl mb-8 opacity-90">
                15 dakikalık ücretsiz danışmanlık görüşmesi ayarlayabilirsiniz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                <a href="https://calendly.com/barismercan" target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-5 h-5 mr-2" />
                    Randevu Al
                </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                <a href="mailto:barismercan53@gmail.com" className='text-dark hover:text-primary transition-colors'>
                    <Zap className="w-5 h-5 mr-2" />
                    <span>E-posta Gönder</span>
                </a>
                </Button>
            </div>
            </motion.div>
        </div>
        </div>
    );
}