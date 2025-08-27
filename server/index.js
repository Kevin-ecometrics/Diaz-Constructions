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

app.post("/send-contact", (req, res) => {
  const { name, countryCode, number, email, message } = req.body;

  const fullPhoneNumber = `${countryCode} ${number}`;

  const sql =
    "INSERT INTO contact_form_submissions (name, number, email, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, fullPhoneNumber, email, message], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Failed to save contact to database" });
    }

    const mailOptions = {
      from: '"Diaz Construction" <service@diazconstructions.com>',
      to: email,
      subject: "New Contact Form Submission",
      html: `
        <div style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header with logo/branding -->
          <div style="background: linear-gradient(135deg, #102f46 0%, #1a4b73 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              DIAZ CONSTRUCTION
            </h1>
            <p style="color: #a8c5e0; margin: 5px 0 0 0; font-size: 14px; font-weight: 300;">
              Building your dreams
            </p>
          </div>

          <!-- Main content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-block; background-color: #e8f5e8; padding: 15px; border-radius: 50px; margin-bottom: 20px;">
                <span style="color: #28a745; font-size: 24px;">✓</span>
              </div>
              <h2 style="color: #102f46; margin: 0; font-size: 24px; font-weight: 600;">
                Thank you for contacting us, ${name}!
              </h2>
              <p style="color: #6c757d; margin: 15px 0; font-size: 16px; line-height: 1.5;">
                We have received your message and will get back to you very soon.
              </p>
            </div>

            <!-- Summary of submitted information -->
            <div style="background-color: #f8f9fa; border-left: 4px solid #E88632; border-radius: 8px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #102f46; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                Your inquiry summary:
              </h3>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Name:</strong>
                <span style="color: #212529; font-size: 14px; margin-left: 10px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Email:</strong>
                <span style="color: #212529; font-size: 14px; margin-left: 10px;">${email}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Phone:</strong>
                <span style="color: #212529; font-size: 14px; margin-left: 10px;">${fullPhoneNumber}</span>
              </div>
              
              <div style="margin-bottom: 0;">
                <strong style="color: #495057; font-size: 14px;">Message:</strong>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 10px; border: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #212529; font-size: 14px; line-height: 1.6; white-space: pre-line;">${message}</p>
                </div>
              </div>
            </div>

            <!-- Contact information and next steps -->
            <div style="text-align: center; margin: 30px 0;">
              <h3 style="color: #102f46; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                What's next?
              </h3>
              <p style="color: #6c757d; margin: 0; font-size: 14px; line-height: 1.6;">
                Our team will review your inquiry and contact you within the next <strong>24 hours</strong> 
                to discuss your project in detail.
              </p>
            </div>

            <!-- Call to action button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://diazconstructions.com/projects/" 
                  style="background: linear-gradient(135deg, #E88632 0%, #d67429 100%); 
                        color: #ffffff; 
                        text-decoration: none; 
                        padding: 15px 30px; 
                        border-radius: 30px; 
                        font-weight: 600; 
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(232, 134, 50, 0.3);
                        transition: all 0.3s ease;">
                View Our Projects
              </a>
            </div>

            <!-- Contact information -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 25px; margin-top: 30px;">
              <h4 style="color: #102f46; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; text-align: center;">
                Contact Information
              </h4>
              <div style="text-align: center;">
                <p style="margin: 8px 0; color: #6c757d; font-size: 14px;">
                  📧 <strong>Email:</strong> service@diazconstructions.com
                </p>
                <p style="margin: 8px 0; color: #6c757d; font-size: 14px;">
                  🌐 <strong>Website:</strong> diazconstructions.com
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 12px;">
              This email was automatically generated from our contact form.
            </p>
            <p style="margin: 0; color: #adb5bd; font-size: 11px;">
              © 2025 Diaz Construction. All rights reserved.
            </p>
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
        message: "Contact saved to database and email sent successfully",
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
