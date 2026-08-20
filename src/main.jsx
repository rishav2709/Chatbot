import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Send, X, Sparkles, UserRound, BriefcaseBusiness, GraduationCap, FolderKanban, Code2, Mail } from 'lucide-react';
import './styles.css';

const quickQuestions = [
  { label: 'About Rishav', icon: UserRound },
  { label: 'Experience', icon: BriefcaseBusiness },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Skills', icon: Code2 },
  { label: 'Education', icon: GraduationCap },
  { label: 'Contact', icon: Mail }
];

const knowledge = [
  { keys: ['about', 'who is', 'tell me about', 'rishav'], answer: "Rishav Sharma is a research professional focused on turning data into decisions. His work spans qualitative and quantitative research, data validation, analysis, insight generation and stakeholder coordination." },
  { keys: ['experience', 'work', 'job', 'current role', 'research executive'], answer: "Rishav currently works as a Research Executive. He has experience managing end-to-end research assignments, including study materials, surveys, qualitative and quantitative research, field coordination, data cleaning, analysis, reporting and client presentations." },
  { keys: ['project', 'projects', 'worked on', 'case study'], answer: "Rishav has worked on higher-education ranking exercises, customer satisfaction research in the renewable-energy sector, consumer and market research, and B2B, B2C and government-oriented assignments. His project work covers data collection, validation, analysis, findings and actionable recommendations." },
  { keys: ['skill', 'skills', 'expertise', 'tools', 'excel', 'power bi', 'python'], answer: "His key capabilities include market research, qualitative and quantitative methodologies, CATI, CAWI, IDI, FGD, questionnaire and discussion-guide development, data validation, data cleaning, secondary research, cross-tabs, trend analysis, Excel, Power BI and Python basics." },
  { keys: ['education', 'study', 'college', 'degree', 'mba', 'pgdm', 'bba'], answer: "Rishav's academic background includes a BBA in Banking & Insurance and postgraduate management education with a focus on Marketing and Business Analytics." },
  { keys: ['contact', 'email', 'hire', 'reach', 'linkedin'], answer: "You can contact Rishav through the contact section of this website. Feel free to use the available professional contact and social links to discuss research, analytics or career opportunities." },
  { keys: ['ranking', 'college ranking', 'b school'], answer: "Rishav has contributed to large-scale higher-education ranking work, coordinating institute data collection and validation and supporting ranking-related research processes across participating institutions." },
  { keys: ['csat', 'customer satisfaction', 'renewable', 'tata power'], answer: "Rishav has worked on a customer satisfaction study in the renewable-energy sector, covering customer feedback collection, parameter-wise analysis, voice-of-customer themes, gap identification and recommendations. Project-sensitive information remains confidential." }
];

function getAnswer(question) {
  const q = question.toLowerCase();
  const match = knowledge
    .map(item => ({ item, score: item.keys.reduce((n, key) => n + (q.includes(key) ? key.length : 0), 0) }))
    .sort((a, b) => b.score - a.score)[0];
  if (match && match.score > 0) return match.item.answer;
  return "I don't have a verified answer for that yet 😊 Try asking me about Rishav's experience, projects, skills, education, research work or contact details.";
}

function ChotuAvatar({ open }) {
  return <div className={open ? 'avatar active' : 'avatar'} aria-label="Chotu animated assistant">
    <div className="hair" /><div className="head"><span className="eye left" /><span className="eye right" /><span className="smile" /></div>
    <div className="neck" /><div className="body"><span className="shirt-mark">R</span></div>
    <div className="legs"><span /><span /></div><div className="shadow" />
  </div>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: "Hi! 👋 I'm Chotu, Rishav's personal chatbot. You can ask me anything about Rishav — his experience, skills, projects, education, and the work featured on this website! 😊" }]);
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, open]);
  const suggestions = useMemo(() => quickQuestions.slice(0, 4), []);

  function ask(text) {
    const question = text.trim();
    if (!question) return;
    setMessages(m => [...m, { role: 'user', text: question }, { role: 'bot', text: getAnswer(question) }]);
    setInput('');
  }

  return <>
    <div className="demo-page"><div className="demo-card"><Sparkles size={20} /><div><strong>Chotu is ready</strong><p>Floating portfolio assistant preview</p></div></div></div>
    <div className="chotu-widget">
      {open && <section className="chat-panel" role="dialog" aria-label="Chat with Chotu">
        <header><div className="chat-title"><div className="mini-avatar">👦</div><div><strong>Chotu</strong><span><i /> Online · Rishav's assistant</span></div></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button></header>
        <div className="chat-body">
          {messages.map((m, i) => <div key={i} className={'message ' + m.role}>{m.role === 'bot' && <span className="bot-badge">C</span>}<div>{m.text}</div></div>)}
          {messages.length === 1 && <div className="quick-grid">{suggestions.map(({ label, icon: Icon }) => <button key={label} onClick={() => ask(label)}><Icon size={15} />{label}</button>)}</div>}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={e => { e.preventDefault(); ask(input); }}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Chotu anything..." aria-label="Ask Chotu" /><button type="submit" disabled={!input.trim()}><Send size={18} /></button></form>
      </section>}
      {!open && <div className="speech">Ask me about Rishav! <span>👋</span></div>}
      <button className="avatar-button" onClick={() => setOpen(v => !v)} aria-label="Open Chotu chatbot"><ChotuAvatar open={open} /><span className="online-dot" /></button>
    </div>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
