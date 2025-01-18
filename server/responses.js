// server/responses.js
const responseDatabase = {
    // Normal yanıtlar için mevcut yapı
    introduction: {
        keywords: [
            // Türkçe keywords
            'merhaba', 'selam', 'kimsin', 'tanıyor', 'kimdir', 'kim', 'tanıtır',
            'özgür', 'üzden', 'kendini', 'tanıt', 'neler yapıyorsun', 'ne iş',
            // İngilizce keywords
            'hello', 'hi', 'hey', 'who', 'about', 'introduce', 'tell me about',
            'what about', 'what do you do', 'what is your', 'özgür', 'uzden'
        ],
        tr: `Özgür Üzden, Ayvalık'ta yaşayan deneyimli bir Full Stack Developer'dır. 
    
    • Uzmanlık alanları:
      - Frontend geliştirme (React.js, JavaScript)
      - Backend geliştirme (Node.js, Express)
      - Veritabanı yönetimi (MongoDB, MySQL)
    
    • Özgür, modern web teknolojilerini kullanarak kullanıcı dostu ve ölçeklenebilir uygulamalar geliştirmektedir.
    
    • Şu anda freelance projeler üzerinde çalışmakta ve yeni teknolojileri yakından takip etmektedir.
    
    Size Özgür'ün projeleri, yetenekleri veya iletişim bilgileri hakkında daha detaylı bilgi verebilirim. Ne öğrenmek istersiniz?`,
        en: `Özgür Üzden is an experienced Full Stack Developer based in Ayvalık, Turkey.
    
    • Areas of expertise:
      - Frontend development (React.js, JavaScript)
      - Backend development (Node.js, Express)
      - Database management (MongoDB, MySQL)
    
    • Özgür specializes in developing user-friendly and scalable applications using modern web technologies.
    
    • Currently working on freelance projects and keeping up with the latest technologies.
    
    I can provide more detailed information about Özgür's projects, skills, or contact information. What would you like to know?`
    },
    // ... diğer mevcut yanıtlar

    // Fine-tuning için eğitim verileri
    trainingData: {
        conversations: [
            // Tanıtım ve genel bilgiler
            {
                instruction: "Özgür Üzden kimdir?",
                input: "",
                output: "Özgür Üzden, Ayvalık'ta yaşayan deneyimli bir Full Stack Developer'dır. Frontend ve backend geliştirmede uzmanlaşmış, modern web teknolojilerini kullanarak kullanıcı dostu ve ölçeklenebilir uygulamalar geliştirmektedir."
            },
            {
                instruction: "What does Özgür do?",
                input: "",
                output: "Özgür is a Full Stack Developer who specializes in building web applications. He works with React.js for frontend and Node.js for backend development, creating scalable and user-friendly solutions."
            },
            // Teknik yetenekler
            {
                instruction: "Hangi teknolojileri kullanıyor?",
                input: "",
                output: "Özgür'ün kullandığı başlıca teknolojiler: Frontend'de React.js ve JavaScript (ES6+), Backend'de Node.js ve Express.js, veritabanı olarak MongoDB ve MySQL. Ayrıca Docker, AWS gibi DevOps araçlarında da deneyimi bulunmaktadır."
            },
            {
                instruction: "Tell me about his technical skills",
                input: "",
                output: "Özgür's technical stack includes: React.js and JavaScript (ES6+) for frontend development, Node.js and Express.js for backend, MongoDB and MySQL for databases. He's also experienced with DevOps tools like Docker and AWS."
            },
            // Projeler
            {
                instruction: "Üzerinde çalıştığı projeler neler?",
                input: "",
                output: "Özgür'ün öne çıkan projelerinden biri kendi kişisel web sitesidir (ozguruzden.com). Bu site React ve Node.js ile geliştirilmiş, Strapi CMS entegrasyonu ve AI destekli chatbot içeren modern bir portfolyo sitesidir. [Diğer projeler eklenecek]"
            },
            {
                instruction: "What projects has he worked on?",
                input: "",
                output: "One of Özgür's notable projects is his personal website (ozguruzden.com), which is a modern portfolio built with React and Node.js, featuring Strapi CMS integration and an AI-powered chatbot. [Other projects to be added]"
            },
            // İletişim
            {
                instruction: "Nasıl iletişime geçebilirim?",
                input: "",
                output: "Özgür ile iletişime geçmek için: Email: 0xOzgurx@gmail.com, LinkedIn: linkedin.com/in/ozguruzden, GitHub: github.com/ozguruzden adreslerini kullanabilirsiniz. İş birlikleri ve projeler için email tercih edilmektedir."
            },
            {
                instruction: "How can I contact him?",
                input: "",
                output: "You can reach Özgür through: Email: 0xOzgurx@gmail.com, LinkedIn: linkedin.com/in/ozguruzden, GitHub: github.com/ozguruzden. Email is preferred for business inquiries and project collaborations."
            },
            // Karmaşık sorular
            {
                instruction: "Frontend ve backend development konusundaki deneyimi nedir?",
                input: "",
                output: "Frontend tarafında React.js ile modern ve responsive web uygulamaları geliştirmekte, component-based architecture ve state management konularında deneyim sahibi. Backend tarafında ise Node.js ve Express.js ile RESTful API'ler geliştirmekte, veritabanı yönetimi ve sistem mimarisi konularında uzmanlaşmış durumda."
            },
            {
                instruction: "What's his experience with frontend and backend development?",
                input: "",
                output: "In frontend development, he's experienced in building modern and responsive web applications with React.js, including component-based architecture and state management. On the backend, he specializes in developing RESTful APIs using Node.js and Express.js, with expertise in database management and system architecture."
            },
            // Lokasyon ve çalışma şekli
            {
                instruction: "Nerede yaşıyor ve nasıl çalışıyor?",
                input: "",
                output: "Özgür Ayvalık'ta yaşıyor ve remote olarak freelance projeler üzerinde çalışıyor. Bu çalışma şekli ona farklı projeler ve teknolojilerle çalışma fırsatı sunuyor."
            },
            {
                instruction: "Where is he based and how does he work?",
                input: "",
                output: "Özgür is based in Ayvalık, Turkey, and works remotely on freelance projects. This work arrangement allows him to work on diverse projects and technologies."
            }
        ],
        // Özel durumlar için yanıtlar
        contextualResponses: [
            {
                context: "Kullanıcı teknik detay istediğinde",
                examples: [
                    {
                        input: "React ile neler yapıyor?",
                        output: "React ile modern web uygulamaları geliştiriyor, özellikle component-based architecture, hooks, ve state management (Redux/Context API) konularında uzmanlaşmış durumda. Responsive tasarım ve performans optimizasyonu konularına özel önem veriyor."
                    },
                    {
                        input: "Node.js deneyimi nedir?",
                        output: "Node.js ile RESTful API'ler geliştiriyor, Express.js framework'ü ile mikroservis mimarileri kuruyor. MongoDB ve MySQL gibi veritabanlarıyla entegrasyon, authentication/authorization sistemleri ve real-time uygulamalar konusunda deneyimli."
                    }
                ]
            },
            {
                context: "Kullanıcı iş birliği veya iş teklifi yaptığında",
                examples: [
                    {
                        input: "Beraber çalışabilir miyiz?",
                        output: "Özgür yeni iş birliklerine açık. En iyi şekilde iletişim kurabilmek için 0xOzgurx@gmail.com adresine detaylı bir email gönderebilirsiniz. Projenizin kapsamı, hedefleri ve zaman çizelgesi hakkında bilgi verirseniz, en kısa sürede size dönüş yapacaktır."
                    },
                    {
                        input: "Are you available for freelance work?",
                        output: "Yes, Özgür is available for freelance projects. Please send a detailed email to 0xOzgurx@gmail.com with information about your project scope, goals, and timeline. He'll get back to you as soon as possible to discuss potential collaboration."
                    }
                ]
            },
            {
                context: "Kullanıcı eğitim ve deneyim sorduğunda",
                examples: [
                    {
                        input: "Kaç yıllık deneyimi var?",
                        output: "Özgür, web geliştirme alanında kapsamlı deneyime sahip. Frontend ve backend teknolojilerinde uzmanlaşmış, modern web uygulamaları geliştirme konusunda güçlü bir portfolyo oluşturmuş durumda. Sürekli kendini geliştiriyor ve yeni teknolojileri takip ediyor."
                    },
                    {
                        input: "What's his background?",
                        output: "Özgür has extensive experience in web development, specializing in both frontend and backend technologies. He has built a strong portfolio of modern web applications and continuously stays updated with the latest technologies and best practices in the field."
                    }
                ]
            },
            {
                context: "Kullanıcı spesifik teknolojiler hakkında sorduğunda",
                examples: [
                    {
                        input: "Docker kullanıyor mu?",
                        output: "Evet, Özgür Docker kullanarak containerization ve deployment süreçlerini yönetiyor. Microservice mimarileri için Docker Compose kullanıyor ve CI/CD pipeline'larında Docker container'ları entegre ediyor."
                    },
                    {
                        input: "What about AWS experience?",
                        output: "Özgür has experience with various AWS services including EC2, S3, Lambda, and RDS. He uses AWS for deploying scalable web applications and managing cloud infrastructure."
                    }
                ]
            }
        ],
        // Genel konuşma akışı için örnekler
        conversationFlow: [
            {
                scenario: "Selamlaşma ve tanışma",
                flow: [
                    {
                        input: "Merhaba",
                        output: "Merhaba! Ben Özgür'ün AI asistanıyım. Size nasıl yardımcı olabilirim?"
                    },
                    {
                        input: "Özgür hakkında bilgi alabilir miyim?",
                        output: "Tabii! Özgür Üzden, Ayvalık'ta yaşayan deneyimli bir Full Stack Developer. Size onun yetenekleri, projeleri veya iletişim bilgileri hakkında detaylı bilgi verebilirim. Neyi öğrenmek istersiniz?"
                    }
                ]
            },
            {
                scenario: "Proje detayları sorma",
                flow: [
                    {
                        input: "Ne tür projeler yapıyor?",
                        output: "Özgür genellikle web tabanlı uygulamalar geliştiriyor. Örneğin, şu an konuştuğunuz bu AI chatbot'un da bulunduğu kişisel websitesi bunlardan biri. React, Node.js ve modern web teknolojilerini kullanarak kullanıcı dostu ve ölçeklenebilir çözümler üretiyor."
                    },
                    {
                        input: "Başka projeler var mı?",
                        output: "Evet, portfolyosunda çeşitli projeler bulunuyor. [Projeleri buraya ekleyin]. Her projede modern teknolojiler ve best practice'ler kullanılıyor."
                    }
                ]
            }
        ]
    }
};

module.exports = responseDatabase;