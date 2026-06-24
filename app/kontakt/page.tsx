'use client';

import { useState, useEffect, useRef } from 'react';
import PixelSprite from '@/src/components/pixel/PixelSprite';

type FormState = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const innerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (innerTimerRef.current) clearTimeout(innerTimerRef.current);
    };
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'bitte angeben.';
    if (!form.email.trim()) e.email = 'bitte angeben.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'das sieht nicht nach einer e-mail aus.';
    if (!form.message.trim()) e.message = 'bitte angeben.';
    else if (form.message.trim().length < 10) e.message = 'noch ein bisschen mehr, bitte.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        innerTimerRef.current = setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm(prev => ({ ...prev, [k]: value }));
    };

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>kontakt<span className="dot">.</span></h1>
        <p>
          Interessantes Projekt im Bereich Laravel, CMS oder E-Commerce? Schreib mir gerne —
          eine kurze Beschreibung, was ihr vorhabt, reicht für den Anfang.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-side">
          <h3>kanäle</h3>
          <p>
            Am schnellsten erreichst du mich per E-Mail oder Telefon. Postanschrift nur für
            offizielle Schreiben — alles andere geht digital.
          </p>
          <div className="contact-channels">
            <a className="channel" href="mailto:kontakt@romanschulz.com">
              <PixelSprite name="mail" size={32} />
              <div>
                <div className="channel-label">e-mail</div>
                <div className="channel-value">kontakt@romanschulz.com</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <a className="channel" href="tel:+4915905301529">
              <PixelSprite name="phone" size={32} />
              <div>
                <div className="channel-label">telefon</div>
                <div className="channel-value">+49 159 05301529</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <div className="channel" style={{ cursor: 'default' }}>
              <PixelSprite name="pin" size={32} />
              <div>
                <div className="channel-label">postanschrift</div>
                <div className="channel-value" style={{ lineHeight: 1.5 }}>
                  Clara-Schumann-Str. 7<br />58675 Hemer
                </div>
              </div>
            </div>
            <a className="channel" href="https://www.linkedin.com/in/roman-schulz" target="_blank" rel="noopener noreferrer">
              <PixelSprite name="link" size={32} />
              <div>
                <div className="channel-label">linkedin</div>
                <div className="channel-value">roman-schulz</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label>name</label>
            <input value={form.name} onChange={set('name')} placeholder="wer schreibt da?" />
            {errors.name ? <span className="err">{errors.name}</span> : null}
          </div>
          <div className="field">
            <label>e-mail</label>
            <input value={form.email} onChange={set('email')} placeholder="wohin antworten?" />
            {errors.email ? <span className="err">{errors.email}</span> : null}
          </div>
          <div className="field">
            <label>betreff <span style={{ opacity: .5 }}>(optional)</span></label>
            <input value={form.subject} onChange={set('subject')} placeholder="kurz und knapp" />
          </div>
          <div className="field">
            <label>nachricht</label>
            <textarea rows={6} value={form.message} onChange={set('message')} placeholder="erzähl mir, worum es geht." />
            {errors.message ? <span className="err">{errors.message}</span> : null}
          </div>
          <div className="form-foot">
            <div className={`form-status ${status === 'error' ? 'is-error' : ''}`}>
              {status === 'sending'
                ? 'sende…'
                : status === 'sent'
                ? '✓ danke — ich melde mich innerhalb von ein, zwei tagen.'
                : status === 'error'
                ? (
                    <>
                      das hat nicht geklappt — schreib mir gern direkt:{' '}
                      <a href="mailto:kontakt@romanschulz.com">kontakt@romanschulz.com</a>
                    </>
                  )
                : ''}
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'sende…' : 'senden →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
