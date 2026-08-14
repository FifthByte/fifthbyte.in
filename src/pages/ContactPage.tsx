import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { 
  ArrowUpRight, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  Phone, 
  MessageSquare,
  Clock,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Reveal } from "@/components/ui-kit/Reveal";
import { social } from "@/lib/nav";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FormData {
  firstname: string;
  last_name: string;
  user_email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstname?: string;
  last_name?: string;
  user_email?: string;
  phone?: string;
  message?: string;
}

const socialLinks = [
  { label: "Email", value: social.email, href: `mailto:${social.email}`, icon: Mail },
  { label: "LinkedIn", value: "/company/fifthbyte", href: social.linkedin, icon: FaLinkedin },
  { label: "GitHub", value: "/fifthbyte", href: social.github, icon: FaGithub },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    last_name: "",
    user_email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getEnvVar = (key: string, viteKey: string): string => {
    const val = (import.meta as any).env?.[viteKey] || (import.meta as any).env?.[key] || "";
    return typeof val === "string" ? val.replace(/["';]/g, "").trim() : "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const serviceId = getEnvVar("EMAIL_JS_SERVICE_ID", "VITE_EMAIL_JS_SERVICE_ID");
    const templateId = getEnvVar("EMAIL_JS_TEMPLATE_ID", "VITE_EMAIL_JS_TEMPLATE_ID");
    const publicKey = getEnvVar("EMAIL_JS_PUBLIC_KEY", "VITE_EMAIL_JS_PUBLIC_KEY");

    const templateParams = {
      firstname: formData.firstname,
      last_name: formData.last_name,
      user_email: formData.user_email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
        } catch (libError) {
          console.warn("EmailJS client library failed, trying HTTP API fallback", libError);
          const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: serviceId,
              template_id: templateId,
              user_id: publicKey,
              template_params: templateParams,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to send email via API endpoint.");
          }
        }

        setSubmitStatus("success");
        setFormData({
          firstname: "",
          last_name: "",
          user_email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(
          "EmailJS configuration parameters are missing. Please verify VITE_EMAIL_JS_SERVICE_ID, VITE_EMAIL_JS_TEMPLATE_ID, and VITE_EMAIL_JS_PUBLIC_KEY in your .env file."
        );
      }
    } catch (err: any) {
      console.error("EmailJS submission error:", err);
      setSubmitStatus("error");
      setErrorMessage(
        err?.text || err?.message || "An unexpected error occurred while sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        subtitle="Send a short note about what you're building. We reply within a day."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              {submitStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">Message Sent!</h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Thank you for reaching out. We have received your details and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition-all hover:bg-muted"
                  >
                    <RefreshCw size={14} />
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === "error" && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-destructive">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">Unable to send message</p>
                        <p className="mt-0.5 opacity-90">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstname" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          placeholder="John"
                          className={`w-full rounded-xl border bg-surface/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 ${
                            errors.firstname ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                          }`}
                        />
                      </div>
                      {errors.firstname && <p className="mt-1 text-xs text-destructive">{errors.firstname}</p>}
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Doe"
                          className={`w-full rounded-xl border bg-surface/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 ${
                            errors.last_name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                          }`}
                        />
                      </div>
                      {errors.last_name && <p className="mt-1 text-xs text-destructive">{errors.last_name}</p>}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="user_email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                        <input
                          type="email"
                          id="user_email"
                          name="user_email"
                          value={formData.user_email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full rounded-xl border bg-surface/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 ${
                            errors.user_email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                          }`}
                        />
                      </div>
                      {errors.user_email && <p className="mt-1 text-xs text-destructive">{errors.user_email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 0000000000"
                          className={`w-full rounded-xl border bg-surface/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 ${
                            errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <MessageSquare className="absolute left-3.5 top-3 text-muted-foreground/60" size={16} />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        className={`w-full resize-none rounded-xl border bg-surface/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 ${
                          errors.message ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                        }`}
                      />
                    </div>
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lift transition-all hover:bg-primary/90 hover:shadow-float disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Sidebar Info Section */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-5">
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Sparkles size={14} className="text-violet-500" />
                <span>Direct Links</span>
              </div>
              <h4 className="mt-2 text-base font-semibold tracking-tight">Connect with us</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Feel free to reach out directly via email or social platforms.
              </p>

              <div className="mt-4 space-y-2.5">
                {socialLinks.map(({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-border bg-surface p-3.5 transition-all duration-300 hover:border-border hover:shadow-soft"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon size={15} strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                        <p className="text-xs font-semibold tracking-tight text-foreground truncate max-w-[180px] sm:max-w-[220px]">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-border/80 bg-surface/80 p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-foreground">Fast Response</h5>
                  <p className="text-[11px] text-muted-foreground">We usually reply within 24 hours.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Page>
  );
}

