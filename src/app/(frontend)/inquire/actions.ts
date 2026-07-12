"use server";

interface InquiryPayload {
  name: string;
  date: string;
  location: string;
  message: string;
}

export async function submitInquiry(data: InquiryPayload) {
  // Replace with your actual persistence: database insert, email send, CRM webhook, etc.
  // Example: await db.inquiry.create({ data });
  // Example: await resend.emails.send({ ... });

  console.log('New inquiry received:', data);

  // Simulate async work (remove once real logic is added)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return { success: true };
}