"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Briefcase, Phone, MapPin, Linkedin, Github, Globe, Link as LinkIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updatePersonalInfo } from "@/redux/slices/resumeSlice";
import {
  personalInfoSchema,
  type PersonalInfoSchemaType,
} from "../../schemas/personalInfo.schema";
import type { PersonalInfo } from "../../types/resume.types";

interface PersonalInfoFormProps {
  initialData: PersonalInfo;
}

export function PersonalInfoForm({ initialData }: PersonalInfoFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      jobTitle: initialData.jobTitle || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      linkedin: initialData.linkedin || "",
      github: initialData.github || "",
      portfolio: initialData.portfolio || "",
      website: initialData.website || "",
    },
  });

  // Sync internal form if initialData updates externally
  useEffect(() => {
    reset({
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      jobTitle: initialData.jobTitle || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      linkedin: initialData.linkedin || "",
      github: initialData.github || "",
      portfolio: initialData.portfolio || "",
      website: initialData.website || "",
    });
  }, [initialData, reset]);

  const handleChangeField = (fieldData: Partial<PersonalInfoSchemaType>) => {
    dispatch(updatePersonalInfo(fieldData));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => dispatch(updatePersonalInfo(data)))}>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" />
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="e.g. Alex Mercer"
            onChange={(e) => handleChangeField({ fullName: e.target.value })}
            onBlur={(e) => handleChangeField({ fullName: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.fullName && (
            <p className="text-[11px] text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-primary" />
            Email <span className="text-primary">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="e.g. alex@example.com"
            onChange={(e) => handleChangeField({ email: e.target.value })}
            onBlur={(e) => handleChangeField({ email: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-secondary" />
            Target Job Title
          </label>
          <input
            {...register("jobTitle")}
            type="text"
            placeholder="e.g. Senior Software Engineer"
            onChange={(e) => handleChangeField({ jobTitle: e.target.value })}
            onBlur={(e) => handleChangeField({ jobTitle: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-secondary" />
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="e.g. +1 (555) 019-2834"
            onChange={(e) => handleChangeField({ phone: e.target.value })}
            onBlur={(e) => handleChangeField({ phone: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        {/* Address */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            Location / Address
          </label>
          <input
            {...register("address")}
            type="text"
            placeholder="e.g. San Francisco, CA (or Remote)"
            onChange={(e) => handleChangeField({ address: e.target.value })}
            onBlur={(e) => handleChangeField({ address: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Linkedin className="h-3.5 w-3.5 text-blue-400" />
            LinkedIn URL
          </label>
          <input
            {...register("linkedin")}
            type="url"
            placeholder="https://linkedin.com/in/username"
            onChange={(e) => handleChangeField({ linkedin: e.target.value })}
            onBlur={(e) => handleChangeField({ linkedin: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.linkedin && (
            <p className="text-[11px] text-destructive">{errors.linkedin.message}</p>
          )}
        </div>

        {/* GitHub */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5 text-muted-foreground" />
            GitHub URL
          </label>
          <input
            {...register("github")}
            type="url"
            placeholder="https://github.com/username"
            onChange={(e) => handleChangeField({ github: e.target.value })}
            onBlur={(e) => handleChangeField({ github: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.github && (
            <p className="text-[11px] text-destructive">{errors.github.message}</p>
          )}
        </div>

        {/* Portfolio / Website */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            Portfolio URL
          </label>
          <input
            {...register("portfolio")}
            type="url"
            placeholder="https://alexmercer.dev"
            onChange={(e) => handleChangeField({ portfolio: e.target.value })}
            onBlur={(e) => handleChangeField({ portfolio: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.portfolio && (
            <p className="text-[11px] text-destructive">{errors.portfolio.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <LinkIcon className="h-3.5 w-3.5 text-purple-400" />
            Other Website URL
          </label>
          <input
            {...register("website")}
            type="url"
            placeholder="https://blog.alexmercer.dev"
            onChange={(e) => handleChangeField({ website: e.target.value })}
            onBlur={(e) => handleChangeField({ website: e.target.value })}
            className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.website && (
            <p className="text-[11px] text-destructive">{errors.website.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
