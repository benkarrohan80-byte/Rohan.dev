# Rohan.dev Portfolio Backend Deployment Manual

This guide covers everything you need to set up, connect, and deploy your Full-Stack Portfolio Backend with **Express, MongoDB, and Nodemailer Email Notifications** on **Render**.

---

## 🛠️ Project Architecture

- **Backend**: Node.js & Express.js.
- **Database**: MongoDB (Mongoose) with an automatic **persistent local JSON fallback** so development works out-of-the-box.
- **Mail System**: Nodemailer with SMTP credentials support.
- **Hosting Integration**: Fully configured for production builds and zero-downtime deployment on Render.

---

## 🚀 Step 1: Deploying to Render (Fast & Easy)

Render is the easiest platform to deploy this full-stack application. You can deploy it directly from your GitHub repository.

### Option A: Automatic Blueprint Deployment (Recommended)
1. Commit and push this codebase to a private/public GitHub repository.
2. Log in to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository. Render will automatically read the `render.yaml` file, spin up a **Web Service**, and prompt you for the Environment Variables.

### Option B: Manual Web Service Setup
If you prefer setting it up manually on Render:
1. Click **New +** and select **Web Service**.
2. Connect your GitHub repository.
3. Use the following build configurations:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Under **Advanced**, click **Add Environment Variable** and add the keys from the next section.

---

## 🔑 Step 2: Environment Variables Configuration

Configure the following environment variables in your Render Dashboard (under the **Environment** tab) or your local `.env` file:

| Environment Variable | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Mode of operation | `production` |
| `PORT` | The port Express runs on | `3000` (Render binds this dynamically) |
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://admin:<password>@cluster.mongodb.net/portfolio` |
| `NOTIFICATION_EMAIL` | The recipient address for client submissions | `rohantraders8421@gmail.com` |
| `SMTP_HOST` | SMTP server host address | `smtp.gmail.com` (Gmail) |
| `SMTP_PORT` | SMTP port | `587` (TLS) or `465` (SSL) |
| `SMTP_USER` | SMTP username | `your-sender-email@gmail.com` |
| `SMTP_PASS` | SMTP App Password (do not use your real password) | `abcd efgh ijkl mnop` |

*Note: If `MONGODB_URI` is not provided or fails to connect, the server automatically defaults to the persistent `inquiries.json` local file storage so your app never crashes on startup!*

---

## 🍃 Step 3: Setting Up a Free MongoDB Database (Atlas)

1. Sign up for a free account on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
2. Create a new Shared Cluster (Free Tier).
3. Under **Security -> Database Access**, create a user with read/write access. Remember the password.
4. Under **Security -> Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (0.0.0.0/0)** (required since Render IPs are dynamic).
5. Go to your **Database** page, click **Connect**, select **Drivers**, and copy the connection string.
6. Replace `<password>` in the connection string with your database user password and paste it as your `MONGODB_URI` environment variable.

---

## 📧 Step 4: Setting Up Gmail SMTP for Free Email Notifications

To send email notifications when a user submits your portfolio contact form:
1. Go to your Google Account settings, search for **Security**, and enable **2-Step Verification**.
2. In the search bar at the top of your Google Account, search for **App Passwords**.
3. Create a new app password (e.g., name it "Portfolio Website").
4. Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`).
5. Configure your variables:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `your-gmail-address@gmail.com`
   - `SMTP_PASS`: `the-16-character-app-password`
   - `NOTIFICATION_EMAIL`: Your primary email where you want to receive these messages.

---

## 🌐 Step 5: Integrating HTML, CSS & Vanilla JS Frontend

If you are using a standard HTML/CSS/JS frontend on your portfolio website, here is how you can easily submit form data to this Express API using browser `fetch`.

### HTML Form Code:
```html
<form id="portfolio-contact-form">
  <input type="text" id="client-name" placeholder="Enter your name" required />
  <input type="email" id="client-email" placeholder="xyz@gmail.com" required />
  <input type="tel" id="client-phone" placeholder="xxxxxxx321" />
  
  <select id="client-service">
    <option value="Business Website">Business Website</option>
    <option value="Landing Page">Landing Page</option>
    <option value="Website Redesign">Website Redesign</option>
  </select>
  
  <textarea id="client-message" placeholder="Describe your project..."></textarea>
  
  <button type="submit">Submit Project Request</button>
</form>
```

### JavaScript Fetch Request Code:
```javascript
const form = document.getElementById('portfolio-contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('client-name').value,
    email: document.getElementById('client-email').value,
    phone: document.getElementById('client-phone').value,
    service: document.getElementById('client-service').value,
    message: document.getElementById('client-message').value
  };

  try {
    // Replace with your Render production URL once deployed
    const apiEndpoint = 'https://your-portfolio-backend.onrender.com/api/inquiries';
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('Your project inquiry was successfully submitted and stored in the database!');
      form.reset();
    } else {
      alert('Failed to submit inquiry: ' + (result.error || 'Server error'));
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    alert('An unexpected error occurred. Please try again.');
  }
});
```
