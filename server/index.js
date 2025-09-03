const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "diaz_construction",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

const transporter = nodemailer.createTransport({
  host: "diazconstructions.com",
  port: 465,
  secure: true,
  auth: {
    user: "service@diazconstructions.com",
    pass: "diazConstruction#2025",
  },
});

const emailTemplates = {
  en: {
    subject: "New Contact Form Submission",
    thankYou: (name) => `Thank you for contacting us, ${name}!`,
    received:
      "We have received your message and will get back to you very soon.",
    summary: "Your inquiry summary:",
    whatsNext: "What's next?",
    nextSteps:
      "Our team will review your inquiry and contact you within the next 24 hours to discuss your project in detail.",
    viewProjects: "View Our Projects",
    contactInfo: "Contact Information",
    autoMsg: "This email was automatically generated from our contact form.",
  },
  es: {
    subject: "Nueva Solicitud de Contacto",
    thankYou: (name) => `¡Gracias por contactarnos, ${name}!`,
    received:
      "Hemos recibido tu mensaje y nos pondremos en contacto contigo muy pronto.",
    summary: "Resumen de tu solicitud:",
    whatsNext: "¿Qué sigue?",
    nextSteps:
      "Nuestro equipo revisará tu solicitud y se comunicará contigo en las próximas 24 horas para hablar de tu proyecto en detalle.",
    viewProjects: "Ver Nuestros Proyectos",
    contactInfo: "Información de Contacto",
    autoMsg:
      "Este correo fue generado automáticamente desde nuestro formulario de contacto.",
  },
  pt: {
    subject: "Novo Formulário de Contato",
    thankYou: (name) => `Obrigado por entrar em contato, ${name}!`,
    received: "Recebemos sua mensagem e entraremos em contato em breve.",
    summary: "Resumo da sua solicitação:",
    whatsNext: "O que vem a seguir?",
    nextSteps:
      "Nossa equipe revisará sua solicitação e entrará em contato em até 24 horas para discutir seu projeto em detalhes.",
    viewProjects: "Ver Nossos Projetos",
    contactInfo: "Informações de Contato",
    autoMsg:
      "Este e-mail foi gerado automaticamente a partir do nosso formulário de contato.",
  },
  fr: {
    subject: "Nouvelle Demande de Contact",
    thankYou: (name) => `Merci de nous avoir contactés, ${name} !`,
    received:
      "Nous avons bien reçu votre message et nous vous répondrons très bientôt.",
    summary: "Résumé de votre demande :",
    whatsNext: "Et ensuite ?",
    nextSteps:
      "Notre équipe examinera votre demande et vous contactera dans les prochaines 24 heures pour discuter de votre projet en détail.",
    viewProjects: "Voir Nos Projets",
    contactInfo: "Informations de Contact",
    autoMsg:
      "Cet e-mail a été généré automatiquement à partir de notre formulaire de contact.",
  },
  de: {
    subject: "Neue Kontaktanfrage",
    thankYou: (name) => `Vielen Dank für Ihre Kontaktaufnahme, ${name}!`,
    received:
      "Wir haben Ihre Nachricht erhalten und werden uns sehr bald bei Ihnen melden.",
    summary: "Ihre Anfrageübersicht:",
    whatsNext: "Wie geht es weiter?",
    nextSteps:
      "Unser Team wird Ihre Anfrage prüfen und Sie innerhalb der nächsten 24 Stunden kontaktieren, um Ihr Projekt im Detail zu besprechen.",
    viewProjects: "Unsere Projekte ansehen",
    contactInfo: "Kontaktinformationen",
    autoMsg:
      "Diese E-Mail wurde automatisch von unserem Kontaktformular generiert.",
  },
  it: {
    subject: "Nuova Richiesta di Contatto",
    thankYou: (name) => `Grazie per averci contattato, ${name}!`,
    received:
      "Abbiamo ricevuto il tuo messaggio e ti risponderemo molto presto.",
    summary: "Riepilogo della tua richiesta:",
    whatsNext: "Cosa succede adesso?",
    nextSteps:
      "Il nostro team esaminerà la tua richiesta e ti contatterà entro 24 ore per discutere il tuo progetto in dettaglio.",
    viewProjects: "Guarda i Nostri Progetti",
    contactInfo: "Informazioni di Contatto",
    autoMsg:
      "Questa email è stata generata automaticamente dal nostro modulo di contatto.",
  },
};

const countryLangMap = {
  "+1": "en", // US/CA
  "+52": "es", // MX
  "+51": "es", // PE
  "+54": "es", // AR
  "+55": "pt", // BR
  "+56": "es", // CL
  "+57": "es", // CO
  "+58": "es", // VE
  "+34": "es", // ES
  "+33": "fr", // FR
  "+44": "en", // UK
  "+49": "de", // DE
  "+39": "it", // IT
};

app.post("/send-contact", (req, res) => {
  const { name, countryCode, number, email, message } = req.body;
  const fullPhoneNumber = `${countryCode} ${number}`;

  // Detectar idioma
  const lang = countryLangMap[countryCode] || "en"; // default inglés
  const t = emailTemplates[lang] || emailTemplates["en"];

  const sql =
    "INSERT INTO contact_form_submissions (name, number, email, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, fullPhoneNumber, email, message], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Failed to save contact to database" });
    }

    const mailOptions = {
      from: '"Diaz Construction" <service@diazconstructions.com>',
      to: email,
      subject: t.subject,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #102f46 0%, #1a4b73 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0;">DIAZ CONSTRUCTION</h1>
            </div>

            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #102f46;">${t.thankYou(name)}</h2>
              <p style="color: #6c757d;">${t.received}</p>

              <div style="background-color: #f8f9fa; border-left: 4px solid #E88632; padding: 25px; margin: 30px 0; text-align:left;">
                <h3>${t.summary}</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${fullPhoneNumber}</p>
                <p><strong>Message:</strong> ${message}</p>
              </div>

              <h3>${t.whatsNext}</h3>
              <p>${t.nextSteps}</p>

              <a href="https://diazconstructions.com/projects/" 
                 style="background: #E88632; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 30px;">
                ${t.viewProjects}
              </a>

              <h4 style="margin-top:40px;">${t.contactInfo}</h4>
              <p>📧 service@diazconstructions.com</p>
              <p>🌐 diazconstructions.com</p>
              <small>${t.autoMsg}</small>
            </div>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res
          .status(500)
          .json({ error: "Contact saved but failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.json({
        success: true,
        message: "Contact saved and email sent successfully",
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
