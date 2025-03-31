import Image from 'next/image';
import Link from 'next/link';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-3">
                Muhammed Çavuş
              </h1>
              <h2 className="text-xl font-medium text-blue-600 mb-6 tracking-wide uppercase">Software Engineer</h2>
              <div className="flex justify-center space-x-3 mb-8">
                <a 
                  href="mailto:cavusmuhammed10@gmail.com" 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <EmailIcon /> Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/muhammed-%C3%A7avu%C5%9F-b16919280/" 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors text-blue-700"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
                <a 
                  href="https://github.com/mcavus10" 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-black rounded-full transition-colors text-white"
                >
                  <GitHubIcon /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Introduction Section */}
      <section className="relative py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Hi, I&apos;m Muhammed Çavuş, a final-year Software Engineering student passionate about backend development, 
                with a strong foundation in Java and the Spring Boot ecosystem.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I specialize in building scalable and secure APIs, and I&apos;m continuously improving my skills in 
                database systems and cloud-native architectures.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My experience includes working on e-commerce platforms and RESTful API design, and I&apos;m currently 
                focused on modern backend practices and professional development.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/resim.jpg" 
                  alt="Muhammed Çavuş" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Projects and Certificates */}
          <div>
            {/* Projects Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Projects
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100">
                  <h4 className="text-xl font-semibold text-blue-800 mb-3">Promixa.me</h4>
                  <p className="text-gray-600 mb-4">AI-powered platform offering creative tools for image generation, transcription, and content creation.</p>
                  <a 
                    href="https://promixa.me" 
                    target="_blank" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Visit Project <span className="ml-1">→</span>
                  </a>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-purple-100">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-purple-800">MoodMovies</h4>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">In Progress</span>
                  </div>
                  <p className="text-gray-600">
                    A social platform providing personalized movie recommendations based on personality analysis and mood tracking.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  href="https://github.com/mcavus10" 
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                  target="_blank"
                >
                  <GitHubIcon /> View all repositories
                </Link>
              </div>
            </div>
            
            {/* Certificates Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Certificates
              </h3>
              <ul className="space-y-4">
                <li className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 shadow-sm">
                  <div className="flex items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Java RESTful Web Service Development</h4>
                      <p className="text-gray-500 text-sm mt-1">Instructor: Akın Kadıroğlu</p>
                    </div>
                  </div>
                </li>
                
                <li className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100 shadow-sm">
                  <div className="flex items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Kotlin Android App Development</h4>
                      <p className="text-gray-500 text-sm mt-1">Instructor: Atıl Samancıoğlu</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column: Experience and Skills */}
          <div>
            {/* Experience Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Experience
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h4 className="text-xl font-semibold text-gray-800">Junior Web Developer</h4>
                    <span className="text-gray-500 text-sm">July 2023 - January 2024</span>
                  </div>
                  <h5 className="text-gray-600 font-medium mb-3">Teknostore - Istanbul</h5>
                  <p className="text-gray-600 mb-3">
                    I contributed to backend development of an e-commerce platform using PHP. I
                    collaborated on REST API design, database modeling, and server-side logic. I also
                    gained experience in SEO and digital marketing by optimizing keywords, analyzing
                    website performance, and improving search engine rankings.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h4 className="text-xl font-semibold text-gray-800">Software Development Intern</h4>
                    <span className="text-gray-500 text-sm">July 2024 - August 2024</span>
                  </div>
                  <h5 className="text-gray-600 font-medium mb-3">Ergineer Software - Remote</h5>
                  <p className="text-gray-600 mb-3">
                    This was a remote internship where I worked with the intern team on the &quot;Foogic&quot;
                    project. As a Web Development Intern, I designed responsive web pages using HTML,
                    CSS, and JavaScript, and developed interactive features. By collaborating with the
                    team, I contributed to the completion of the project prototype, which helped me
                    improve my web development and remote teamwork skills.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Skills
              </h3>
              
              {/* Backend Development */}
              <div className="mb-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Programing Language &amp; Frameworks</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Java</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Kotlin</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Spring Boot</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">JavaScript</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">PHP</span>
                </div>
              </div>
              
              {/* Database Management */}
              <div className="mb-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Database Management</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">PostgreSQL</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">MySQL</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">SQLite</span>
                </div>
              </div>
              
              {/* Other Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Other Skills</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">RESTful APIs</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Git &amp; GitHub</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Postman</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">AWS</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm">Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Muhammed Çavuş. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
