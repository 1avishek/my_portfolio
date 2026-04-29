import { ValidationError, useForm } from '@formspree/react'
import { Bot, Loader2, Mail, Send } from 'lucide-react'
import { motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { socialLinks } from '../data/socialLinks'
import SocialIcon from './SocialIcon'

const ContactRobot = lazy(() => import('./ContactRobot'))

// Replace YOUR_FORM_ID with the real Formspree form ID that forwards to avishekkuriananda@gmail.com.
const formId = 'YOUR_FORM_ID'

function Contact() {
  const [state, handleSubmit] = useForm(formId)

  return (
    <section id="contact" className="section-shell py-20 sm:py-28" aria-labelledby="contact-title">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)', y: 22 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="eyebrow mb-5">
          <Mail aria-hidden="true" className="size-4 text-[var(--pink)]" />
          Contact
        </div>
        <h2 id="contact-title" className="section-title text-balance text-4xl sm:text-5xl">
          Let&apos;s talk about AI, research, and useful software.
        </h2>
        <p className="section-copy mx-auto mt-6 max-w-2xl text-base sm:text-lg">
          Open to collaborations, internship conversations, project feedback,
          research ideas, and roles connected to AI-focused development.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mx-auto mt-9 max-w-2xl"
      >
        <Suspense
          fallback={
            <div className="contact-robot-stage">
              <div className="contact-robot-static">
                <Bot aria-hidden="true" className="size-10 text-[var(--pink)]" />
                <span>hello</span>
              </div>
            </div>
          }
        >
          <ContactRobot />
        </Suspense>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <motion.aside
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.55 }}
          className="glass-card p-5 sm:p-6"
        >
          <h3 className="text-xl font-black text-[var(--text-strong)]">Direct channels</h3>
          <p className="section-copy mt-3 text-sm">
            Choose the route that fits best: code, professional messages, visual updates,
            or a direct email.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {socialLinks.map((link) => {
              const external = link.href.startsWith('http')

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="contact-link"
                >
                  <span className="grid size-10 place-items-center rounded-2xl bg-[var(--green-soft)]">
                    <SocialIcon label={link.label} />
                  </span>
                  <span className="font-black">{link.label}</span>
                </a>
              )
            })}
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="glass-card p-5 sm:p-6"
          noValidate={false}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black text-[var(--text-strong)]">
              Name
              <input
                required
                minLength={2}
                name="name"
                type="text"
                autoComplete="name"
                className="form-field"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-black text-[var(--text-strong)]">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="form-field"
                placeholder="you@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </label>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-black text-[var(--text-strong)]">
            Message
            <textarea
              required
              minLength={12}
              name="message"
              rows={7}
              className="form-field resize-y"
              placeholder="Tell me what you are building or researching."
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="primary-button" disabled={state.submitting}>
              {state.submitting ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="size-4" />
              )}
              {state.submitting ? 'Sending' : 'Send Message'}
            </button>

            <a
              href="mailto:avishekkuriananda@gmail.com"
              className="secondary-button"
              aria-label="Email Avishek Kuri Ananda"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email directly
            </a>
          </div>

          {state.succeeded ? (
            <p className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--green-soft)] px-4 py-3 text-sm font-black text-[var(--text-strong)]">
              Message sent successfully. Thank you for reaching out.
            </p>
          ) : null}

          {state.errors ? (
            <ValidationError errors={state.errors} className="mt-4 text-sm font-bold text-[var(--pink)]" />
          ) : null}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
