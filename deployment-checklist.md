# Space Invaders 3D Deployment Checklist

## Pre-Deployment

- [ ] Run `npm run build` to create production build
- [ ] Test the production build locally with `npm run preview`
- [ ] Check all 3D models and assets are loading correctly
- [ ] Verify game performance in all modes (including Holgi Modus)

## Plesk Deployment

1. **Domain Setup**
   - [ ] Create domain/subdomain in Plesk
   - [ ] Enable SSL/HTTPS
   - [ ] Configure DNS if needed

2. **File Upload**
   - [ ] Upload and extract the game files to `httpdocs` or `public_html`
   - [ ] Verify file permissions (usually 644 for files, 755 for directories)
   - [ ] Upload `.htaccess` for Apache or configure Nginx settings

3. **Configuration**
   - [ ] Add the provided Nginx/Apache configurations
   - [ ] Enable necessary Apache modules (mod_headers, mod_rewrite)
   - [ ] Configure CORS for asset loading

## Post-Deployment

- [ ] Test the game in multiple browsers
- [ ] Verify all game modes work correctly
- [ ] Check mobile device compatibility
- [ ] Verify asset loading (3D models, sounds)
- [ ] Test high scores persistence
- [ ] Monitor error logs for any issues

## Performance Checks

- [ ] Verify loading times
- [ ] Check memory usage
- [ ] Test Holgi Modus performance
- [ ] Monitor server response times

## Security

- [ ] Ensure HTTPS is working
- [ ] Verify security headers are in place
- [ ] Check file permissions
- [ ] Monitor access logs

## Backup

- [ ] Create backup of working deployment
- [ ] Document deployment configuration
- [ ] Store deployment script and configurations
