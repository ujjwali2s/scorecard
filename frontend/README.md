Here’s the complete, step-by-step guide to deploying your **Vite+React frontend** on an AWS VPS with Nginx, starting from scratch:

---

## **Step 1: Access Your VPS**
1. Connect to your VPS using SSH:
   ```bash
   ssh ubuntu@<your-vps-ip>
   ```

2. Update the system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## **Step 2: Install Necessary Software**
1. **Install Node.js** (for building the Vite+React app):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
   source ~/.bashrc
   nvm install --lts
   ```

2. **Install Nginx** (for serving the frontend):
   ```bash
   sudo apt install nginx -y
   ```

---

## **Step 3: Set Up Your Frontend App**
1. Navigate to your project directory:
   ```bash
   cd ~/scorecard/frontend
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```
   This will create a `dist` folder containing the static files.

4. Copy the contents of the `dist` folder to Nginx's web root:
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```

---

## **Step 4: Configure Nginx**
1. Open the default Nginx configuration file for editing:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. Replace its content with the following:
   ```nginx
   server {
       listen 80;
       server_name <your-vps-ip>; # Replace <your-vps-ip> with your VPS public IP or domain name

       root /var/www/html;
       index index.html;

       location / {
           try_files $uri /index.html;
       }
   }
   ```

3. Save the file and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

4. Test the configuration to ensure there are no syntax errors:
   ```bash
   sudo nginx -t
   ```
   - If the output shows `syntax is ok` and `test is successful`, proceed.

5. Reload Nginx to apply the changes:
   ```bash
   sudo systemctl reload nginx
   ```

---

## **Step 5: Test the Deployment**
- Open your browser and visit `http://<your-vps-ip>` to see your Vite+React app.

---

## **Step 6: Automate Updates with GitHub**
1. Create a deployment script (`deploy.sh`) in your project directory:
   ```bash
   nano ~/scorecard/frontend/deploy.sh
   ```

2. Add the following content:
   ```bash
   #!/bin/bash
   cd ~/scorecard/frontend
   git pull origin main
   npm install
   npm run build
   sudo cp -r dist/* /var/www/html/
   sudo systemctl reload nginx
   ```

3. Make the script executable:
   ```bash
   chmod +x ~/scorecard/frontend/deploy.sh
   ```

4. Set up a cron job or webhook to automate updates:
   - **For a webhook**, follow the earlier guide to create a Node.js webhook handler.
   - **For a cron job**, add this to your crontab (`crontab -e`):
     ```bash
     */5 * * * * ~/scorecard/frontend/deploy.sh
     ```

---

## **Step 7: (Optional) Set Up a Domain Name and SSL**
1. **Point Your Domain to the VPS IP:**
   - Set an **A record** in your domain’s DNS settings to point to your VPS public IP.

2. **Install Certbot for SSL:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx
   ```

3. **Verify Auto-Renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

---

You now have your Vite+React frontend hosted on an AWS VPS with automatic updates and optional SSL support. Let me know if you need further clarification!
