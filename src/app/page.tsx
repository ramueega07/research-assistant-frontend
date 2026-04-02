"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import ReactMarkdown from "react-markdown";

// PDF Viewer Imports
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';

interface Source {
  filename: string;
  page: string;
  content: string;
  type?: 'pdf' | 'web'; 
  link?: string;
}

interface Message {
  role: string;
  content: string;
  sources?: Source[];
}

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  // Ref for auto-scrolling
  const chatEndRef = useRef<HTMLDivElement>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Auto-scroll logic
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const uploadFiles = async () => {
    if (!files || files.length === 0) return alert("Please select PDFs first");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

    setLoading(true);
    setUploadStatus("Indexing...");
    try {
      await axios.post(`${BACKEND}/upload/`, formData);
      setUploadStatus("Success!");
    } catch (e: any) {
      alert(e.response?.data?.detail || "Error uploading.");
      setUploadStatus("Error");
    } finally {
      setLoading(false);
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const askQuestion = async () => {
    if (!question || loading ) return;

    const userMsg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      // Note: Changed from params to JSON body if your FastAPI @app.post("/query/") expects it
      const res = await axios.post(`${BACKEND}/query/`, null, { params: { q: currentQuestion } });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.answer, sources: res.data.sources || [] }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "**Error:** Could not reach the research agent." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r p-6 flex flex-col shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-tight">DeepScan AI</h2>
          <p className="text-xs text-slate-400 uppercase font-semibold mt-1">Research Assistant</p>
        </div>

        <div className="space-y-6 flex-1">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-bold text-blue-800 mb-2">Upload Guidelines</h3>
            <ul className="text-xs text-blue-700 space-y-1 list-disc ml-4">
              <li>Up to 5 PDF files</li>
              <li>Max 10 pages per file</li>
              <li>Wait for "Success" alert</li>
            </ul>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Select Documents</label>
            <input 
              type="file" multiple accept=".pdf" 
              onChange={(e) => setFiles(e.target.files)}
              className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
            <button 
              onClick={uploadFiles} disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition-all transform active:scale-95 ${
                loading ? "bg-slate-200 text-slate-400" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
              }`}
            >
              {uploadStatus || "Index Documents"}
            </button>
          </div>
        </div>
        
        {/* <div className="pt-6 border-t text-[10px] text-slate-400 text-center">
          Powered by Gemini & Groq RAG
        </div> */}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">🔍</div>
              <h3 className="text-xl font-bold text-slate-800">Ready to start?</h3>
              <p className="text-slate-500 mt-2">Upload your research papers in the sidebar, and I'll help you extract data and summarize key findings.</p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-5 py-4 rounded-2xl ${
                  m.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-md" 
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                  }`}>
                  {/* 🛑 REQUIREMENT: Markdown & Citations */}
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                    {m.sources.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (src.type === 'web' && src.link) {
                            window.open(src.link, '_blank'); 
                          } else {
                            setSelectedSource(src); 
                          }
                        }}
                        className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all font-bold"
                      >
                        <span>📄</span>
                        {src.type === 'web' ? '🌐' : '📄'} 
                        {src.type === 'web' ? 'View Source' : `${src.filename} (Pg ${src.page})`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-8 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="max-w-4xl mx-auto relative">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
              placeholder="Ask a question about your documents..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-6 pr-24 py-4 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button 
              onClick={askQuestion} 
              disabled={loading || !question.trim()}
              className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
      {selectedSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-700">{selectedSource.filename} - Page {selectedSource.page}</h3>
              <button onClick={() => setSelectedSource(null)} className="bg-red-100 text-red-600 px-4 py-1 rounded-lg font-bold hover:bg-red-200">Close</button>
            </div>
            <div className="flex-1 overflow-hidden">
              <PdfHighlighter source={selectedSource} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Component for PDF Highlighting
function PdfHighlighter({ source }: { source: Source }) {
  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;

  const cleanContent = source.content.replace(/\s+/g, ' ').trim();
  const highlightSnippet = cleanContent.length > 60 
    ? cleanContent.substring(0, 60) 
    : cleanContent;

  const onDocumentLoad = () => {
    // 🛑 Triggers the highlight automatically for the chunk text
      highlight({
        keyword: highlightSnippet,
        matchCase: false,
      });
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="h-full">
        <Viewer
          fileUrl={`http://localhost:8000/view-pdf/${source.filename}`}
          initialPage={parseInt(source.page) - 1}
          plugins={[searchPluginInstance]}
          onDocumentLoad={onDocumentLoad}
        />
      </div>
    </Worker>
  );
}
