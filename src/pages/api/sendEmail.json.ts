import type { APIContext } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  email: string,
  verificationLink: string
): Promise<boolean> {
  try {
    const send = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Swifly | Password reset verification token",
      html: `<p>Para restablecer tu contraseña, por favor haz click en el siguiente enlace: <a href="${verificationLink}">Restablecer Contraseña</a></p>`,
      text: `Para restablecer tu contraseña, por favor haz click en el siguiente enlace: ${verificationLink}`,
    });

    if (!send.data) {
      console.error(send.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// async function sendPasswordResetToken(email: string, link: string) {
//   resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: `${email}`,
//     subject: 'Password reset verification token',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//   });
// }

// export async function GET(context: APIContext): Promise<Response> {
//   const send = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: `stawfikvazquez@gmail.com`,
//     subject: "Swifly | Password reset verification token",
//     html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
//     text: "Congrats on sending your first email!",
//   });

//   if (!send.data) {
//     return new Response(
//       JSON.stringify({
//         message: send.error,
//       }),
//       {
//         status: 500,
//         statusText: "Internal Server Error",
//       }
//     );
//   }
//   return context.redirect("/");
// }
