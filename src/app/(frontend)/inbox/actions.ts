"use server";

import { revalidatePath } from 'next/cache';
import { Inquiry } from '@/types';

export async function getInquiries(): Promise<Inquiry[]> {
  // Replace with your real data source
  // Example: return await db.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  return [];
}

export async function updateInquiry(updated: Inquiry) {
  // Example: await db.inquiry.update({ where: { id: updated.id }, data: updated });
  console.log('Updating inquiry:', updated);

  revalidatePath('/inbox');
  return { success: true };
}

export async function deleteInquiry(id: string) {
  // Example: await db.inquiry.delete({ where: { id } });
  console.log('Deleting inquiry:', id);

  revalidatePath('/inbox');
  return { success: true };
}