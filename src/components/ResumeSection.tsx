import React, { useState, useRef } from 'react';
import { personalInfo, experienceData, educationData, certificationsData, projectsData, skillCategories } from '../data/portfolioData';
import { FileText, Download, Printer, Copy, Check, Building, Mail, Phone, MapPin, Award, CheckCircle2, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export const ResumeSection: React.FC = () => {
  const [resumeView, setResumeView] = useState<'master' | 'mainframe' | 'cs-projects'>('master');
  const [copiedResume, setCopiedResume] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = resumeRef.current;
    if (!element) return;
    setIsGeneratingPdf(true);

    try {
      // Temporarily ensure high-quality, fixed-width A4 presentation during export without remote CSS CORS issues
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const margin = 6;
      const printWidth = pageWidth - (margin * 2);
      const printHeight = (img.height * printWidth) / img.width;

      // If the content is within 1 page (or within 5% tolerance of 1 page), scale to fit cleanly on 1 single page without any page break
      if (printHeight <= (pageHeight - margin * 2) * 1.12) {
        const adjustedHeight = Math.min(printHeight, pageHeight - (margin * 2));
        const adjustedWidth = (img.width * adjustedHeight) / img.height;
        const xOffset = margin + (printWidth - adjustedWidth) / 2;
        pdf.addImage(dataUrl, 'PNG', xOffset, margin, adjustedWidth, adjustedHeight);
      } else {
        // Multi-page cleanly paginated with white page header/footer margins
        let heightLeft = printHeight;
        let position = margin;
        const usablePageHeight = pageHeight - (margin * 2);

        pdf.addImage(dataUrl, 'PNG', margin, position, printWidth, printHeight);
        heightLeft -= usablePageHeight;

        while (heightLeft > 0) {
          position -= usablePageHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', margin, position, printWidth, printHeight);
          heightLeft -= usablePageHeight;
        }
      }

      // Trigger automatic file download
      pdf.save('Mulagala_Chaitanya_Resume.pdf');
    } catch (err) {
      console.error('Direct PDF creation error, invoking print preview fallback:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getPlainTextResume = () => {
    return `================================================================================
MULAGALA CHAITANYA
Mainframe Developer & Software Engineer
Phone: +91 7989520785 | Email: mulagalachaitanya@gmail.com | Location: Nellore, AP, India
Current: Capgemini India (Client: State Farm)
================================================================================

PROFESSIONAL SUMMARY
Mainframe Developer with 1.5+ years of experience in Mainframe technology, specializing in COBOL, JCL, DB2, VSAM, PLI, IMSDB, TSO, and SPOOL. Proven ability to develop and maintain batch/online systems, perform defect analysis, handle incidents, and deliver quality results within deadlines. Strong analytical and debugging skills with excellent adaptability and out-of-box thinking. Associate Team Leader responsibilities in sprint delivery and audit tracking.

PROFESSIONAL EXPERIENCE
Capgemini Technology Services India Pvt Ltd | India
Mainframe Developer (Sep 2024 – Present)
Client: State Farm | Project: Health Host | Environment: COBOL, JCL, DB2, SQL, VSAM, FTP
- Developed, designed, and unit-tested functional modules; performed integration testing across systems.
- Created test cases, performed defect analysis, and resolved defects in existing systems.
- Actively participated in technical and design discussions during the project development process.
- Developed programming logic for mass data extraction; evaluated and validated data based on new business rules and system design.
- Developed and maintained batch/online systems ensuring reliability and performance.
- Handled incidents and communicated with end users to resolve issues in a timely manner.
- Tracked all requests and maintained the database for accurate record-keeping.
- Generated weekly and monthly reports and distributed them to managers and respective teams.
- Reviewed, updated, and maintained process documents to ensure accuracy and compliance.
- Assumed responsibilities of an Associate Team Leader, supporting team coordination and delivery.

TECHNICAL SKILLS
- Languages: COBOL, JCL, PL/I, Python, Java, JavaScript, TypeScript
- File Systems & Databases: VSAM (KSDS/ESDS), PS, PDS, DB2, SQL, IMSDB, MySQL, MongoDB
- Resource & Environment: TSO/ISPF, SPOOL, IBM z/OS
- Tools & Frameworks: SoapUI, ServiceNow, Shovel, Environment Sheet, GitLab, Power BI, Angular, React

KEY PROJECTS
1. Health Host (State Farm): Enterprise mainframe batch data extraction, DB2 queries, VSAM datasets, SLA compliance.
2. Tourism & Experience Booking Platform: Full-stack booking engine with Angular, Node.js, real-time slots, and multi-gateway checkout.
3. Computer Vision Image Dehazing & Dust Detection: Dark channel prior algorithm, histogram equalization, dust artifact isolation in Python OpenCV.
4. Predictive Sales Analytics & Power BI Dashboard: ML regression pipeline with dynamic DAX measures and seasonality forecasting.

EDUCATION
- Bachelor of Engineering (B.E.) in Computer Science and Engineering
  Chennai Institute of Technology | 2020 – 2024 | CGPA: 8.5
- Higher Secondary Education (Class XII)
  Narayana Junior College | 2018 – 2020 | CGPA: 9.1

CERTIFICATIONS & HONORS
- Certification of Excellence for outstanding service to client at Capgemini (State Farm)
- Cisco: Introduction to Cyber Security
- Cisco: Cyber Security Essentials
- Cisco: Programming Essentials in Python
- Awarded "Best Outgoing Student" in Intermediate (Class XII) and Class X
================================================================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPlainTextResume());
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([getPlainTextResume()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Mulagala_Chaitanya_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="resume" className="py-20 md:py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            OFFICIAL RESUME
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Vitae & Credentials
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Review the verified CV, download formatted versions, or save as an A4 PDF document.
          </p>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs sm:text-sm transition shadow-sm hover:shadow-md cursor-pointer"
              title="Download formatted PDF file"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Save as PDF (.pdf)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 shadow-2xs transition"
              title="Print via browser dialog"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Preview</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 shadow-2xs transition"
              title="Download text resume"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download .txt</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 shadow-2xs transition"
            >
              {copiedResume ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Resume Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Plaintext</span>
                </>
              )}
            </button>
          </div>

          {/* Format View Tabs */}
          <div className="flex justify-center gap-2 mt-6">
            {[
              { id: 'master', label: 'Consolidated Master CV' },
              { id: 'mainframe', label: 'Capgemini Enterprise CV' },
              { id: 'cs-projects', label: 'CS & Projects CV' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setResumeView(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  resumeView === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Paper Resume Sheet */}
        <div
          ref={resumeRef}
          id="printable-resume-sheet"
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
        >
          {/* Header on Paper */}
          <div className="border-b border-slate-200 print:border-gray-300 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 print:text-black tracking-tight">
                MULAGALA CHAITANYA
              </h1>
              <div className="text-sm font-bold text-blue-600 print:text-blue-700 mt-0.5">
                Mainframe Developer & Software Engineer
              </div>
              <div className="text-xs text-slate-600 print:text-gray-700 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-600 print:text-gray-600" />
                  +91-7989520785
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600 print:text-gray-600" />
                  mulagalachaitanya@gmail.com
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-blue-600 print:text-gray-600" />
                  Capgemini India (State Farm)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 print:text-gray-600" />
                  Nellore, AP, India
                </span>
              </div>
              <div className="text-xs text-slate-600 print:text-gray-700 flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1 font-mono">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline print:text-black font-semibold"
                >
                  linkedin.com/in/chaitanya-mulagala
                </a>
                <span>•</span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline print:text-black font-semibold"
                >
                  github.com/Chaitanya2102
                </a>
              </div>
            </div>

            {/* Profile Photo on Resume */}
            <div className="shrink-0">
              <img
                src={personalInfo.photo}
                alt="Mulagala Chaitanya"
                referrerPolicy="no-referrer"
                className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover ring-2 ring-blue-600/20 print:ring-1 print:ring-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Section 1: Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-700 print:text-gray-800 leading-relaxed">
              Mainframe Developer with 1.5+ years of experience in enterprise Mainframe technology, specializing in COBOL, JCL, DB2, VSAM, PL/I, IMSDB, TSO, and SPOOL. Proven ability to architect and maintain batch/online systems, perform defect analysis, handle high-priority incidents, and deliver high-volume data extractions under strict SLAs. Experienced in full-stack web development and Python data engineering, with strong leadership acumen as an Associate Team Leader.
            </p>
          </div>

          {/* Section 2: Professional Experience */}
          {(resumeView === 'mainframe' || resumeView === 'master') && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
                Professional Experience
              </h2>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-between items-start gap-1">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 print:text-black">
                      Capgemini Technology Services India Pvt Ltd
                    </h3>
                    <div className="text-xs text-blue-600 print:text-blue-700 font-semibold">
                      Mainframe Developer • Associate Team Leader Responsibilities
                    </div>
                    <div className="text-[11px] text-slate-500 print:text-gray-600 font-mono mt-0.5">
                      Client: State Farm | Project: Health Host | Environment: COBOL, JCL, DB2, SQL, VSAM, FTP, TSO, SPOOL
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 print:text-gray-700">
                    Sep 2024 – Present | India
                  </div>
                </div>

                <ul className="space-y-1 text-xs sm:text-[13px] text-slate-700 print:text-gray-800 pl-4 list-disc">
                  <li>Developed, designed, and unit-tested functional modules; performed integration testing across interconnected host systems.</li>
                  <li>Created comprehensive test cases, performed defect analysis, and resolved critical defects in existing systems.</li>
                  <li>Actively participated in technical and design governance discussions during the project development lifecycle.</li>
                  <li>Developed programming logic for mass data extraction; evaluated and validated data based on new business rules.</li>
                  <li>Developed and maintained batch and online systems ensuring reliability, zero downtime, and high performance.</li>
                  <li>Handled incidents and communicated with end users and client teams to resolve issues in a timely manner.</li>
                  <li>Assumed responsibilities of an Associate Team Leader, supporting sprint coordination, delivery deadlines, and team alignment.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Section 3: Technical Skills Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-[13px] text-slate-700 print:text-gray-800 font-mono">
              <div>
                <strong className="text-slate-900 print:text-black">Languages:</strong> COBOL, JCL, PL/I, Python, Java, JavaScript, TypeScript
              </div>
              <div>
                <strong className="text-slate-900 print:text-black">File Systems:</strong> VSAM (KSDS/ESDS), PS, PDS
              </div>
              <div>
                <strong className="text-slate-900 print:text-black">Databases:</strong> DB2, SQL, IMSDB, MySQL, MongoDB
              </div>
              <div>
                <strong className="text-slate-900 print:text-black">Resource Management:</strong> TSO, SPOOL, IBM z/OS
              </div>
              <div className="sm:col-span-2">
                <strong className="text-slate-900 print:text-black">Tools & Frameworks:</strong> SoapUI, ServiceNow, Shovel, Environment Sheet, GitLab, Power BI, Angular, React
              </div>
            </div>
          </div>

          {/* Section 4: Projects (CS & Master) */}
          {(resumeView === 'cs-projects' || resumeView === 'master') && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
                Featured Projects
              </h2>

              <div className="space-y-2 text-xs sm:text-[13px]">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 print:text-black">
                    <span>1. Tourism & Travel Experience Website</span>
                    <span className="font-mono text-[11px] text-slate-500 print:text-gray-600 font-normal">Angular, Node.js, MongoDB/MySQL</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 print:text-gray-800 mt-0.5">
                    <li>Designed an intuitive UI and database of tour packages with destination details, duration, itinerary, and live pricing.</li>
                    <li>Developed a secure booking and payment system with real-time seat availability, confirmation emails, and checkout.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 print:text-black">
                    <span>2. Computer Vision Image Dehazing & Dust Detection</span>
                    <span className="font-mono text-[11px] text-slate-500 print:text-gray-600 font-normal">Python, OpenCV, NumPy</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 print:text-gray-800 mt-0.5">
                    <li>Implemented dark channel prior and adaptive contrast histogram equalization to eliminate atmospheric haze.</li>
                    <li>Developed a robust dust detection algorithm that identifies dust particles and optical artifacts across input images.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 print:text-black">
                    <span>3. Sales Forecasting & Power BI Predictive Analytics</span>
                    <span className="font-mono text-[11px] text-slate-500 print:text-gray-600 font-normal">Python, Power BI, DAX, Power Query</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 print:text-gray-800 mt-0.5">
                    <li>Collected historical sales data with seasonality factors and integrated ML regression models into Power BI with DAX.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
              Education
            </h2>

            <div className="space-y-2 text-xs sm:text-[13px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 print:text-black">Chennai Institute of Technology</h3>
                  <div className="text-slate-600 print:text-gray-700 text-xs">
                    Bachelor of Engineering (B.E.) — Computer Science and Engineering
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-blue-600 print:text-blue-700 text-xs">CGPA: 8.5 / 10</div>
                  <div className="text-[11px] text-slate-500 print:text-gray-600">Graduated 2024</div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 print:text-black">Narayana Junior College</h3>
                  <div className="text-slate-600 print:text-gray-700 text-xs">
                    Higher Secondary Education (Class XII)
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-blue-600 print:text-blue-700 text-xs">CGPA: 9.1 / 10</div>
                  <div className="text-[11px] text-slate-500 print:text-gray-600">2018 – 2020</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Certifications & Achievements */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600 print:text-blue-800 border-b border-slate-100 print:border-gray-300 pb-0.5">
              Certifications & Achievements
            </h2>

            <ul className="space-y-1 text-xs sm:text-[13px] text-slate-700 print:text-gray-800 pl-4 list-disc">
              <li><strong>Certification of Excellence:</strong> Received for outstanding service and deliverable excellence to client at Capgemini.</li>
              <li><strong>Cisco Certified:</strong> Introduction to Cyber Security, Cyber Security Essentials, Programming Essentials in Python.</li>
              <li><strong>Academic Distinction:</strong> Awarded "Best Outgoing Student" in Intermediate (Class XII) and Class X.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
