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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative z-0"
    >
      <div className="relative p-[2px] rounded-2xl overflow-visible group">
        {/* Animated Borders */}
        <div
          className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "conic-gradient(from var(--border-angle, 0deg), #ffffff, #71717a, #ffffff, #a1a1aa, #ffffff)",
            animation: "rotateBorder 8s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background:
              "conic-gradient(from var(--border-angle, 0deg), #ffffff, #71717a, #ffffff)",
            animation: "rotateBorder 8s linear infinite",
          }}
        />

        {/* Inner Card */}
        <div className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/30 overflow-visible">
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 p-8">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Send Me a Message
            </h3>
            <p className="text-zinc-400 mb-6 flex items-center gap-2 flex-wrap">
              Or reach me directly at{" "}
              <a
                href="mailto:abzaeko@gmail.com"
                className="inline-flex items-center gap-1.5 text-white hover:text-zinc-300 transition-colors font-medium group/email"
              >
                <Mail className="w-4 h-4" />
                <span className="underline underline-offset-2 decoration-zinc-500 group-hover/email:decoration-white transition-colors">
                  abzaeko@gmail.com
                </span>
              </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* RESTORED ORIGINAL INPUT STYLES */}
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
              />
              <Input
                name="subject"
                placeholder="Subject"
                required
                className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 resize-none focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
              />

              {/* RESTORED ORIGINAL BUTTON STYLE */}
              <Button
                type="submit"
                disabled={isSubmitting || didSend}
                ref={buttonRef}
                className="w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 text-white hover:from-zinc-700 hover:via-zinc-600 hover:to-zinc-700 font-semibold border border-zinc-600/50 h-12 text-base transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-zinc-500/10"
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
                          {/* Visual Glow behind the plane */}
                          <span className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150" />
                          <Send className="relative h-10 w-10" />{" "}
                          {/* ICON SIZE INCREASED */}
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
