

### **1. Set Up Your AWS VPS (EC2 Instance)**

1. **Log In to AWS**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Launch an EC2 Instance**:
   - Navigate to **EC2 Dashboard** and click **Launch Instance**.
   - **Choose an AMI (Amazon Machine Image)**:
     - Select **Ubuntu Server 22.04 LTS** (or any other Linux distribution you prefer).
   - **Choose Instance Type**:
     - For a small project, choose `t2.micro` (eligible for the free tier).
   - **Configure Instance**:
     - Configure as needed or leave default settings.
   - **Add Storage**:
     - Allocate storage (e.g., 20GB).
   - **Add Tags** (Optional):
     - Name your instance for easy identification.
   - **Configure Security Group**:
     - Add rules to allow traffic:
       - SSH (port 22) for server access.
       - HTTP (port 80) for the website.
       - HTTPS (port 443) for secure traffic (optional).
       - Custom TCP (port 3000 or your backend port).
   - **Launch Instance** and download the key pair (`.pem` file) for SSH access.

3. **Connect to the EC2 Instance**:
   - Use SSH from your terminal:
     ```bash
     ssh -i your-key.pem ubuntu@your-ec2-public-ip
     ```

---

### **2. Install Required Software on the VPS**

Run the following commands after connecting:

1. **Update the System**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install MongoDB**:
   - Follow the [official MongoDB installation guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/).

4. **Install Git**:
   ```bash
   sudo apt install git -y
   ```

5. **Install PM2** (to manage the backend server):
   ```bash
   sudo npm install -g pm2
   ```

6. **Install NGINX** (for reverse proxy):
   ```bash
   sudo apt install nginx -y
   ```

---

### **3. Deploy Your MERN Project**

1. **Clone Your Project**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Start Your Backend with PM2**:
   ```bash
   pm2 start index.js --name backend
   pm2 save
   ```

4. **Set Up Your Frontend**:
   - Build the React app:
     ```bash
     cd ../frontend
     npm install
     npm run build
     ```
   - Serve the build using NGINX.

---

### **4. Configure NGINX for Reverse Proxy**

1. **Edit NGINX Config**:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. **Add the Configuration**:
   ```nginx
   server {
       listen 80;

       server_name your-domain.com;  # Replace with your domain or public IP

       location / {
           root /path/to/frontend/build;
           index index.html;
           try_files $uri /index.html;
       }

       location /api/ {
           proxy_pass http://localhost:3000;  # Replace with your backend port
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Restart NGINX**:
   ```bash
   sudo systemctl restart nginx
   ```

---

### **5. Test Your Application**

- Access your frontend using the public IP or domain of your EC2 instance.
- Ensure that both the frontend and backend are working correctly.

---

### **6. (Optional) Use a Domain Name**

1. Purchase a domain from a registrar like Namecheap or GoDaddy.
2. Point the domain to your EC2 instance's public IP using an **A record**.
3. Update the `server_name` in the NGINX config.

---

### **7. (Optional) Set Up SSL with Let's Encrypt**

1. Install Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. Obtain an SSL Certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```
3. Test SSL Renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

---

### if you using webhooks use same 
# create a directory on your vps webhooks
```
npm init
```
```
nano index.js
```
```
const exec = require('child_process').exec;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const payload = req.body;

    // Only run when there's a push to the main branch
    if (payload.ref === 'refs/heads/main') {
        // Define the path to your local repository
        const repoPath = '/home/your-user/tempbackend';  // Adjust to your local repo path

        // Pull the latest changes from GitHub and install dependencies
        exec('git pull origin main && npm install', { cwd: repoPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                console.error(`stderr: ${stderr}`);
                res.status(500).send('Error pulling the code');
                return;
            }

            console.log(stdout);
            res.status(200).send('Code updated and backend restarted');
        });
    } else {
        res.status(200).send('Not a push to the main branch');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

```
