import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  getWelcomeMessage,
  getChatReply,
  getQuickActions,
} from '../utils/chatbotEngine';

function renderMarkdownLite(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

function BotAvatar() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-saffron-dark text-sm font-bold text-white shadow-md"
      aria-hidden
    >
      स
    </span>
  );
}

export default function AssistanceChatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }, []);

  const pushBotMessage = useCallback(
    (payload) => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: payload.text,
          link: payload.link,
        },
      ]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const initChat = useCallback(() => {
    const welcome = getWelcomeMessage(lang);
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        text: welcome.text,
      },
    ]);
    setInitialized(true);
  }, [lang]);

  useEffect(() => {
    if (open && !initialized) initChat();
  }, [open, initialized, initChat]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const openFromNav = () => setOpen(true);
    window.addEventListener('open-assistance-chat', openFromNav);
    return () => window.removeEventListener('open-assistance-chat', openFromNav);
  }, []);

  const handleLanguageChange = (next) => {
    setLang(next);
    setInitialized(false);
    setMessages([]);
    if (open) {
      setTimeout(() => {
        const welcome = getWelcomeMessage(next);
        setMessages([{ id: 'welcome', role: 'bot', text: welcome.text }]);
        setInitialized(true);
      }, 0);
    }
  };

  const sendUserMessage = async (text, actionId = null) => {
    const trimmed = text?.trim();
    if (!trimmed && !actionId) return;

    const displayText =
      trimmed ||
      getQuickActions(lang).find((a) => a.id === actionId)?.label ||
      trimmed;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', text: displayText },
    ]);
    setInput('');
    setTyping(true);
    scrollToBottom();

    try {
      const reply = await getChatReply(trimmed || displayText, lang, actionId);
      await new Promise((r) => setTimeout(r, 400));
      pushBotMessage(reply);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUserMessage(input);
  };

  const quickActions = getQuickActions(lang);

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`no-print fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-saffron/30 ${
          open
            ? 'bg-navy px-4 py-3 text-white'
            : 'btn-primary px-5 py-3.5 font-bold text-white'
        }`}
        aria-expanded={open}
        aria-controls="assistance-chat-panel"
        aria-label={open ? 'Close assistance chat' : 'Open assistance chat'}
      >
        {open ? (
          <>
            <span className="text-lg leading-none">✕</span>
            <span className="hidden text-sm sm:inline">
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </span>
          </>
        ) : (
          <>
            <span className="text-xl" aria-hidden>
              💬
            </span>
            <span className="text-sm sm:text-base">
              {lang === 'hi' ? 'सहायता' : 'Assistance'}
            </span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="assistance-chat-panel"
          role="dialog"
          aria-label={lang === 'hi' ? 'सहायता चैट' : 'Assistance chat'}
          className="no-print fixed bottom-20 right-4 z-[60] flex h-[min(520px,calc(100vh-6rem))] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl shadow-navy/20 animate-fade-in-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-navy/8 bg-gradient-to-r from-navy to-[#152d4a] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <BotAvatar />
              <div>
                <p className="font-bold leading-tight">
                  {lang === 'hi' ? 'सहायक' : 'Sahayak'}
                </p>
                <p className="text-[10px] text-white/70">
                  {lang === 'hi' ? 'योजना सहायक' : 'Scheme assistant'}
                </p>
              </div>
            </div>
            <div className="flex rounded-lg border border-white/20 bg-white/10 p-0.5">
              {['en', 'hi'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLanguageChange(code)}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                    lang === code ? 'bg-white text-navy' : 'text-white/80 hover:text-white'
                  } ${code === 'hi' ? 'font-hindi' : ''}`}
                >
                  {code === 'en' ? 'EN' : 'हि'}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-cream/50 px-3 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'bot' && <BotAvatar />}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-navy text-white'
                      : 'border border-navy/8 bg-white text-navy/85 shadow-sm'
                  }`}
                >
                  {renderMarkdownLite(msg.text)}
                  {msg.link && (
                    <Link
                      to={msg.link.to}
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg bg-saffron/15 px-3 py-1.5 text-xs font-bold text-saffron-dark transition-colors hover:bg-saffron/25"
                    >
                      {msg.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <BotAvatar />
                <div className="rounded-2xl border border-navy/8 bg-white px-4 py-3 shadow-sm">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 animate-pulse rounded-full bg-saffron"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="border-t border-navy/5 bg-white px-2 py-2">
            <div className="scrollbar-thin flex gap-1.5 overflow-x-auto pb-1">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  disabled={typing}
                  onClick={() => sendUserMessage(null, action.id)}
                  className={`shrink-0 rounded-full border border-navy/10 bg-navy/5 px-3 py-1 text-xs font-semibold text-navy transition-colors hover:border-saffron/40 hover:bg-saffron/10 disabled:opacity-50 ${lang === 'hi' ? 'font-hindi' : ''}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-navy/8 bg-white p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing}
              placeholder={
                lang === 'hi' ? 'अपना प्रश्न लिखें…' : 'Type your question…'
              }
              className={`min-w-0 flex-1 rounded-xl border border-navy/12 px-3 py-2.5 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 disabled:opacity-60 ${lang === 'hi' ? 'font-hindi' : ''}`}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="btn-primary shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
