"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSend, setDidSend] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [launchKey, setLaunchKey] = useState(0);

  useEffect(() => {
    if (!buttonRef.current) return;
    const update = () => {
      const width = buttonRef.current?.getBoundingClientRect().width ?? 0;
      setButtonWidth(width);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(buttonRef.current);
    return () => ro.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;

    setLaunchKey((k) => k + 1);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      setTimeout(() => {
        toast({
          title: "Please fill in all fields",
          description: "Name, email, subject, and message are required.",
        });
        setLaunchKey(0);
      }, 300);
      return;
    }

    setIsSubmitting(true);
    try {
      // Run the animation timer and the API request in parallel
      const minAnimationTime = new Promise((resolve) =>
        setTimeout(resolve, 4800)
      );
      const request = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const [_, response] = await Promise.all([minAnimationTime, request]);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send.");
      }

      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
      form.reset();
      setDidSend(true);
      window.setTimeout(() => setDidSend(false), 2500);
    } catch (error: unknown) {
      toast({ title: "Unable to send", description: "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative rounded-lg bg-noir-surface-1 border border-noir-line overflow-visible">
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-noir-accent/60" />
            <span className="noir-label text-noir-accent">Direct Line</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-noir-text mb-3">
            Send a Message
          </h3>
          <p className="text-noir-text-mute mb-8 flex items-center gap-2 flex-wrap text-sm">
            Or reach me directly at{" "}
            <a
              href="mailto:abzaeko@gmail.com"
              className="inline-flex items-center gap-1.5 text-noir-accent hover:underline underline-offset-2 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              abzaeko@gmail.com
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              required
              className="bg-noir-surface-dim border-noir-line text-noir-text placeholder:text-noir-text-faint h-11 rounded transition-colors focus-visible:border-noir-accent focus-visible:ring-1 focus-visible:ring-noir-accent/30 focus-visible:ring-offset-0"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="bg-noir-surface-dim border-noir-line text-noir-text placeholder:text-noir-text-faint h-11 rounded transition-colors focus-visible:border-noir-accent focus-visible:ring-1 focus-visible:ring-noir-accent/30 focus-visible:ring-offset-0"
            />
            <Input
              name="subject"
              placeholder="Subject"
              required
              className="bg-noir-surface-dim border-noir-line text-noir-text placeholder:text-noir-text-faint h-11 rounded transition-colors focus-visible:border-noir-accent focus-visible:ring-1 focus-visible:ring-noir-accent/30 focus-visible:ring-offset-0"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="bg-noir-surface-dim border-noir-line text-noir-text placeholder:text-noir-text-faint resize-none rounded transition-colors focus-visible:border-noir-accent focus-visible:ring-1 focus-visible:ring-noir-accent/30 focus-visible:ring-offset-0"
            />

            <Button
              type="submit"
              disabled={isSubmitting || didSend}
              ref={buttonRef}
              className="w-full h-12 rounded bg-noir-accent text-black font-semibold hover:bg-noir-accent-bright transition-[background,box-shadow] hover:shadow-noir-glow disabled:opacity-70"
            >
                <span className="relative w-full flex items-center justify-center z-50">
                  <AnimatePresence mode="wait" initial={false}>
                    {didSend ? (
                      <motion.span
                        key="sent"
                        className="inline-flex items-center"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        Sent <Check className="ml-2 h-4 w-4" />
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span
                        key="sending"
                        className="inline-flex items-center text-white/90"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="inline-flex items-center"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* 🚀 THE BIG, SLOW, CURVY PLANE 🚀 */}
                  <AnimatePresence>
                    {isSubmitting && (
                      <motion.span
                        key={`launch-${launchKey}`}
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2"
                      >
                        <motion.span
                          className="relative inline-flex text-white"
                          initial={{
                            x: -18,
                            y: 10,
                            rotate: -15,
                            scale: 2,
                            opacity: 0,
                          }}
                          animate={{
                            // X-axis: Moves across and well beyond the form
                            x: [-18, 150, 350, 600, 1000],
                            // Y-axis: Dips, climbs high, levels out, exits top-right
                            y: [10, 60, -350, -250, -850],
                            // Rotate: Nose points into the climb and the bank
                            rotate: [-15, 20, -45, 10, 45],
                            // Scale: Starts large, gets HUGE in mid-air, then exits
                            scale: [2, 2.5, 3.5, 2.8, 1.5],
                            opacity: [0, 1, 1, 1, 0],
                            filter: [
                              "blur(0px)",
                              "blur(0px)",
                              "blur(0px)",
                              "blur(1px)",
                              "blur(4px)",
                            ],
                          }}
                          transition={{
                            duration: 5.0, // Slowed down to 5 seconds
                            times: [0, 0.2, 0.5, 0.8, 1],
                            ease: "easeInOut", // Ensures a smooth curve with no sharp edges
                          }}
                        >
                          <span className="absolute inset-0 bg-noir-accent/30 blur-2xl rounded-full scale-150" />
                          <Send className="relative h-10 w-10" />
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </Button>
            </form>
        </div>
      </div>
    </motion.div>
  );
}
