/* AI chatbot demo — live model w/ grounded prompt, local KB fallback */
const { useRef: useRefChat, useEffect: useEffectChat, useState: useStateChat } = React;

const SUGGESTS = [
  "Quels sont ses meilleurs projets ?",
  "Quelles technologies maîtrise-t-il ?",
  "Sur quels domaines travaille-t-il ?",
  "Est-il disponible ?",
];

function renderBoldHTML(text){
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

function Bubble({ role, text, html }){
  return (
    <div className={"msg " + (role === "user" ? "user" : "bot")}>
      <div className="ic">{role === "user" ? "You" : "AI"}</div>
      {html
        ? <div className="bubble" dangerouslySetInnerHTML={{ __html: html }}></div>
        : <div className="bubble">{text}</div>}
    </div>
  );
}

function Typing(){
  return (
    <div className="msg bot">
      <div className="ic">AI</div>
      <div className="bubble"><span className="typing"><i></i><i></i><i></i></span></div>
    </div>
  );
}

const INTRO_HTML = "Bonjour ! Je suis l'assistant IA de <b>Mamane Argi</b> 👋 Je peux te parler de son travail en <b>data analytics, business intelligence &amp; machine learning</b>, de ses projets ou de sa formation. Que veux-tu savoir ?";

function Demo(){
  const [messages, setMessages] = useStateChat([{ role: "bot", html: INTRO_HTML }]);
  const [typing, setTyping] = useStateChat(false);
  const [status, setStatus] = useStateChat("en ligne · pose ta question");
  const [showSuggest, setShowSuggest] = useStateChat(true);
  const [text, setText] = useStateChat("");
  const logRef = useRefChat(null);
  const aiRef = useRefChat(!!(window.claude && typeof window.claude.complete === "function"));
  const historyRef = useRefChat([]);
  const [modelTag, setModelTag] = useStateChat(
    (window.claude && typeof window.claude.complete === "function") ? "◆ IA live" : "◆ base de connaissances"
  );

  useEffectChat(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  async function respond(q){
    setTyping(true);
    setStatus("écrit…");
    let answer = "";
    if (aiRef.current){
      try {
        const msgs = historyRef.current.slice(-6).concat([{ role: "user", content: q }]);
        answer = await window.claude.complete({ system: window.SYSTEM, messages: msgs });
        if (!answer || !answer.trim()) throw new Error("empty");
      } catch (e){
        aiRef.current = false;
        setModelTag("◆ base de connaissances");
        answer = window.localAnswer(q);
      }
    } else {
      await new Promise((r) => setTimeout(r, 420 + Math.random() * 380));
      answer = window.localAnswer(q);
    }
    setTyping(false);
    setMessages((m) => m.concat([{ role: "bot", html: renderBoldHTML(answer) }]));
    setStatus("en ligne · pose ta question");
    historyRef.current.push({ role: "user", content: q }, { role: "assistant", content: answer });
  }

  function send(q){
    q = (q || "").trim();
    if (!q) return;
    setMessages((m) => m.concat([{ role: "user", text: q }]));
    setText("");
    setShowSuggest(false);
    respond(q);
  }

  return (
    <section className="section-pad" id="demo" data-screen-label="AI Chatbot demo">
      <div className="wrap">
        <Reveal>
          <div className="demo-head">
            <div>
              <span className="eyebrow">Démo live — propulsée par l'IA</span>
              <h2>Pose une question à mon CV.</h2>
            </div>
            <p>Plutôt que de tout lire, <b>discute avec mon portfolio</b>. Cet assistant connaît mon parcours, mes projets et mes compétences — demande-lui ce qu'un recruteur ou un collaborateur voudrait savoir.</p>
          </div>

          <div className="chat-card">
            <div className="chat-bar">
              <div className="chat-avatar"><IcBot/></div>
              <div>
                <div className="who">Assistant IA de Mamane</div>
                <div className="stat-line"><span className="live-dot"></span><span>{status}</span></div>
              </div>
              <div className="spacer"></div>
              <div className="model-tag">{modelTag}</div>
            </div>

            <div className="chat-log" ref={logRef}>
              {messages.map((m, i) => <Bubble key={i} {...m}/>)}
              {typing && <Typing/>}
            </div>

            {showSuggest && (
              <div className="chat-suggest">
                {SUGGESTS.map((s) => (
                  <button className="suggest" key={s} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}

            <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(text); }}>
              <input
                type="text"
                placeholder="Pose une question sur mes projets, compétences…"
                autoComplete="off"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" aria-label="Send"><IcSend/></button>
            </form>
          </div>
          <p className="demo-note">// <b>Sous le capot :</b> avec un accès IA, l'assistant répond en direct via un modèle de langage nourri de mon CV. Hébergé en statique (ex. GitHub Pages), il bascule sur une base de connaissances intégrée — il répond donc toujours. <b>C'est le type de produit IA déployable que je conçois.</b></p>
        </Reveal>
      </div>
    </section>
  );
}

window.Demo = Demo;
