"use server"
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;
  console.log("✅ POST hit at /api/webhooks/clerk");

  if (!SIGNING_SECRET) {
    console.error('❌ Missing Clerk signing secret');
    return new Response('Missing Clerk signing secret', { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_signature || !svix_timestamp) {
    console.error('❌ Missing Svix headers');
    return new Response('Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("🧠 Body:", body);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { data } = evt;

    const email = data.email_addresses?.[0]?.email_address ?? '';
    const name =
      data.first_name && data.last_name
        ? `${data.first_name} ${data.last_name}`
        : data.username ?? 'Unknown User';
    const imageUrl = data.image_url ?? '';

    try {
      await prisma.user.create({
        data: {
          id: data.id,
          email,
          name,
          imageUrl,
          role: 'STUDENT', // Default role
        },
      });

      console.log("✅ User created in DB");
      return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
    } catch (error) {
      console.error('🔥 DB Insert Error:', error);
      return new Response('Failed to create user in DB', { status: 500 });
    }
  }

  return new Response('Event received', { status: 200 });
}
