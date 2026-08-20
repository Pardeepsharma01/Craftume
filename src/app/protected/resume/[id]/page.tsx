import { ResumeBuilder } from "@/features/resume/components/ResumeBuilder";

interface EditResumePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const { id } = await params;
  return <ResumeBuilder existingResumeId={id} />;
}
